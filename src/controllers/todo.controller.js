const Task = require("../models/task.model");

module.exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { userId: req.user.id } });

        return res.json(tasks);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Oops! Something went wrong. Please try again in a moment' });
    }
}

module.exports.createTask = async (req, res) => {
    const { title } = req.body;

    try {
        const task = await Task.create({
            title,
        });

        return res.json(task);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Oops! Something went wrong. Please try again in a moment' });
    }
}
