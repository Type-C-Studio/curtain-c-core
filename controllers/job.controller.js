const db = require("../models");
const Jobs = db.job;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.qty) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Tutorial
  const job = {
    qty: req.body.qty,
    customer_address: req.body.customer_address,
    customer_company: req.body.customer_company,
    customer_email: req.body.customer_email,
    customer_name: req.body.customer_name,
    customer_tax: req.body.customer_tax,
    customer_tel: req.body.customer_tel,
    date: req.body.date,
    rooms: JSON.stringify(req.body.rooms),
  };

  // Save Tutorial in the database
  Jobs.create(job)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the record.",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { title: { [Op.like]: `%${name}%` } } : null;

  Jobs.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving record.",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Jobs.findByPk(id)
    .then((data) => {
      if (data) {
        const newData = {
          id: data.id,
          qty: data.qty,
          customer_address: data.customer_address,
          customer_company: data.customer_company,
          customer_email: data.customer_email,
          customer_name: data.customer_name,
          customer_tax: data.customer_tax,
          customer_tel: data.customer_tel,
          date: data.date,
          rooms: JSON.parse(data.rooms),
        };

        res.send(newData);
      } else {
        res.status(404).send({
          message: `Cannot find Records with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Records with id=" + id,
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Jobs.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Records was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Assets with id=${id}. Maybe Records was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Records with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Jobs.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Records was Delete successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Records with id=${id}. Maybe Records was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Records with id=" + id,
      });
    });
};
