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
				<div className='d-flex justify-content-between align-items-center'>
					<input type="text" value={currentText} className='form-control' onChange={handleChange} />
					<i class="fa-solid fa-check m-2" onClick={handleSave}></i>
				</div>
			) : (
				<div className='d-flex justify-content-between align-items-center'>
					<span>{task.description}</span>
					<div style={{ marginLeft: '15px' }}>
						<i className="fa-solid fa-pen-to-square" onClick={handleEdit}></i>
						<i className="fa-solid fa-trash m-2" onClick={handleDelete}></i>
					</div>
				</div>
			)
			}
		</>

	)
}

export default TaskItem;
