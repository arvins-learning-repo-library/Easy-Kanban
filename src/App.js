import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Task from './Task';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const BACKLOG = 0;
const TODO = 1;
const DOING = 2;
const DONE = 3;

class App extends React.Component {

	/* 
	A tab of n means:
	0 -> backlog
	1 -> TODO
	2 -> Doing
	3 -> Done!
	*/
	state = {
		entry: "",
		tasks: [
			{
				text: "Brush your teeth",
				tab: BACKLOG,
			},
			{
				text: "Charge your phone",
				tab: BACKLOG,
			},
			{
				text: "Clean the dishes",
				tab: BACKLOG,
			},

			{
				text: "Make a review of the Scrimba Course",
				tab: TODO,
			},

			{
				text: "Learn React",
				tab: DOING,
			},
			{
				text: "Become job ready",
				tab: DOING,
			},

			{
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
										<span style={{ display: task.tab === BACKLOG ? "block" : "none" }}><Task text={task.text} index={index} /></span>
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
										<span style={{ display: task.tab === TODO ? "block" : "none" }}><Task text={task.text} index={index} /></span>
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
										<span style={{ display: task.tab === DOING ? "block" : "none" }}><Task text={task.text} index={index} /></span>
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
										<span style={{ display: task.tab === DONE ? "block" : "none" }}><Task text={task.text} index={index} /></span>
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
