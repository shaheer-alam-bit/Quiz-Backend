const { get } = require('mongoose');
const Recipe = require('../models/Recipe');

const addRecipe = async (req, res) => {
    try {
        const {name,description,ingredients} = req.body;
        const adminID = req.user.id;
        await Recipe.create({
            name,
            description,
            ingredients,
            adminID
          });
        res.status(201).json({ msg: "Recipe added successfully"});
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

const getRecipe = async (req, res) => {
    try {
        const recipes = await Recipe.find().populate('ingredients');
        res.status(200).json({ data: recipes, msg:"Recipes Found " });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
}

const getRecipeByID = async (req, res) => {
    try {
        const id = req.params.id;
        const recipe = await Recipe.findOne({ _id: id }).populate('ingredients');
        res.status(200).json({ data: recipe, msg: "Recipe Found" });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
}

const deleteRecipe = async (req, res) => {
    try {
        const id = req.params.id;
        await Book.findByIdAndDelete(id);
        res.status(200).json({ msg: "Book deleted successfully" });
    }
    catch (err) {
        res.status(400).json({ msg: err.message });
    }
}

const updateRecipe = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, author, genre } = req.body;
        const book = await Book.findOne({ _id: id})
        if (title !== undefined) {
            book.title = title;
        }
        if (author !== undefined) {
            book.author = author;
        }
        if (genre !== undefined) {
            book.genre = genre;
        }
        await book.save();
        res.status(200).json({ msg: "Book updated successfully" });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
}

module.exports = { addRecipe, getRecipe, deleteRecipe, updateRecipe,getRecipeByID}