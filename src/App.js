import React from 'react';
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

  render() {
    return <div>      
      <div>
        {this.state.tasks.map((task) => (
            <Task text={task.text} />
        ))}

        <input type="text" name="input_text" />
        <button>Insert</button>
      </div>
    </div>
  }
}

export default App;
