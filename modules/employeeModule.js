const mongo = require("../connect");
const {ObjectId} = require("mongodb");


module.exports.getEmployees = async (req, res, next) => {
    try {
       const employeesData = await mongo.selectedDb.collection("employees").find().toArray();
       res.send(employeesData);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};


module.exports.updateEmployee = async (req, res, next) => {
    const id = req.params.id;
    try{
   const updatedData = await  mongo.selectedDb.collection("employees").findOneAndUpdate({_id:ObjectId(id)},
   { $set: {...req.body.employees}},
   {returnDocument: "after"});
   res.send(updatedData);
} catch (err) {
    console.error(err);
    res.status(500).send(err);
}
};




module.exports.createEmployee = async (req, res, next) => {
      try {
        const insertedResponse = await mongo.selectedDb.collection("employees").insertOne(req.body.employees);
        res.send(insertedResponse);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};
module.exports.deleteEmployee = async (req, res, next) => {
   const id = req.params.id;
   try{
    const deletedData = await mongo.selectedDb.collection("employees").remove({_id:ObjectId(id)});
    res.send(deletedData);
   }
   catch (err) {
    console.error(err);
    res.status(500).send(err);
}
};