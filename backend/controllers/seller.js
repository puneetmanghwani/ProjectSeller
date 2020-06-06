const Project = require('../models/project');


exports.postAddProject = (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const project = new Project({
        title: title,
        price: price,
        description: description,
    });
    project.save()
    .then(result=>{
        res.json('created');
    })
    .catch(err => {
        console.log(err);
    });
};