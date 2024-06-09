import React from "react";
import styled from "styled-components";

const Item = styled.div`
	width: auto;
	max-width: 500px;
	/* Add any other styles you want for the cards */
`;

/* <div className="container p-2">
			<h1>EVENTOS</h1>
			<div>
				<Link to={'/create-event'} className="btn btn-success"><i className="fa-solid fa-plus"></i>CREAR EVENTO</Link>
			</div>
			<div>
				<button className='btn border border-dark' onClick={() => {handleModal(true)}}><i className="fa-solid fa-magnifying-glass"></i>BUSCAR EVENTO</button>
			</div>
			<Modal isOpen={modalOpen} onClose={handleModal} modalTitle={'BUSCAR EVENTO'}>
				<SearchEvents />
			</Modal>
			<div>LISTA DE EVENTOS</div>
			<EventList />
		</div> */