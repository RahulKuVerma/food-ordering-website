const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const foodRoutes = require('./routes/foodRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/foods', foodRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    imageUrl: String
});

module.exports = mongoose.model('FoodItem', foodItemSchema);
const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem');

// Get all food items
router.get('/', async (req, res) => {
    const items = await FoodItem.find();
    res.json(items);
});

// Add new food item
router.post('/', async (req, res) => {
    const newItem = new FoodItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
});

module.exports = router;