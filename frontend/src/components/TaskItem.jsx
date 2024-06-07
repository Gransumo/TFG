import React, { useState, useEffect } from 'react'
import { fetchUpdateTask, fetchDeleteTask } from '../api/events';

export const TaskItem = ({ task, event, onModify }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [currentText, setCurrentText] = useState(task.description);

	const handleEdit = () => {
		setIsEditing(true);
	}

	const handleSave = () => {
		try {
			fetchUpdateTask(event.id, task.id, { description: currentText });
			setIsEditing(false);
			onModify();
		} catch (error) {
			setIsEditing(false);
			console.error("Error updating task:", error);
		}
	}

	const handleDelete = () => {
		try {
			fetchDeleteTask(event.id, task.id);
			onModify();
		} catch (error) {
			console.error("Error deleting task:", error);
		}
	}

	const handleChange = (e) => {
		setCurrentText(e.target.value);
	}

	return (
		<>
			{isEditing ? (
				<div>
					<input type="text" value={currentText} onChange={handleChange} />
					<button onClick={handleSave}>Save</button>
				</div>
			) : (
				<div>
					{task.description}
					<button onClick={handleEdit}>Edit</button>
					<button onClick={handleDelete}>Delete</button>
				</div>
			)
			}
		</>

	)
}

export default TaskItem;
