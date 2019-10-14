import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Task from './Task';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { cloneDeep, pull } from "lodash"

function getRandomId() {
    let min = Math.ceil(100); // Set to 100 so you can add up 100 examples
    let max = Math.floor(Number.MAX_SAFE_INTEGER);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class App extends React.Component {

	state = {
		entry: "",
		tasks: [
			// Task IDs must be unique. Use getRandomId for that.
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
		let input = this.state.entry.trim()

		// Insert to backlog
		if (input !== "") {
			let col = this.state.tasks[0].slice(0)
			col.push({
				id: getRandomId(),
				text: input,
			})

			this.setState(prevState => ({
				tasks: [
					col,
					prevState.tasks[1],
					prevState.tasks[2],
					prevState.tasks[3],
				]
			}))
		}

		// Clear
		this.setState(prevState => ({
			entry: ""
		}))
	}

	// Dragging logic
	onDragEnd = result => {
		console.log(result)

		// Simple case: Dragged to somewhere that doesn't make sense.
		if (!result.destination) {
			return;
		}

		// Simple case: Dragged to the exact same pos.
		if (result.destination === result.source && result.destination.index === result.source.index) {
			return;
		}

		// Get dragged item
		let allTasks = this.state.tasks.flat() // Combine subarrays, depth of 1
		let draggedItem = allTasks.find(x => x.id === result.draggableId)	
		
		console.log(draggedItem)

		// Works for dragging within the same column
		if (result.destination.droppableId === "backlog") {
			console.log("adding to backlog")

			let col = this.state.tasks[0].slice(0)
			let inserting = cloneDeep(draggedItem)
			inserting.id = getRandomId()

			// insert and remove
			col.push(inserting)
			pull(col, draggedItem)

			this.setState(prevState => ({
				tasks: [
					col,
					prevState.tasks[1],
					prevState.tasks[2],
					prevState.tasks[3]
				]
			}))
		}
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
