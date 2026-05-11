const jwt = require('jsonwebtoken');

//Creamos la funcion para generar el token
const createToken = (user) => {

    //Creamos el payload del token, esta va a ser la informacion que vamos a guardar en el token
    let payload = {
        id: user.id,
        full_name: user.full_name,
        email: user.email
    }

    //codificamos el payload
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d'});
}

module.exports = {
    createToken
};