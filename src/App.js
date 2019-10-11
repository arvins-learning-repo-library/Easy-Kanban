import React from 'react';
import logo from './logo.svg';
import './App.css';
import Task from './Task'

class App extends React.Component {

  state = {
    tasks: [
      {
        text: "Brush your teeth", 
      },
      {
        text: "Charge your phone", 
      },
      {
        text: "Clean the dishes",
      }
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
