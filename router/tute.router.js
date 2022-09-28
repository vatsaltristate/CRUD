module.exports = app => {
    const tutorials = require("../controller/tute.controller.js");
  
    var router = require("express").Router();
  
    router.post("/c", tutorials.create);
    router.get("/r", tutorials.findAll);
    router.get("/r/:id", tutorials.findOne);
    router.put("/u/:id", tutorials.update);
    router.delete("/d/:id", tutorials.delete);
    router.delete("/d", tutorials.deleteAll);
  
    app.use("/tute", router);
  };