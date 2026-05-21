const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const jwt = require("../helpers/jwt");

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

module.exports = { 
    profile,
    register, 
    login
};