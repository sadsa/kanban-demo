import React, { Component } from 'react';
import uuid from 'uuid';
import Notes from './components/Notes';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      notes: [
        {
          id: '4e81fc6e-bfb6-419b-93e5-0242fb6f3f6a',
          task: 'Learn React'
        },
        {
          id: '11bbffc8-5891-4b45-b9ea-5c99aadf870f',
          task: 'Do laundry'
        }
      ]
    };
  }  

  render() {
    const {notes} = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Kanban Demo</h2>
        </div>
        <div className="App-intro">
          <button className="add-note" onClick={this.addNote}>Add Note +</button>
          <Notes notes={notes} onEdit={this.onEdit} onDelete={this.onDelete}/>
        </div>
      </div>
    );
  }

  addNote = () => {
    this.setState({
      notes: this.state.notes.concat([
        {
          id: uuid.v4(),
          //id: Math.random() * 999,
          task: 'New Note'
        }
      ])
    });
  }

  onEdit = (id, task) => {
    if (!task.trim()) {
      return;
    }

    const notes = this.state.notes.map(note => {
      if (note.id === id) {
        note.task = task;
      }
      return note;
    });

    this.setState({notes});
  }

  onDelete = (id, e) => {
    e.preventDefault();

    this.setState({
      notes: this.state.notes.filter(note => note.id !== id)
    });
  }

}

export default App;
