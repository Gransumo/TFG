import React from 'react'
import styled from 'styled-components';

export const JoinRequestItem = ({ request, onAccept, onReject }) => {

	const handleAccept = () => {
		onAccept(request.id);
	}

	const handleReject = () => {
		onReject(request.id);
	}

	return (
		<div className='container'>
			<div style={{ borderBottom: "1px solid #FF6600" }}>
				<Item>
					<div className='d-flex align-items-center justify-content-center'>
						<span>{request.user_requester}</span>
					</div>
					<div>
						<button onClick={handleAccept} className='btn btn-success btn-sm'><i className="fa-solid fa-check"></i></button>
						<span className="m-1"></span>
						<button onClick={handleReject} className='btn btn-danger btn-sm'><i className="fa-solid fa-x"></i></button>
					</div>
				</Item>
			</div>
		</div>
	)
}

const Item = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 0.5rem;
`;

export default JoinRequestItem;
