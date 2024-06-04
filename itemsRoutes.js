const express = require("express")
const router = new express.Router()
const items = require("./fakeDb")
const expressError = require("./expressError")

router.get("/", (req,res) => {
    console.log(items)
    res.json({items})
})

router.post("/", (req,res) => {
    const newItem = {name: req.body.name, price: req.body.price }
    items.push(newItem)
    res.json({items: newItem})
})

router.get("/:name", (req,res) => {
    const foundItem = items.find(item => item.name === req.params.name)
    if(foundItem === undefined){
        throw new expressError("Item not found", 404)
    }
    res.json({items: foundItem})
})

router.patch("/:name", (req,res) => {
    const foundItem = items.find(item => item.name === req.params.name)
    if(foundItem === undefined){
        throw new expressError("Item not found", 404)
    }
    foundItem.name = req.body.name
    foundItem.price = req.body.price
    res.json({items: foundItem})
})

router.delete("/:name", (req,res) => {
    const foundItem = items.findIndex(item => item.name === req.params.name)
    if(foundItem === -1){
        throw new expressError("Item not found", 404)
    }
    items.splice(foundItem,1)
    res.json({message: "DELETED"})
})

 
module.exports = router
