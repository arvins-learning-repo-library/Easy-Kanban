import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Task from './Task';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

class App extends React.Component {

	state = {
		entry: "",
		data: TestData
	}

	constructor() {
		super()

		this.createTask = this.createTask.bind(this)
	}

	createTask() {
		console.log(this.state.entry)

		// Insert to backlog
		if (this.state.entry.trim() !== "") {
			
		}

		// Clear
		this.setState(prevState => ({
			entry: ""
		}))
	}

	onDragEnd = result => {
		// Dragging logic
	}

	render() {
		return (
			<div class="container">
				<div class="row">
					<DragDropContext onDragEnd={this.onDragEnd}>
						<Droppable droppableId="backlogDroppable">
							{(provided) => (
								<div class="col" ref={provided.innerRef} {...provided.droppableProps}>
									// Title of board

									// Tasks of board

									{provided.placeholder}

									<div>
										<input value={this.state.entry} type="text" name="input_text" onChange={event => this.setState({ entry: event.target.value })} />
										<button onClick={this.createTask}>Insert</button>
									</div>
								</div>
							)}
						</Droppable>
					</DragDropContext>
				</div>
			</div >
		)
	}
}

export default App;
