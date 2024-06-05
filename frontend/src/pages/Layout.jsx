import React from "react";
import { deleteToken } from "../utils/token";
import { Outlet, Link } from "react-router-dom";

const Layout = ({ user }) => {

	const handleLogout = () => {
		deleteToken();
		window.location.reload();
	}

	return (
		<div>
			<nav>
				<ul>
					<li>
						<Link to='/events'>Eventos</Link>
					</li>
					<li>
						<Link to='/friends'>Amigos</Link>
					</li>
					<li>
						<Link to='/profile'>Perfil</Link>
					</li>
				</ul>
			</nav>
			<Outlet />
		</div>
	);
}

export default Layout;
