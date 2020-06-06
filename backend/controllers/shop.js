const Project = require('../models/project');


exports.getProjects = (req, res, next) => {
    Project.find()
      .then(projects => {
        res.json(projects);
      })
      .catch(err => {
        console.log(err);
      });
  };