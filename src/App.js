import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Task from './Task'

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
    ]
  }

  constructor() {
    super()

    this.createTask = this.createTask.bind(this)
  }

  createTask() {
    console.log(this.state.entry)

    this.setState(prevState => ({
      tasks: [...prevState.tasks, {
        text: this.state.entry,
        tab: 0
      }]
    }))

    this.setState(prevState => ({
      entry: ""
    }))
  }

  render() {
    return <div>      
      <div>
        {this.state.tasks.map((task) => (
            <Task text={task.text} />
        ))}

        <input value={this.state.entry} type="text" name="input_text" onChange={event => this.setState({entry: event.target.value})} />
        <button onClick={this.createTask}>Insert</button>
      </div>
    </div>
  }
}

export default App;
