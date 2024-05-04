const Location =require('../Models/locations');

exports.getLocations = (req,res) =>{
    Location.find().then(response =>{
        res.status(200).json({message:"locations fetched successfully",locations:response})

    }).catch(err =>{
        res.status(500).json({error:err})
    })
}