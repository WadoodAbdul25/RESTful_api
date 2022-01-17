const express = require('express');
const router = express.Router();
const subs = require('../models/database');
router.use(express.json())
//getting all 
router.get('/',async (req,res)=>{
   try{
       const subscribers = await subs.find();
       res.status(200).json(subscribers);
   }catch(err){
       res.status(500).json({message:err.message})
   }
});

//getting one
router.get('/:id',getsubs,(req,res)=>{
     res.send(res.subscriber);
});

//creating one
router.post('/',async(req,res)=>{
    const subscriber = new subs({
        name : req.body.name,
        subscribedtochannel:req.body.subscribedtochannel
    })
    
    try{
          const newsub = await subscriber.save();
          res.status(201).json(newsub);
    } catch(err){
           res.status(400).json({message:err.message});
    }
});


//updating single element in the object
router.patch('/:id',getsubs,async (req,res)=>{
    if(req.body.name!=null){
        res.subscriber.name = req.body.name;
    }
    if(req.body.subscribedtochannel!=null){
        res.subscriber.subscribedtochannel = req.body.subscribedtochannel;
    }
    try{
        const Updatedsubs = await res.subscriber.save();
        res.json(Updatedsubs);

    }catch(err){
        res.status(400).json({message:err.message});
    }
});

//Upadating the whole object
router.put('/:id',getsubs,async(req,res)=>{
    if(req.body.name && req.body.subscribedtochannel != null){
        res.subscriber.name = req.body.name;
        res.subscriber.subscribedtochannel = req.body.subscribedtochannel;
    }
    try{
        const updatedobj = await res.subscriber.save();
        res.json(updatedobj);
    } catch(err){
        res.status(400).json({message:err.message});
    }
})

//deleting one 
router.delete('/:id',getsubs,async (req,res)=>{
    try{
        await subs.deleteOne({id:req.params.id})
        res.json({message:"Deleted the subscriber"})
    }catch(err){
        res.status(500).json({message:err.message});
    }
});


async function getsubs(req,res,next){
    try{
        subscriber= await subs.findById(req.params.id)
        if(subscriber == null){
            return res.status(404).json({message:"cannot find the subscriber"});
        }
    }catch(err){
        return res.status(500).json({message:err.message});
    }
    res.subscriber = subscriber;
    next();
}

module.exports = router;