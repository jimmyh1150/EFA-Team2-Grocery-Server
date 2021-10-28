const express = require("express");
const router = express.Router();
const {GroceryListModel} = require("../models");
const {validateSession}= require('../middleware');

router.post("/create", validateSession,  async(req, res) => {
    const{
        nameOfIngredient,
        quantity,
        measure,
        weight
    } = req.body;

    try{
        const Grocerylist = await GroceryListModel.create({
            nameOfIngredient,
            quantity,
            measure,
            weight
        });

        res.status(201).json({
            message: "Your List was created!",
            Grocerylist
        })
    }catch (err){
        res.status(500).json({
            message: `Failed to create list: ${err}`      
        })
    }
})


router.put("/:id", async (req, res) => {
    const { nameOfIngredient, quantity, measure, weight} = req.body;
    try {
      const updatedGroceryList = await GroceryListModel.update(
        { nameOfIngredient, quantity, measure,  weight},
        { where: { id: req.params.id }, returning: true }
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