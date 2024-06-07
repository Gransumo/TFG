import React, { useState, useEffect } from 'react'
import { fetchAllTasks, fetchCreateTask } from '../api/events';
import TaskItem from './TaskItem';

export const TaskListAsAdmin = ({ event }) => {
	const [users, setUsers] = useState([]);
	const [render, setRender] = useState(0);
	const [userAsigningId, setUserAsigningId] = useState(null);
	const [currentText, setCurrentText] = useState('');

	const forceUpdate = () => {
		setRender(0);
	};
	
	useEffect(() => {
		async function getTasks() {
			try {
				const response = await fetchAllTasks(event.id);
				setUsers(response);
			} catch (error) {
				console.error("Error fetching tasks:", error);
			}
		}
		getTasks();
	}, [render]);

	const handleModify = () => {
		setRender(render + 1);
	}

	const handleCreate = async () => {
		try {
			const task = await fetchCreateTask(event.id, currentText, userAsigningId);
			setUsers(users.map(user => {
				if (user.id === userAsigningId) {
					user.tasks.push(task);
				}
				return user;
			}));
			setCurrentText('');
			setUserAsigningId(null);
			setRender(render + 1);
		} catch (error) {
			console.error("Error creating task:", error);
		}
	}

	const handlerChange = (e) => {
		setCurrentText(e.target.value);
	}

	const handleAsigningUser = (id) => {
		if (id === null || id !== userAsigningId) {
			setCurrentText('');
		}
		setUserAsigningId(id);
	}

	return (
		<div>
			<div className="container">
				<h3>Tareas</h3>
				{users.map((user) => (
					<React.Fragment key={user.id}>
						<div className='d-flex'>
							<h6>{user.username}</h6>
							{(userAsigningId === user.id) ? (
								<i className="fa-solid fa-minus m-1" onClick={() => {handleAsigningUser(null)}}></i>
							) : (
								<i className="fa-solid fa-plus m-1" onClick={() => {handleAsigningUser(user.id)}}></i>

							)}
						</div>
						{userAsigningId === user.id && (
							<div>
								<input type="text" value={currentText} onChange={handlerChange} />
								<button onClick={handleCreate}>Crear</button>
							</div>
						)}
						{user.tasks.map((task) => (
							<TaskItem key={task.id} task={task} event={event} onModify={handleModify} />
						))}
					</React.Fragment>
				))}
			</div>
		</div>
	)
}

export default TaskListAsAdmin;
