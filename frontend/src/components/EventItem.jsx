import React, { useState, useEffect } from "react";
import Modal from "../partials/Modal";
import { fetchExitEvent } from "../api/events";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Col } from "react-bootstrap";
import '../styles/general.css';

const EventItem = ({ event }) => {

	return (
		<Col xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
			<Item className="border-dark">
				<div className="card-body">
					<div className="container m-0 p-0">
						<Link to={`/events/${event.code}`}>
							<h3>{event.name}</h3>
						</Link>
					</div>
				</div>
			</Item>
		</Col>
	);
}

export default EventItem;

const ExitButton = styled.button`
	right: 0;
`;

const Item = styled.div`
		width: auto;
		width: 300px;
		border-radius: 10px;
		background-color: #fff;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		border: 1px solid #ccc;
		padding: 1rem;
		margin-bottom: 1rem;
	`;