const express = require("express");
const router = express.Router();
const {GroceryListModel} = require("../models");
const {validateSession}= require('../middleware');

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


router.put("/:id", async (req, res) => {
    const { nameOfIngredient, quantity, measure, weight} = req.body;
    try {
      const updatedGroceryList = await GroceryListModel.update(
        { item },
      
      ).then((result) => {
        res.status(200).json({ message: "List Item successfully updated", updatedGroceryList, result });
      });
    } catch (err) {
      res.status(500).json({ message: `Failed to update list item: ${err}` });
    }
  });

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


module.exports = router;