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
				{ text: "Create a news app" },
				{ text: "Learn Adobe XD" },
			],

			[
				{ text: "Record a Youtube video" },
				{ text: "Edit a video" },
				{ text: "Upload a video" },
			],

			[
				{ text: "Kanban app UI" },
				{ text: "Kanban app logic" },
			],

			[
				{ text: "Finish scrimba.com course" },
				{ text: "Re-price your apps" },
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
										<Task text={item.text} index={index}/>
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
										<Task text={item.text} index={index}/>
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
										<Task text={item.text} index={index}/>
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
										<Task text={item.text} index={index}/>
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
