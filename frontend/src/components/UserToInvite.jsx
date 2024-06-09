import React, { useState, useEffect } from "react";
import { fetchCreateInvitation, fetchPendingInvitations, fetchMembers } from "../api/events";

export const UserToInvite = ({ user, event }) => {
	const [invited, setInvited] = useState(false);
	const [isMember, setIsMember] = useState(false);

	useEffect(() => {
		async function checkInvitation() {
			try {
				console.log(event.id);
				const response = await fetchPendingInvitations(event.id);
				console.log(response);
				if (!response)
					setInvited(false);
				else if (response.find((invitation) => invitation.user_invited_Id === user.id))
					setInvited(true);
			} catch (error) {
				console.error("Error checking invitations:", error);
			}
		}

		async function checkMember() {
			try {
				const response = await fetchMembers(event.id);
				const member = response.find((member) => member.userId === user.id);
				if (member)
					setIsMember(true);
			} catch (error) {
				console.error("Error checking members:", error);
			}
		}
		checkMember();
		checkInvitation();
	}, []);

	const sendInvitation = async () => {
		try {
			await fetchCreateInvitation(event.id, user.id);
			setInvited(true);
		} catch (error) {
			console.error("Error sending invitation:", error);
		}
	}
	return (
		<div className="container" style={{ borderBottom: '1px solid #FF6600' }}>
			<div style={{ display: "flex", justifyContent: 'space-between', alignItems: "center" }} className="m-2">
				<div className="d-flex align-items-center">
					<span style={{ marginRight: "10px" }}>{user.username}</span>
				</div>
				{!invited && !isMember && <i className="fa-solid fa-user-plus" onClick={sendInvitation}></i>}
				{isMember && <i className="fa-solid fa-user-group"></i>}
				{invited && !isMember && <i className="fa-solid fa-user-check"></i>}
			</div>
		</div>
	)
}

export default UserToInvite;
