import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Task from './Task';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const BACKLOG = 0;
const TODO = 1;
const DOING = 2;
const DONE = 3;

function getRandomId() {
    let min = Math.ceil(1);
    let max = Math.floor(Number.MAX_SAFE_INTEGER);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class App extends React.Component {

	state = {
		entry: "",
		tasks: [
			// Test data!
			{
				id: getRandomId(),
				text: "Brush your teeth",
				tab: BACKLOG,
			},
			{
				id: getRandomId(),
				text: "Charge your phone",
				tab: BACKLOG,
			},
			{
				id: getRandomId(),
				text: "Clean the dishes",
				tab: BACKLOG,
			},
			{
				id: getRandomId(),
				text: "Make a review of the Scrimba Course",
				tab: TODO,
			},
			{
				id: getRandomId(),
				text: "Learn React",
				tab: DOING,
			},
			{
				id: getRandomId(),
				text: "Become job ready",
				tab: DOING,
			},

			{
				id: getRandomId(),
				text: "Write a resume",
				tab: DONE,
			}
		]
	}

	constructor() {
		super()

		this.createTask = this.createTask.bind(this)
	}

	createTask() {
		console.log(this.state.entry)

		if (this.state.entry.trim() !== "") {

			this.setState(prevState => ({
				tasks: [...prevState.tasks, {
					id: getRandomId(),
					text: this.state.entry.trim(),
					tab: BACKLOG
				}]
			}))
		}

		this.setState(prevState => ({
			entry: ""
		}))
	}

	onDragEnd = result => {

	}

	render() {
		return (
			<div class="container">
				<div class="row">
					<DragDropContext onDragEnd={this.onDragEnd}>
						<Droppable droppableId="backlogDroppable">
							{(provided) => (
								<div class="col" ref={provided.innerRef} {...provided.droppableProps}>
									<h1>💭 Backlog</h1>

									{this.state.tasks.map((task, index) => (
										<span style={{ display: task.tab === BACKLOG ? "block" : "none" }}><Task task={task} index={index} /></span>
									))}

									{provided.placeholder}

									<div>
										<input value={this.state.entry} type="text" name="input_text" onChange={event => this.setState({ entry: event.target.value })} />
										<button onClick={this.createTask}>Insert</button>
									</div>
								</div>
							)}
						</Droppable>
						<Droppable droppableId="todoDroppable">
							{(provided) => (
								<div class="col" ref={provided.innerRef} {...provided.droppableProps}>
									<h1>👨‍🏭 TODO</h1>

									{this.state.tasks.map((task, index) => (
										<span style={{ display: task.tab === TODO ? "block" : "none" }}><Task task={task} index={index} /></span>
									))}

									{provided.placeholder}
								</div>
							)}
						</Droppable>
						<Droppable droppableId="doingDroppable">
							{(provided) => (
								<div class="col" ref={provided.innerRef} {...provided.droppableProps}>
									<h1>💪 Crushing</h1>

									{this.state.tasks.map((task, index) => (
										<span style={{ display: task.tab === DOING ? "block" : "none" }}><Task task={task} index={index} /></span>
									))}

									{provided.placeholder}
								</div>
							)}
						</Droppable>
						<Droppable droppableId="doneDroppable">
							{(provided) => (
								<div class="col" ref={provided.innerRef} {...provided.droppableProps}>
									<h1>🙌 Crushed</h1>

									{this.state.tasks.map((task, index) => (
										<span style={{ display: task.tab === DONE ? "block" : "none" }}><Task task={task} index={index} /></span>
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
