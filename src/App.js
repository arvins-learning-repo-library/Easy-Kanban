import React, { useState } from 'react';
import Logo from './Logo.png';
import './App.css';
import Task from './Task';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { cloneDeep, pull } from "lodash"

function getRandomId() {
	let min = Math.ceil(100); // Set to 100 so you can add up 100 examples
	let max = Math.floor(Number.MAX_SAFE_INTEGER);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
Needed for IE compat since we can't use Array.flat() */
function* flatten(array) {
    for (const item of array) {
        if (Array.isArray(item)) {
            yield* flatten(item);
        } else {
            yield item;
        }
    }
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

	componentDidMount() {
		let localTasks = localStorage.getItem('page1_tasks')

		if (localTasks) {
			console.log('Loading tasks: ', localTasks)

			this.setState({
				tasks: JSON.parse(localTasks)
			})
		}

		console.log("Tasks not loaded, setting default state...")
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log("State tasks updated...")

		// TODO saving doesn't happen immediately. Sometimes you need a moment. Have an indicator icon.
		if (this.state.tasks !== prevState.tasks) {
			localStorage.setItem('page1_tasks', JSON.stringify(this.state.tasks))
			console.log('Tasks saved!')
		}
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
			console.log("Simple case: dragged to somewhere that does not make sense.")
			return;
		}

		// Simple case: Dragged to the exact same pos.
		if (result.destination === result.source && result.destination.index === result.source.index) {
			console.log("Simple case: dragged to the exact same place.")
			return;
		}

		// Make a copy of tasks. Remember that state is READ ONLY in React.
		let copiedTasks = this.state.tasks.slice(0)

		// Get dragged item
		let allTasks = [...flatten(copiedTasks)] // Combine subarrays, depth of 1
		let draggedItem = allTasks.find(x => x.id === result.draggableId)
		console.log("Dragged: ", draggedItem)

		// If dragged to delete, pass it to deleteTask
		if (result.destination.droppableId === "delete") {
			this.deleteTaskAfterDragging(draggedItem)
			return;
		}

		/*
		Moving Algorithm: 
		1. Copy the dragged item and change its id
		2. Delete the original item from its  column
		3. Insert the dragged item to its new place (ALWAYS DO 3 AFTER 2.)
		*/
		let newCol
		if (result.destination.droppableId === "backlog") newCol = 0 // TODO constants
		if (result.destination.droppableId === "todo") newCol = 1
		if (result.destination.droppableId === "doing") newCol = 2
		if (result.destination.droppableId === "done") newCol = 3

		let duplicated = cloneDeep(draggedItem)
		duplicated.id = getRandomId()
		console.log("Duplicated: ", duplicated)

		copiedTasks[0] = pull(copiedTasks[0], draggedItem) // TODO clean
		copiedTasks[1] = pull(copiedTasks[1], draggedItem)
		copiedTasks[2] = pull(copiedTasks[2], draggedItem)
		copiedTasks[3] = pull(copiedTasks[3], draggedItem)

		copiedTasks[newCol].splice(result.destination.index, 0, duplicated)

		console.log("Updating state to: ", copiedTasks)

		// Update the state.
		this.setState({ tasks: copiedTasks })
	}

	deleteTaskAfterDragging(clickedTask) {
		console.log("Deleting: ", clickedTask)

		let copiedTasks = this.state.tasks.slice(0)

		copiedTasks[0] = pull(copiedTasks[0], clickedTask) // TODO clean
		copiedTasks[1] = pull(copiedTasks[1], clickedTask)
		copiedTasks[2] = pull(copiedTasks[2], clickedTask)
		copiedTasks[3] = pull(copiedTasks[3], clickedTask)

		// Update the state.
		this.setState({ tasks: copiedTasks })
	}

	render() {
		return (
			<div class="container">
				<div class="row">
					<DragDropContext onDragEnd={this.onDragEnd}>
						<Droppable droppableId="delete">
							{(provided) => (
								<div class="col card" ref={provided.innerRef} {...provided.droppableProps}>
									<h4>Controls</h4>

									<input value={this.state.entry} type="text" name="input_text" onChange={event => this.setState({ entry: event.target.value })} />
									<button onClick={this.createTask}>Insert</button>
									<br />
									<span class="card">🚮 Drag here to delete.</span>
									<br />
									<a target="_blank" href="https://taimoorapps.com"><img src={Logo} class="img-fluid"></img></a>
									<br />
								</div>
							)}
						</Droppable>

						<Droppable droppableId="backlog">
							{(provided) => (
								<div class="col card" ref={provided.innerRef} {...provided.droppableProps}>
									<h4>Backlog</h4>

									{this.state.tasks[0].map((item, index) => (
										<Task id={item.id} text={item.text} index={index} />
									))}

									{provided.placeholder}
								</div>
							)}
						</Droppable>

						<Droppable droppableId="todo">
							{(provided) => (
								<div class="col card" ref={provided.innerRef} {...provided.droppableProps}>
									<h4>Ready</h4>

									{this.state.tasks[1].map((item, index) => (
										<Task id={item.id} text={item.text} index={index} />
									))}

									{provided.placeholder}
								</div>
							)}
						</Droppable>

						<Droppable droppableId="doing">
							{(provided) => (
								<div class="col card" ref={provided.innerRef} {...provided.droppableProps}>
									<h4>Doing</h4>

									{this.state.tasks[2].map((item, index) => (
										<Task id={item.id} text={item.text} index={index} />
									))}

									{provided.placeholder}
								</div>
							)}
						</Droppable>

						<Droppable droppableId="done">
							{(provided) => (
								<div class="col card" ref={provided.innerRef} {...provided.droppableProps}>
									<h4>Done!</h4>

									{this.state.tasks[3].map((item, index) => (
										<Task id={item.id} text={item.text} index={index} />
									))}

									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>
				</div>
				<div class="row">
					<div class="col">
					<span>Changes are saved live, in your browser. Created by Taimoor Ahmad 2019.</span>
					<br />
					<span>Read "The Lean Startup" to learn more: <a href="https://amzn.to/2B93aui" target="_blank">USA</a> or <a href="https://amzn.to/2nLnYF7" target="_blank">Canada</a></span>
					</div>
				</div>
			</div>
		)
	}
}

export default App;
