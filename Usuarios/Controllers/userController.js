const { User, FriendRequest, Friendship } = require('../Models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const createUser = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		// Verificar si ya existe un usuario con el mismo nombre de usuario
		const existingUser = await User.findOne({ where: { username } });
		if (existingUser) {
			return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
		}

		// Encriptar la contraseña usando bcrypt
		const hashedPassword = await bcrypt.hash(password, 10);

		// Crear un nuevo usuario en la base de datos
		const newUser = await User.create({ username, email, passwd_hash: hashedPassword });

		// Devolver el nuevo usuario como respuesta
		res.status(201).json();
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getUserListByArrayIds = async (req, res) => {
    try {
        console.log(req.body);
        const { userIds } = req.body;
        const users = await User.findAll({ 
            where: { id: userIds },
            attributes: ['id', 'username']
        });
        console.log(users);
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		// Buscar al usuario en la base de datos por nombre de usuario
		const user = await User.findOne({ where: { username } });

		// Verificar si el usuario existe
		if (!user) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		// Verificar la contraseña
		const isValidPassword = await bcrypt.compare(password, user.passwd_hash);
		if (!isValidPassword) {
			return res.status(401).json({ error: 'Contraseña incorrecta' });
		}

		// Generar un token JWT
		const token = jwt.sign(
			{ userId: user.id },
			process.env.JWT_SECRET,
			{ expiresIn: '240h' }
		);

		// Devolver el token como respuesta
		res.status(200).json({ token, user: { id: user.id, username: user.username, email: user.email}});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const sendFriendRequest = async (req, res) => {
	try {
		const { userId, recipientUsername } = req.body;
		const recipientUser = await User.findOne({where: { username: recipientUsername } });
		const recipientId = recipientUser.id;

		if (!recipientUser)
			return res.status(404).json({ error: 'Usuario no encontrado' });
		if (recipientId === userId)
			return res.status(400).json({ error: 'No puedes enviarte solicitud de amistad a ti mismo' });
		if (await Friendship.findOne({ where: { userId, friendId: recipientId } }) != null)
			return res.status(400).json({ error: 'Ya eres amigo de este usuario' });
		if (await FriendRequest.findOne({ where: { requesterId: userId, recipientId: recipientId, status: 'pending' } })) 
			return res.status(400).json({ error: 'Ya hay una solicitud en curso' });

		const request = await FriendRequest.create({ requesterId: userId, recipientId });
		res.status(201).json(request);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const acceptFriendRequest = async (req, res) => {
	try {
		const { requestId } = req.body;
		const request = await FriendRequest.findOne({ where: { requestId } });
		if (request.requesterId != req.body.userId) 
			res.status(403).json({ error: 'Request Unauthorized' });
		if (request && request.status === 'pending') {
			request.status = 'accepted';
			await request.save();
			await Friendship.create({ userId: request.requesterId, friendId: request.recipientId });
			await Friendship.create({ userId: request.recipientId , friendId: request.requesterId });
			res.status(200).json({ message: 'Request Accepted' });
		} else {
			res.status(404).json({ error: 'Friend request not found or already processed.' });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const rejectFriendRequest = async (req, res) => {
	try {
		const { requestId } = req.body;
		const request = await FriendRequest.findOne({ requestId });
		if (request && request.status === 'pending') {
			request.status = 'rejected';
			await request.save();
			res.status(200).json(request);
		} else {
			res.status(404).json({ error: 'Friend request not found or already processed.' });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
}

const whoAmi = async (req, res) => {
	try {
		const { userId } = req.body;
		const user = await User.findByPk(userId, {
			attributes: ['username', 'email']
		});
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getUser = async (req, res) => {
	try {
		const { username } = req.body;
		const users = await User.findAll({ where: { username: { [Op.like]: `${username}%` } } });
		if (!users)
			return res.status(404).json({ error: 'Usuarios no encontrado' });
		res.status(200).json(users);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
}

module.exports = {
	createUser,
	login,
	sendFriendRequest,
	acceptFriendRequest,
	rejectFriendRequest,
    getUserListByArrayIds,
	getUser,
	whoAmi
};
