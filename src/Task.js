import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

class Task extends React.Component {
	render() {
		return <Draggable draggableId={this.props.text} index={this.props.index}>
			{(provided) => (
				<div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.ref}>
					<h5><span role="img" class="drag_icon">🗿</span>{this.props.text}</h5>
				</div>
			)}
		</Draggable>
	}
}

export default Task;