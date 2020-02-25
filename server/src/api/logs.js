const { Router } = require('express');
const router = Router();
const LogEntry = require('../models/LogEntry');

router.get('/', async (req, res) =>{

    try{
        const entries = await LogEntry.find();
        res.json(entries);
    }
    catch(error){
        next(error);
    }
});

router.get('/:id/', async (req, res, next) =>{

    try{
        LogEntry.findById(req.params.id, (err, log) =>{
            if (err){
                return next(err);
            }
            res.send(log)
        });
    }
    catch(error){
        next(error);
    }
});

router.put('/:id/', async (req, res, next) =>{

    try{
        LogEntry.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, log) => {
            if(err){
                return next(err);
            }
            res.send('Product updated');
        });
    }
    catch(error){
        next(error);
    }
});

router.post('/', async (req, res, next) =>{

    try{
        const logEntry = new LogEntry(req.body);
        const createdEntry = await logEntry.save();
        res.json(createdEntry);
    }
    catch(error){
        if(error.name === 'ValidationError'){
            res.status(422);
        }
        next(error);
    }
});

router.delete('/:id', async (req, res) => {

    try{
        LogEntry.findByIdAndRemove(req.params.id, (err, log) => {

            if(err){
                return next(err);
            }
            res.send('Product deleted');
        });
    }
    catch(error){

    }
});

module.exports = router;