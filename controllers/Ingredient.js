const Ingredient = require ('../models/Ingredient');

const addIngredient = async (req, res) => {
    try {
        const {name,description} = req.body;
        await Ingredient.create({
            name,
            description
        });
        res.status(201).json({ msg: "Ingredient added successfully"});
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

const getIngredient = async (req, res) => {
    try {
        const ingredients = await Ingredient.find();
        res.status(200).json({ data: ingredients, msg:"Ingredients Found " });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
}

module.exports = {addIngredient,getIngredient}