const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const jwt = require("../helpers/jwt");
const { sendResetEmail } = require("../helpers/email");
const jsonwebtoken = require("jsonwebtoken");

const profile = (req, res) => {
    return res.status(200).json({
        message: "User profile",
        user: req.user
    });
};

const register = async (req, res) => {

    //Recogemos los datos del body
    let { full_name, email, password } = req.body;

    try {

        //Validamos los datos
        if (!full_name || !email || !password) {

            return res.status(400).json({
                message: "Validation failed",
            });
        }

        //Verificamos q no exista el usuario
        const userExisting = await userModel.findOne({ where: { email } });

        if (userExisting) {

            return res.status(400).json({ message: "User already exists" });
        }

        //Ciframos la contraseña
        password = await bcrypt.hash(password, 10);

        //Convertimos el email en minusculas y creamos el objeto de usuario
        email = email.toLowerCase();

        //Guardamos usuario nuevo
        const userSaved = await userModel.create({ full_name, email, password });

        if (!userSaved) {

            return res.status(500).json({ message: "Failed to save user" });
        }

        return res.status(201).json({ 
            message: "User registered successfully",
            user: {
                id: userSaved.id,
                full_name: userSaved.full_name,
                email: userSaved.email,
                createdAt: userSaved.createdAt
            }
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "System error",
            error: error,
        });
    }
};

const login = async (req, res) => {

    //Recogemos los datos del body
    let { email, password } = req.body;

    try{
        //Validamos los datos
        if(!email || !password){
    
            return res.status(400).json({
                message: "Validation failed",
            });
        }
    
        //Convertimos el email en minuscula
        email = email.toLowerCase();
    
        //Verificamos q exista el usuario
        const userExisting = await userModel.findOne({ where: { email } });
    
        if(!userExisting){
    
            return res.status(400).json({
                message: "User not found"
            });
        }

        //Comparamos las contraseñas
        let pwd = bcrypt.compareSync(password, userExisting.password);

        if(!pwd){

            return res.status(400).json({
                message: "Invalid username or password"
            });
        }

        let token = jwt.createToken(userExisting);

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: userExisting.id,
                full_name: userExisting.full_name,
            },
            token
        });

    }catch(error){

        return res.status(500).json({
            message: "System error",
            error: error,
        });
    }
};

const forgotPassword = async (req, res) => {

    const { email } = req.body;

    if (!email) {

        return res.status(400).json({ message: "Email is required" });
    }

    try {

        const user = await userModel.findOne({

            where: { email: email.toLowerCase() }
        });

        if (!user) {

            return res.status(200).json({
                message: "If the email exists, you will receive a reset link"
            });
        }

        // Token de 15 minutos
        const resetToken = jsonwebtoken.sign(
            { id: user.id, email: user.email, type: 'reset' },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );

        await sendResetEmail(user.email, resetToken);

        return res.status(200).json({

            message: "Reset email sent successfully",
            resetToken // Solo para pruebas
        });

    } catch (error) {

        console.log("Error sending email:", error);

        return res.status(500).json({ message: "Error sending reset email" });
    }
};

const resetPassword = async (req, res) => {

    const { token, newPassword } = req.body;

    if (!token || !newPassword) {

        return res.status(400).json({ message: "Token and new password are required" });
    }

    if (newPassword.length < 6) {

        return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    try {

        const payload = jsonwebtoken.verify(token, process.env.JWT_SECRET);

        if (payload.type !== 'reset') {
            return res.status(400).json({ message: "Invalid token" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await userModel.update(
            { password: hashedPassword },
            { where: { id: payload.id } }
        );

        return res.status(200).json({ message: "Password updated successfully" });

    } catch (error) {

        if (error.name === 'TokenExpiredError') {

            return res.status(400).json({ message: "Reset link expired" });
        }

        return res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = { 
    profile,
    register, 
    login,
    forgotPassword,
    resetPassword
};