'use strict';
const router = require('express').Router();
const { ToDo } = require("../config/db");

// ? GET ALL
router.get("/getAll", (req, res, next) => {
    ToDo.find((err, toDo) => {
        if (err) {
            next(err);
        }
        res.send(toDo);
    });
});

// ? GET ONE
router.get("/get/:id", (req,res,next) => {
    ToDo.findById(req.params.id, (err,result) => {
        if(err){
            next(err);
        }
        res.status(200).send(result);
    })
})

// ? CREATE
router.post("/create", (req, res, next) => {
    const item = new ToDo(req.body);
    item.save()
        .then((result) => {
            res.status(201).send(`${result.description} task has been added successfully!`)
        })
        .catch((err) => next(err));
});

// ? DELETE
router.delete("/delete/:id", (req, res, next) => {
    ToDo.findByIdAndDelete(req.params.id, (err) => {
        if(err){
            next(err);
        }
        res.status(204).send(`Successfully deleted`);
    });
});

// ? PARTIAL UPDATE
router.patch("/update/:id", (req, res, next) => {
    ToDo.findByIdAndUpdate(req.params.id, 
    req.body, 
    {new: true}, 
    (err) => {
       if(err){
           next(err);
       }
       res.status(202).send(`Successfully updated!`);
   })
});

// ? REPLACE
router.put("/replace/:id", (req,res,next) => {
    ToDo.findByIdAndUpdate(req.body.id, req.body, {new: true}, (err)=>{
        if(err){
            next(err);
        }
        res.status(202).send(`Successfully replaced!`);
    });
});

module.exports = router;