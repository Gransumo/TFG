import React, { useState, useEffect } from 'react'

export const JoinRequestItem = ({ request, onAccept, onReject }) => {

	const handleAccept = () => {
		onAccept(request.id);
	}

	const handleReject = () => {
		onReject(request.id);
	}

	return (
		<div className='d-flex'>
			<p>{request.user_requester}</p>
			<button onClick={handleAccept} className='btn btn-success'><i className="fa-solid fa-check"></i></button>
			<button onClick={handleReject} className='btn btn-danger'><i className="fa-solid fa-x"></i></button>
		</div>
	)
}

export default JoinRequestItem;
