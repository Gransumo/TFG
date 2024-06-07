import React, { useState, useEffect } from 'react'
import { fetchTask } from '../api/events';

export const TaskListAsMember = ({ event }) => {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		async function getTask(id) {
			try {
				const response = await fetchTask(event.id);
				setTasks(response);
			} catch (error) {
				console.error("Error fetching tasks:", error);
			}
		}
		getTask();
	}, []);

	return (
		<div>
			{tasks.map(task => (
				<div key={task.id}>
					{task.description}
				</div>
			))}
		</div>
	)
}

export default TaskListAsMember;
