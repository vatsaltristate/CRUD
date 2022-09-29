const db = require("../model");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {

  if (!req.body.title) {
    res.status(400).send({
      message: "Empty data"
    });
    return;
  }

  const tutorial = {
    id : req.body.id,
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  Tutorial.create(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Somethings went wrong creating"
      });
    });
};


exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Tutorial.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Somethings went wrong data not found"
      });
    });
};

// exports.findOne = (req, res) => {
//   const id = req.params.id;

//   Tutorial.findByPk(id)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error retrieving data with id=" + id
//       });
//     });
// };


exports.update = (req, res) => {
  const id = req.body.id;
 
  Tutorial.update(req.params, {
    where: { id: id }
  })
    .then(num => {
        if (num == 1) {
        res.send({
          message: "Data updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id= ${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id }
  })
    .then(num => 
    {
      if (num == 1) {
        res.send({
          message: `Data deleted successfully!`
        });
      } else {
        res.send({
          message: `Cannot delete id no. is ${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {

    Tutorial.destroy({
      where: {},
      truncate : false,
    })
    .then(num => 
        {
            res.send({
                message: ` all data successfully deleted`
            })
        })

    .catch(err => {
        res.status(500).send({
            message: "Could not delete with id somthing went to wrong " 
    });
});
};

// find by title
exports.findOne = (req, res) => {
  const title = req.params.title;

  Tutorial.findOne({
    where: { title : title }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving data "
      });
    });
};
