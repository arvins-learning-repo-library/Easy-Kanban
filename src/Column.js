import React from "react";
import Task from "./Task"
import { Droppable } from "react-beautiful-dnd"

export default class Column extends React.Component {
    render() {
        return <div>
            <h2>{this.props.column.title}</h2>

            <Droppable droppableId={this.props.column.id}>
                {provided => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {this.props.tasks.map((task, index) => <Task index={index} key={task.id} task={task} />)}

                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    }
}
