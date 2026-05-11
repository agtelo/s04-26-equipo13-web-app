const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    //Verificamos el token del header. Con .spli(' ') dividimos el espacio y limpiamos el token
    const token = req.headers.authorization?.split(' ')[1]; 

    if(!token){

        return res.status(401).json({
            message: "La peticion no tiene la autenticacion"
        });
    }

    //Decodificamos el token
    try{
        
        //El .verify lanza un error automaticamente si el token expiro o es invalido
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.user = payload;

        next();

    }catch(error){

        return res.status(401).json({
            message: "Token invalido o expirado"
        });
    }
}

module.exports = { authMiddleware };