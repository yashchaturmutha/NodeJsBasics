const mysqlDatabase4 = require("../utils/Database");

const getTest=(req,res)=>{

    console.log("Get Api");

    try {
        mysqlDatabase4.query("SELECT * FROM customers",
        (error, result) => {
          if (error)
            res.status(400).send({ error: error });
          else
            res.status(200).send(result);
        });
      } catch (error) {
        console.log("adminApiControllers:projectControllers:showProject" + error);
        res.status(500).send({ message: error })
      }
}

const postTest=(req,res)=>{
    console.log("Post Api");
    console.log(req.body);
    res.send({"message":req.body});
}

module.exports={getTest,postTest};