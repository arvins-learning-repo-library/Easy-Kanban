import React from 'react';
import logo from './logo.svg';
import './App.css';
import Task from './Task'

class App extends React.Component {

  state = {
    tasks: ["Brush your teeth", "Charge your phone", "Clean the dishes"]
  }

  render() {
    return <div>      
      <div>
        {this.state.tasks.map((text) => (
            <Task text={text} />
        ))}

        <input type="text" name="input_text" />
        <button>Insert</button>
      </div>
    </div>
  }
}

export default App;
