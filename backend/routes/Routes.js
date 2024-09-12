const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.get('/api', async (req, res) => {
        try {
            const items = await Item.find();
            res.json(items);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
)

router.get('/api/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
    } catch (err) {
        res.status(404).json({ message: 'Item not found' });
    }
}
)

router.post('/api', async (req, res) => {
    const item = new Item({
        name : req.body.name,
        description : req.body.description
    });

    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    }catch {
        res.status(400).json({ message: err.message });
    }
}
)

router.put('/api/:id', async (req, res) => {
    try {
        if (req.body.name !== null && req.body.name !== undefined){
            const item = await Item.findByIdAndUpdate(req.params.id, {
                 name: req.body.name 
                },
                {
                     new: true 
                });
            res.json(item);
        }

        if (req.body.description !== null && req.body.description !== undefined){
            const item = await Item.findByIdAndUpdate(req.params.id, {
                 description: req.body.description
                },
                {
                     new: true 
                });
            res.json(item);
        }
    }
    catch (err) {
        res.status(404).json({ message: 'Item not found' });
    }
})

router.delete('/api/:id', getItem ,async (req, res) => {
    try {
        await req.item.remove();
        res.json({ message: 'Item deleted' }); 
    }catch (err) {

        res.status(500).json({ message: err.message });
    }
})



async function getItem(req, res, next) {
    let item;
    try {
        item = await Item.findById(req.params.id);
        if (item == null) {
            return res.status(404).json({ message: 'Cannot find item' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.item = item;
    next();
}

module.exports = router;