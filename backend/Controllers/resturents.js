const Restaurants = require('../Models/resturents')

exports.getRestaurantsByLocId = (req, res) => {
    const { locId } = req.params;
    Restaurants.find({ location_id: locId })
        .then(response => {
            res.status(200).json({
                message: "Restaurants Fetched Succesfully",
                restaurants: response
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.filterRestaurants = (req, res) => {
    let { mealtype, location, cuisine, lcost, hcost, page, sort, itemsPerPage } = req.body;

     sort = sort ? sort : 1;
     page = page ? page : 1;
     itemsPerPage = itemsPerPage ? itemsPerPage : 2;

     let startIndex = page * itemsPerPage - itemsPerPage;
     let endIndex = page * itemsPerPage;

    let filterObj = {};

    mealtype && (filterObj["mealtype_id"] = mealtype);
    location && (filterObj["location_id"] = location);
    cuisine && (filterObj["cuisine_id"] = { $in: cuisine });
    lcost && hcost && (filterObj["min_price"] = { $gte: lcost, $lte: hcost });

    Restaurants.find(filterObj).sort({min_price: sort })
        .then(response => {
            // Pagination Logic
             const filteredResponse = response.slice(startIndex, endIndex);
             const data=Math.ceil(response.length/itemsPerPage);
             
         
             res.status(200).json({
                message: "Restaurants Fetched Succesfully",
                restaurants:filteredResponse,
           Data:data
               
            })
            
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}
/*
exports.getRestaurantDetailsById = (req, res) => {
    const { resId } = req.params;
    console.log(resId)
    Restaurants.findById(resId)
        .then(respons => {
            console.log(resId)
            res.status(200).json({
                message: "Restaurant Fetched Succesfully",
                restaurants: respons

            })

        })

        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}*/
exports.getRestaurantDetailsById = (req, res) => {
    const resId = req.params.resId;
    Restaurants.findById(resId)
        .then(response => {
            res.status(200).json({
                message: "Restaurant Fetched Succesfully",
                restaurants: response
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

/*exports.getAllRestaurantById = (req, res) => {
    const restaurantId = req.params.restaurantId;
    Restaurants.find({ _id: restaurantId }).then(result => {
        res.status(200).json({
            message: ` Restaurant for id: ${restaurantId}`,
            restaurant: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Error in Database",
            error: error
        });
    });
}
*/
