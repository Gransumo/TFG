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
			if (currentText === '') {
				return;
			}
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
				{users.map((user) => (
					<React.Fragment key={user.id}>
						<div className='pb-2 pt-2' style={{ borderBottom: '1px solid #FF6600' }}>
							<div className='d-flex' style={{ justifyContent: 'space-between', alignItems: 'centers' }}>
								<div>
									<h6>{user.username}</h6>
								</div>
								<div>
									{(userAsigningId === user.id) ? (
										<i className="fa-solid fa-minus m-1" onClick={() => { handleAsigningUser(null) }}></i>
									) : (
										<i className="fa-solid fa-plus m-1" onClick={() => { handleAsigningUser(user.id) }}></i>
									)}
								</div>
							</div>
							{userAsigningId === user.id && (
								<div className='d-flex justify-content-between align-items-center'>
									<input type="text" className='form-control' value={currentText} onChange={handlerChange} />
									<i class="fa-solid fa-check m-2" onClick={handleCreate}></i>
								</div>
							)}
							{user.tasks.map((task) => (
								<TaskItem key={task.id} task={task} event={event} onModify={handleModify} />
							))}
						</div>
					</React.Fragment>
				))}
			</div>
		</div>
	)
}

export default TaskListAsAdmin;
