import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Task from './Task';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

class App extends React.Component {

	state = {
		entry: "",
		tasks: [
			[
				{ id: 1, text: "Create a news app" },
				{ id: 2, text: "Learn Adobe XD" },
			],

			[
				{ id: 3, text: "Record a Youtube video" },
				{ id: 4, text: "Edit a video" },
				{ id: 5, text: "Upload a video" },
			],

			[
				{ id: 6, text: "Kanban app UI" },
				{ id: 7, text: "Kanban app logic" },
			],

			[
				{ id: 8, text: "Finish scrimba.com course" },
				{ id: 9, text: "Re-price your apps" },
			],
		]
	}

	constructor() {
		super()

		this.createTask = this.createTask.bind(this)
	}

	createTask() {
		console.log(this.state.entry)

		// Insert to backlog
		if (this.state.entry.trim() !== "") {
			// TODO
		}

		// Clear
		this.setState(prevState => ({
			entry: ""
		}))
	}

	onDragEnd = result => {
		// Dragging logic
		console.log(result)
	}

	render() {
		return (
			<div class="container">
				<div class="row">
					<div class="col">
						<input value={this.state.entry} type="text" name="input_text" onChange={event => this.setState({entry: event.target.value})} />
						<button onClick={this.createTask}>Insert</button>
					</div>

					<DragDropContext onDragEnd={this.onDragEnd}>
						<Droppable droppableId="backlog">
							{(provided) => (
								<div class="col" ref={provided.innerRef} {...provided.droppableProps}>
									<h1>Backlog</h1>

									{this.state.tasks[0].map((item, index) => (
										<Task id={item.id} text={item.text} index={index}/>
									))}

									{provided.placeholder}
								</div>
							)}
						</Droppable>

						<Droppable droppableId="todo">
							{(provided) => (
								<div class="col" ref={provided.innerRef} {...provided.droppableProps}>
									<h1>TODO</h1>

									{this.state.tasks[1].map((item, index) => (
										<Task id={item.id} text={item.text} index={index}/>
									))}

									{provided.placeholder}
								</div>
							)}
						</Droppable>

						<Droppable droppableId="doing">
							{(provided) => (
								<div class="col" ref={provided.innerRef} {...provided.droppableProps}>
									<h1>In Progress</h1>

									{this.state.tasks[2].map((item, index) => (
										<Task id={item.id} text={item.text} index={index}/>
									))}

									{provided.placeholder}
								</div>
							)}
						</Droppable>

						<Droppable droppableId="done">
							{(provided) => (
								<div class="col" ref={provided.innerRef} {...provided.droppableProps}>
									<h1>Done!</h1>

									{this.state.tasks[3].map((item, index) => (
										<Task id={item.id} text={item.text} index={index}/>
									))}

									{provided.placeholder}
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
