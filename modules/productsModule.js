const mongo = require("../connect");
const {ObjectId} = require("mongodb");


module.exports.getProducts = async (req, res, next) => {
    try {
       const productData = await mongo.selectedDb.collection("products").find().toArray();
       res.send(productData);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

module.exports.getProductsByid = async (req, res, next) => {
    const id = req.params.id;

    try {
       const productData = await mongo.selectedDb.collection("products").find({_id:ObjectId(id)}).toArray();
       res.send(productData);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};


module.exports.updateProducts = async (req, res, next) => {
    const id = req.params.id;

    delete req.body.currentuser;

    try{
   const updatedData = await  mongo.selectedDb.collection("products").findOneAndUpdate({_id:ObjectId(id)},
   { $set: {...req.body}},
   {returnDocument: "after"});
   res.send(updatedData)
} catch (err) {
    console.error(err);
    res.status(500).send(err);
}
};




module.exports.createProducts = async (req, res, next) => {
      try {
        delete req.body.currentuser;
        const insertedResponse = await mongo.selectedDb.collection("products").insertOne(req.body);
        res.send(insertedResponse);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};
module.exports.deleteProducts = async (req, res, next) => {
   const id = req.params.id;
   try{
    const deletedData = await mongo.selectedDb.collection("products").remove({_id:ObjectId(id)});
    res.send(deletedData);
   }
   catch (err) {
    console.error(err);
    res.status(500).send(err);
}
};