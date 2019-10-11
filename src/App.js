import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Task from './Task'
import {DragDropContext} from 'react-beautiful-dnd'

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
        tab: 0,
      },
      {
        text: "Charge your phone", 
        tab: 0,
      },
      {
        text: "Clean the dishes",
        tab: 0,
      },

      {
        text: "Make a review of the Scrimba Course",
        tab: 1,
      },

      {
        text: "Learn React",
        tab: 2,
      },
      {
        text: "Become job ready",
        tab: 2,
      },

      {
        text: "Write a resume",
        tab: 3,
      }
    ]
  }

  constructor() {
    super()

    this.createTask = this.createTask.bind(this)
    this.renderColumn = this.renderColumn.bind(this)
  }

  createTask() {
    console.log(this.state.entry)

    if (this.state.entry.trim() !== "") {

      this.setState(prevState => ({
        tasks: [...prevState.tasks, {
          text: this.state.entry.trim(),
          tab: 0
        }]
      }))
    }

    this.setState(prevState => ({
      entry: ""
    }))
  }

  renderColumn(col) {
    return <div>
      {
        this.state.tasks.map((task) => (
          <span style={{display: task.tab === col ? "block" : "none"}}><Task text={task.text} /></span>
        ))
      }
    </div>
  }

  onDragEnd = result => {
    
  }

  render() {
    return <div>
      <DragDropContext onDragEnd={this.onDragEnd}>
      <div class="container">
        <div class="row">
            <div class="col">
              <h1>Backlog</h1>
              {this.renderColumn(0)}
              <div>
                <input value={this.state.entry} type="text" name="input_text" onChange={event => this.setState({entry: event.target.value})} />
                <button onClick={this.createTask}>Insert</button>
              </div>
            </div>
            <div class="col">
              <h1>TODO</h1>
              {this.renderColumn(1)}
            </div>
            <div class="col">
              <h1>In progress</h1>
              {this.renderColumn(2)}
            </div>
            <div class="col">
              <h1>Done!</h1>
                {this.renderColumn(3)}
            </div>
        </div>
    </div>
    </DragDropContext>
    </div>
  }
}

export default App;
