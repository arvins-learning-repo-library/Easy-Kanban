import React from 'react';
import { Draggable } from 'react-beautiful-dnd'

export default class Task extends React.Component {
    render() {
        return <Draggable draggableId={this.props.id} index={this.props.index}>
            {(provided) => (
				<span className={"card"} {...provided.draggableProps}
				{...provided.dragHandleProps}
                ref={provided.innerRef}
                >📍 {this.props.text}</span>
            )}
            </Draggable>
    }
}