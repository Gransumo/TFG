import React, { useState, useEffect } from "react";
import { fetchPendingRequests, fetchCreateFriendRequest, fetchFriendList } from "../api/users";

const UserToRequest = ({ user }) => {
	const [requested, setRequested] = useState(false);
	const [isFriend, setIsFriend] = useState(false);

	useEffect(() => {
		async function checkRequest() {
			try {
				const response = await fetchPendingRequests(user.id);
				if (!response)
					setRequested(false);
				else
					setRequested(true);
			} catch (error) {
				console.error("Error checking requests:", error);
			}
		}

		async function checkFriend() {
			try {
				const response = await fetchFriendList();
				const friend = response.friends.find((friend) => friend.id === user.id);
				if (friend)
					setIsFriend(true);
			} catch (error) {
				console.error("Error checking friends:", error);
			}
		}
		checkFriend();
		checkRequest();
	}, []);

	const sendFriendRequest = async () => {
		try {
			await fetchCreateFriendRequest(user.username);
			setRequested(true);
		} catch (error) {
			console.error("Error sending friend request:", error);
		}
	}

	return (
		<>
			<div className="container border border-dark">
				<p>{user.username}</p>
				{!requested && !isFriend && <i className="fa-solid fa-user-plus" onClick={sendFriendRequest}></i>}
				{isFriend && <i className="fa-solid fa-user-group"></i>}
				{requested && !isFriend && <i className="fa-solid fa-user-check"></i>}
			</div>
		</>
	)
}

export default UserToRequest;