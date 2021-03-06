const express = require("express");
const router = express.Router();
const {GroceryListModel} = require("../models");
const {validateSession}= require('../middleware');
const { restart } = require("nodemon");

router.get('/practice', (req, res) => {
  res.send('Hey!! This is a practice route!')
});

//!  CREATE ITEM
router.post("/create", validateSession,  async (req, res) => {
      const { item } = req.body.grocerylist;
      const { id } = req.user;
      const Grocerylist = {
            item,
            owner_id: id
      }
  
      try{
        const newItem = await GroceryListModel.create(Grocerylist);
        res.status(201).json( newItem )

      }catch (err){
        res.status(500).json({
            message: `Failed to add item. ${err}`      
        })
    }
});

//!  GET ALL ITEMS BY USER
router.get("/mylist", validateSession ,async (req, res) => {
    const { id } = req.user

    try {
      const userItems = await GroceryListModel.findAll({
        where: {
          owner_id: id
        }
      });
      res.status(200).json(userItems)
    } catch (err) {
      res.status(500).json({ message: `Failed to get items. (${err})` });
    }
  });

//!  DELETE ITEM BY ID
router.delete("/:id", async (req, res) =>{
  try {
      const locatedGroceryList = await GroceryListModel.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json({ message: "List Item successfully removed", locatedGroceryList});
    } catch (err) {
      res.status(500).json({ message: `Failed to remove List Item: ${err}` });
    }
});

//!  UPDATE/EDIT ITEM
router.put("/:id", async (req, res) => {
  const { item } = req.body;
  try {
    const updatedItems = await GroceryListModel.update(
      { item },
     { where: { id: req.params.id }, returning: true }
    ).then((result) => {
      res.status(200).json({ message: "List Item successfully updated", result });
    });
  } catch (err) {
    res.status(500).json({ message: `Failed to update List Item: ${err}` });
  }
});

module.exports = router;