const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const foodsDataPath = path.join(__dirname, 'data', 'foods.json');

// Helper function to read foods data
const readFoodsData = () => {
  try {
    const data = fs.readFileSync(foodsDataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading foods data:', error);
    return [];
  }
};

// Helper function to write foods data
const writeFoodsData = (data) => {
  try {
    fs.writeFileSync(foodsDataPath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing foods data:', error);
    return false;
  }
};

// GET /api/foods - Get all foods
router.get('/', (req, res) => {
  try {
    const foods = readFoodsData();
    const { search } = req.query;
    
    let filteredFoods = foods;
    
    // Filter by search term if provided
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredFoods = foods.filter(food => 
        food.name.toLowerCase().includes(searchTerm) ||
        food.description.toLowerCase().includes(searchTerm) ||
        food.category.toLowerCase().includes(searchTerm)
      );
    }
    
    res.json({
      success: true,
      data: filteredFoods,
      count: filteredFoods.length,
      total: foods.length,
      search: search || null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching foods',
      error: error.message
    });
  }
});

// GET /api/foods/:id - Get single food by ID
router.get('/:id', (req, res) => {
  try {
    const foods = readFoodsData();
    const food = foods.find(f => f.id === parseInt(req.params.id));
    
    if (!food) {
      return res.status(404).json({
        success: false,
        message: 'Food not found'
      });
    }
    
    res.json({
      success: true,
      data: food
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching food',
      error: error.message
    });
  }
});

// POST /api/foods - Add new food
router.post('/', (req, res) => {
  try {
    const foods = readFoodsData();
    const { name, description, price, image, category } = req.body;
    
    // Validation
    if (!name || !description || !price) {
      return res.status(400).json({
        success: false,
        message: 'Name, description, and price are required'
      });
    }
    
    // Create new food
    const newFood = {
      id: Math.max(...foods.map(f => f.id), 0) + 1,
      name,
      description,
      price: parseFloat(price),
      image: image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
      category: category || 'Other',
      inStock: true
    };
    
    foods.push(newFood);
    
    if (writeFoodsData(foods)) {
      res.status(201).json({
        success: true,
        data: newFood,
        message: 'Food added successfully'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Error saving food'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding food',
      error: error.message
    });
  }
});

// PUT /api/foods/:id - Update food
router.put('/:id', (req, res) => {
  try {
    const foods = readFoodsData();
    const foodIndex = foods.findIndex(f => f.id === parseInt(req.params.id));
    
    if (foodIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Food not found'
      });
    }
    
    const { name, description, price, image, category, inStock } = req.body;
    
    // Update food
    foods[foodIndex] = {
      ...foods[foodIndex],
      ...(name && { name }),
      ...(description && { description }),
      ...(price && { price: parseFloat(price) }),
      ...(image && { image }),
      ...(category && { category }),
      ...(inStock !== undefined && { inStock })
    };
    
    if (writeFoodsData(foods)) {
      res.json({
        success: true,
        data: foods[foodIndex],
        message: 'Food updated successfully'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Error updating food'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating food',
      error: error.message
    });
  }
});

// DELETE /api/foods/:id - Delete food
router.delete('/:id', (req, res) => {
  try {
    const foods = readFoodsData();
    const foodIndex = foods.findIndex(f => f.id === parseInt(req.params.id));
    
    if (foodIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Food not found'
      });
    }
    
    const deletedFood = foods.splice(foodIndex, 1)[0];
    
    if (writeFoodsData(foods)) {
      res.json({
        success: true,
        data: deletedFood,
        message: 'Food deleted successfully'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Error deleting food'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting food',
      error: error.message
    });
  }
});

module.exports = router;