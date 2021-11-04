const express = require("express");
const router = express.Router();
const {MyListModel} = require("../models");
const {validateSession}= require('../middleware');

router.get('/test', (req, res) => {
  res.send('Hey!! This is a practice route!')
});

//!  CREATE ITEM
router.post("/create", validateSession, async (req, res) => {
      const { recipeName } = req.body.mylist;
      const {id} = req.user;
      const myList = {
        recipeName,
        owner_id: id
      }
  
      try{
        const newList = await MyListModel.create(myList);
        res.status(201).json( newList )

      }catch (err){
        res.status(500).json({
            message: `Failed to add List. ${err}`      
        })
    }
});

//!  GET ALL RECIPES BY USER
router.get("/mylist", validateSession ,async (req, res) => {
  const { id } = req.user

  try {
    const myRecipeList = await MyListModel.findAll({
      where: {
        owner_id: id
      }
    });
    res.status(200).json(myRecipeList)
  } catch (err) {
    res.status(500).json({ message: `Failed to get items. (${err})` });
  }
});

module.exports = router