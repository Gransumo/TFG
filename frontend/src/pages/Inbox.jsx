import React from "react";
import NotificationList from '../partials/NotificationList';
const Inbox = () => {

	return (
		<div className="container p-5" style={{ marginTop: "50px" }}>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #FF6600" }}>
				<h1>Notificaciones</h1>
			</div>
			<div className="container">
				<NotificationList />
			</div>
		</div>
	);
}

export default Inbox;
