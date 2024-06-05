const fetchEventMembers = async (membersID) => {
	const endpoint = 'http://localhost:3000/api/get-users-by-ids';
	try {
		const response = await fetch(endpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ userIds: membersID })
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}\n ${response.statusText}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
	return response;
}

module.exports = {
	fetchEventMembers
};