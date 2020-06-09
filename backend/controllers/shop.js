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

exports.getProject = (req, res, next) => {
  const projectId = req.params.projectId;
  
  Project.findById(projectId)
    .then(project => {
        res.json(project);
    })
    .catch(err => console.log(err));
};
  