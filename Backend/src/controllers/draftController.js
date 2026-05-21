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

        return res.status(500).json({message: "Failed to load drafts", error: error.message});
    }
};

const getDraftById = async (req, res) => {

    const { id } = req.params;

    try{
        //Traemos el borrador por su id
        const draft = await contentDraftModel.findByPk(id);

        if(!draft){

            return res.status(404).json({message: "Draft not found"});
        }

        //Devolvemos el borrador encontrado
        return res.status(200).json(draft);

    }catch(error){

        return res.status(500).json({message: "Failed to load draft", error: error.message});
    }
};

const updateDraft = async (req, res) => {
    
    const { id } = req.params;
    const { content } = req.body;

    if(!content){

        return res.status(400).json({message: "The content is required"});
    }

    try{
        //Traemos el borrador por su id
        const draft = await contentDraftModel.findByPk(id);

        if(!draft){
            return res.status(404).json({message: "Draft not found"});
        }

        //Actualizamos el contenido del borrador
        await draft.update({ content });

        return res.status(200).json({message: "Draft updated", draft});

    }catch(error){

        return res.status(500).json({message: "Failed to update draft", error: error.message});
    }
};

const deleteDraft = async (req, res) => {

    const { id } = req.params;

    try{

        //Traemos el borrador por su id
        const draft = await contentDraftModel.findByPk(id);

        if(!draft){

            return res.status(404).json({message: "Draft not found"});
        }

        //Eliminamos el borrador
        await draft.destroy();

        return res.status(200).json({message: "Draft deleted"});

    }catch(error){

        return res.status(500).json({message: "Failed to delete draft", error: error.message});
    }
};

module.exports = { 
    getAllDrafts,
    getDraftById,
    updateDraft,
    deleteDraft
};