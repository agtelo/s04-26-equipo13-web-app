const { json } = require("sequelize");
const contentDraftModel = require("../models/contentDraftModel");

const getAllDrafts = async (req, res) => {

    try{

        //Traemos todos los borradores ordenados por fecha de creación (más recientes primero)
        const drafts = await contentDraftModel.findAll({
            order: [["createdAt", "DESC"]]
        });

        return res.status(200).json(drafts);

    }catch(error){

        return res.status(500).json({message: "Error al obtener los borradores", error: error.message});
    }
};

const getDraftById = async (req, res) => {

    const { id } = req.params;

    try{
        //Traemos el borrador por su id
        const draft = await contentDraftModel.findByPk(id);

        if(!draft){

            return res.status(404).json({message: "Borrador no encontrado"});
        }

        //Devolvemos el borrador encontrado
        return res.status(200).json(draft);

    }catch(error){

        return res.status(500).json({message: "Error al obtener el borrador", error: error.message});
    }
};

const updateDraft = async (req, res) => {
    
    const { id } = req.params;
    const { content } = req.body;

    if(!content){

        return res.status(400).json({message: "El contenido es requerido"});
    }

    try{
        //Traemos el borrador por su id
        const draft = await contentDraftModel.findByPk(id);

        if(!draft){
            return res.status(404).json({message: "Borrador no encontrado"});
        }

        //Actualizamos el contenido del borrador
        await draft.update({ content });

        return res.status(200).json({message: "Borrador actualizado", draft});

    }catch(error){

        return res.status(500).json({message: "Error al actualizar el borrador", error: error.message});
    }
};

const deleteDraft = async (req, res) => {

    const { id } = req.params;

    try{

        //Traemos el borrador por su id
        const draft = await contentDraftModel.findByPk(id);

        if(!draft){

            return res.status(404).json({message: "Borrador no encontrado"});
        }

        //Eliminamos el borrador
        await draft.destroy();

        return res.status(200).json({message: "Borrador eliminado"});

    }catch(error){

        return res.status(500).json({message: "Error al eliminar el borrador", error: error.message});
    }
};

module.exports = { 
    getAllDrafts,
    getDraftById,
    updateDraft,
    deleteDraft
};