const { User, FriendRequest, Friendship } = require('../Models');


const getList = async (req, res) => {
	try {
		const friendships = await Friendship.findAll({
			where: {
			  userId: req.body.userId
			},
			include: [{
			  model: User,
			  as: 'friend',
			  attributes: ['id', 'username']
			}]
		  });

		  const friends = friendships.map(f => f.friend);
	  
		  res.status(200).json({ friends });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
}

const destroy = async (req, res) => {
	try {
		const userId = req.body.userId;
		const { friendId } = req.params;
		const friendship = await Friendship.findOne({ where: { userId: userId, friendId: friendId } });
		const sfriendship = await Friendship.findOne({ where: { userId: friendId, friendId: userId } });
		if (!friendship || !sfriendship)
			return res.status(404).json({ error: 'Relacion de amistad no encontrada' });
		else {
			friendship.destroy();
			sfriendship.destroy();
			return res.status(201).json({ message: 'Amistad eliminada correctamente' });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
}

module.exports = {
	getList,
	destroy
};
