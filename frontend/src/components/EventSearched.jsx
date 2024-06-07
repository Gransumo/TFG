import React, { useState, useEffect } from 'react'
import { fetchMembers, fetchCreateMember, fetchCreateJoinRequest, fetchJoinRequest } from '../api/events';

export const EventSearched = ({ event }) => {
	const [isMember, setIsMember] = useState(false);
	const [isRequested, setIsRequested] = useState(false);

	useEffect(() => {
		async function checkMember() {
			try {
				const response = await fetchMembers(event.id);
				setIsMember(true);
			} catch (error) {
				setIsMember(false);
				console.error("Error checking members:", error);
			}
		}

		async function checkRequested() {
			try {
				console.log(event);
				const response = await fetchJoinRequest(event.id);
				setIsRequested(true);
			} catch (error) {
				setIsMember(false);
				console.error("Error checking requests:", error);
			}
		}
		checkMember();
		checkRequested();
	}, []);

	const handleJoinRequest = async () => {
		try {
			await fetchCreateJoinRequest(event.id);
			setIsRequested(true);
		} catch (error) {
			console.error("Error sending join request:", error);
		}
	}

	const handleJoin = async () => {
		try {
			await fetchCreateMember(event.id);
			window.location.href = '/events';
		} catch (error) {
			console.error("Error joining event:", error);
		}
	}

	return (
		<div>
			<div className="container border border-dark">
				<p>{event.name}</p>
				{isMember && <i className="fa-solid fa-user-group"></i>}
				{!isMember && event.private && <i className="fa-solid fa-lock"></i>}
				{!isMember && event.private && !isRequested && (<i className="fa-solid fa-user-plus" onClick={handleJoinRequest}></i>)}
				{!isMember && event.private && isRequested && <i className="fa-solid fa-user-check"></i>}
				{!isMember && !event.private && <i className="fa-solid fa-user-plus" onClick={handleJoin}></i>}
			</div>
		</div>
	)
}

export default EventSearched;
