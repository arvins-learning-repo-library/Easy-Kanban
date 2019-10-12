import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

class Task extends React.Component {
	render() {
		return <Draggable draggableId={this.props.task.id} index={this.props.index}>
			{(provided) => (
				<div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
					<h5><span role="img">📍</span> {this.props.task.text}</h5> [{this.props.task.id}]
				</div>
			)}
		</Draggable>
	}
}

export default Task;