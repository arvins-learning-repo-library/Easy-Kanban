import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

class Task extends React.Component {
	render() {
		return <div><Draggable>
			<h5><span role="img" class="drag_icon">🗿</span>{this.props.text}</h5>
		</Draggable></div>
	}
}

export default Task;