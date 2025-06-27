const foodModel = require('../models/foodModel')
const fsPromises = require('fs').promises
const path = require('path')

const addFood = async (req, res) => {
    try {
        
        const image_filename = req.file?.filename || ""; 
        const imageUrl = `${req.protocol}://${req.get('host')}/image/${image_filename}`;

        await foodModel.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: imageUrl 
        })

        res.status(201).json({ "message": "Food added Successfully" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ "message": "Error adding food" })
    }
}


const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find()
        res.status(200).json({ data: foods })
    } catch (error) {
        console.log(error)
        res.status(500).json({ "message": "Error listing food" })
    }
}

const removeFood = async (req, res) => {
    try {
        const { id } = req.query
        console.log(id);
        const food = await foodModel.findById(id)
        if (!food)
            return res.status(404).json({ "message": "Food not found" })

    
        const imageFileName = food.image.split('/image/')[1];

        await fsPromises.unlink(path.join(__dirname, '..', 'uploads', imageFileName))
        await foodModel.deleteOne({ _id: id })

        res.status(200).json({ "message": "Food deleted successfully" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Error deleting food" })
    }
}

module.exports = { addFood, listFood, removeFood }
