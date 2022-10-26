const mongo = require("../connect");
const {ObjectId} = require("mongodb");


module.exports.getServices = async (req, res, next) => {
    try {
       const serviceData = await mongo.selectedDb.collection("services").find().toArray();
       res.send(serviceData);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

module.exports.getServiceByID = async (req, res, next) => {
    const id = req.params.id;

    try {
       const serviceData = await mongo.selectedDb.collection("services").find({_id:ObjectId(id)}).toArray();
       res.send(serviceData);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};


module.exports.updateServices = async (req, res, next) => {
    const id = req.params.id;
    delete req.body.currentuser;

    try{
   const updateServices = await  mongo.selectedDb.collection("services").findOneAndUpdate({_id:ObjectId(id)},
   { $set: {...req.body}},
   {returnDocument: "after"});
   res.send(updateServices);
} catch (err) {
    console.error(err);
    res.status(500).send(err);
}
};




module.exports.createServices = async (req, res, next) => {
    delete req.body.currentuser;

      try {
        const insertedResponse = await mongo.selectedDb.collection("services").insertOne(req.body);
        res.send(insertedResponse);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};
module.exports.deleteServices = async (req, res, next) => {
   const id = req.params.id;
   try{
    const deletedData = await mongo.selectedDb.collection("services").remove({_id:ObjectId(id)});
    res.send(deletedData);
   }
   catch (err) {
    console.error(err);
    res.status(500).send(err);
}
};