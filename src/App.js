import React from 'react';
import logo from './logo.svg';
import './App.css';
import Task from './Task'

class App extends React.Component {
  render() {
    return <div>
      <Task text="Brush your teeth" />
      <Task text="Charge your phone" />
      <Task text="Clean the dishes" />
    </div>
  }
}

export default App;
