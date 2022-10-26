const mongo = require("../connect");
const {ObjectId} = require("mongodb");


module.exports.getLeads = async (req, res, next) => {
    try {
       const leadsData = await mongo.selectedDb.collection("leads").find().toArray();
       res.send(leadsData);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

module.exports.getLeadsById = async (req, res, next) => {
    const id = req.params.id;

    try {
       const leadsData = await mongo.selectedDb.collection("leads").find({_id:ObjectId(id)}).toArray();
       res.send(leadsData);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};


module.exports.updateLeads = async (req, res, next) => {
    const id = req.params.id;
    delete req.body.currentuser;

    try{
   const updatedData = await  mongo.selectedDb.collection("leads").findOneAndUpdate({_id:ObjectId(id)},
   { $set: {...req.body}},
   {returnDocument: "after"});
   res.send(updatedData);
} catch (err) {
    console.error(err);
    res.status(500).send(err);
}
};




module.exports.createLeads = async (req, res, next) => {
    delete req.body.currentuser;

      try {
        const insertedResponse = await mongo.selectedDb.collection("leads").insertOne(req.body);
        res.send(insertedResponse);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};
module.exports.deleteLeads = async (req, res, next) => {
   const id = req.params.id;
   try{
    const deletedData = await mongo.selectedDb.collection("leads").remove({_id:ObjectId(id)});
    res.send(deletedData);
   }
   catch (err) {
    console.error(err);
    res.status(500).send(err);
}
};