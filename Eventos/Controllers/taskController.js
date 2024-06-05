const { Task, Member } = require('../Models');
const { fetchEventMembers } = require('../Utils/fetchEventMembers');

const getAllTasks = async (req, res) => {
	try {
		const { eventId } = req.params;
		const { userId } = req.body;
		const members = (await Member.findAll({ where: { eventId } })).map(m => m.userId);
		if (!members.includes(userId)) return res.status(403).json({ error: 'Usuario no autorizado para acceder a las tareas del evento' });
		const users = await fetchEventMembers(members);
		const Tasks = await Task.findAll({ where: { eventId } });
		users.forEach( user => {
			user.tasks = Tasks.filter(t => t.userId == user.id);
			console.log(user);
		});

		res.status(200).json(users);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getTasks = async (req, res) => {
    try {
		const { eventId, userTaskId } = req.params;
		const { userId } = req.body;
		const memberByUser = await Member.findOne({ where: { userId, eventId } });
		if (!memberByUser) return res.status(403).json({ error: 'Usuario no autorizado para acceder a las tareas del evento' });
        const tasks = await Task.findAll({ where: { eventId, userId: userTaskId } });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createTask = async (req, res) => {
    try {
        const { userAsigned, description, userId } = req.body;
		const { eventId } = req.params;
		const memberByUser = await Member.findOne({ where: { userId, eventId } });
        if (!memberByUser || memberByUser.role !== 'admin') {
			return res.status(404).json({ error: 'Usuario no autorizado para asignar tareas' });
		}
		const task = await Task.create({ eventId, userId: userAsigned, description });
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
		const { userId, description } = req.body;
		const { taskId, eventId } = req.params;
		const memberByUser = await Member.findOne({ where: { userId, eventId } });
        if (!memberByUser || memberByUser.role !== 'admin') {
			return res.status(404).json({ error: 'Usuario no autorizado para modificar tareas' });
		}
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        task.description = description;
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
		const { userId } = req.body;
		const { taskId, eventId } = req.params;
		const memberByUser = await Member.findOne({ where: { userId, eventId } });
        if (!memberByUser || memberByUser.role !== 'admin') {
			return res.status(404).json({ error: 'Usuario no autorizado para eliminar tareas' });
		}
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        await task.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
	getAllTasks,
    getTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
};
