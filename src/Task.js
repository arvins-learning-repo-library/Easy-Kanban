import React from 'react';
import { Draggable } from 'react-beautiful-dnd'

export default class Task extends React.Component {
    render() {
        return <Draggable draggableId={this.props.task.id} index={this.props.index}>
            {(provided) => (
				<h5 {...provided.draggableProps}
				{...provided.dragHandleProps}
                ref={provided.innerRef}
                >📍 {this.props.task.text}</h5>
            )}
            </Draggable>
    }
}