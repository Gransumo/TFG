import '../styles/general.css';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Offcanvas } from 'react-bootstrap';
import { Outlet, Link } from "react-router-dom";
import '../styles/general.css';

const Layout = ({ user }) => {
	const [showOffcanvas, setShowOffcanvas] = useState(false);
	const [pageSelected, setPageSelected] = useState('events');

	const handleSelected = (e) => {
		setPageSelected(e);
	};

	const handleToggleOffcanvas = (e) => {
		setShowOffcanvas(!showOffcanvas);
		handleSelected(e);
	};

	return (
		<div style={{ display: "flex"}}>
			<Navbar expand="md" className="flex-column bgg-primary vh-100 position-fixed col-2" style={{maxWidth: "200px"}}>
				<button className="navbar-toggler" type="button" onClick={handleToggleOffcanvas}>
					<span className="navbar-toggler-icon"></span>
				</button>
				<img src="LOGO.png" alt="LOGO" className='logo' />
				<Navbar.Collapse style={{flexDirection: "column", width: "100%"}}>
					<Nav className="d-block pt-4" style={{width: '100%'}}>
						<Nav.Link as={Link} to="/events" onClick={() => handleSelected('event')} className={`navbar-item ${pageSelected === 'events' ? 'active' : ''}`}>
							Eventos
						</Nav.Link>
						<Nav.Link as={Link} to="/friends" onClick={() => handleSelected('friends')} className={`navbar-item ${pageSelected === 'friends' ? 'active' : ''}`}>
							Amigos
						</Nav.Link>
						<Nav.Link as={Link} to="/profile" onClick={() => handleSelected('profile')} className={`navbar-item ${pageSelected === 'profile' ? 'active' : ''}`}>
							Perfil
						</Nav.Link>
						<Nav.Link as={Link} to="/inbox" onClick={() => handleSelected('inbox')} className={`navbar-item ${pageSelected === 'inbox' ? 'active' : ''}`}>
							Notificaciones
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>

			<Offcanvas className="bgg-primary" show={showOffcanvas} onHide={handleToggleOffcanvas}>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Menu</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<Nav className="flex-column">
						<Nav.Link as={Link} onClick={() => handleToggleOffcanvas('events')} to="/events" className={`navbar-item ${pageSelected === 'events' ? 'active' : ''}`}>
							Eventos
						</Nav.Link>
						<Nav.Link as={Link} onClick={() => handleToggleOffcanvas('friends')} to="/friends" className={`navbar-item ${pageSelected === 'friends' ? 'active' : ''}`}>
							Amigos
						</Nav.Link>
						<Nav.Link as={Link} onClick={() => handleToggleOffcanvas('profile')} to="/profile" className={`navbar-item ${pageSelected === 'profile' ? 'active' : ''}`}>
							Perfil
						</Nav.Link>
						<Nav.Link as={Link} onClick={() => handleToggleOffcanvas('inbox')} to="/inbox" className={`navbar-item ${pageSelected === 'inbox' ? 'active' : ''}`}>
							Notificaciones
						</Nav.Link>
					</Nav>
				</Offcanvas.Body>
			</Offcanvas>
			<div className='col-2' style={{maxWidth: "200px"}}></div>
			<div style={{ flex: 1 }}>
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
