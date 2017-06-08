import React, { Component } from 'react';
import AltContainer from 'alt-container';
import Notes from './components/Notes';
import NoteActions from './actions/NoteActions';
import NoteStore from './stores/NoteStore';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Kanban Demo</h2>
        </div>
        <div className="App-intro">
          <button className="add-note" onClick={this.addNote}>Add Note +</button>
          <AltContainer 
            stores={[NoteStore]}
            inject={{ 
              notes: () => NoteStore.getState().notes
            }}>
            <Notes onEdit={this.onEdit} onDelete={this.onDelete}/>
          </AltContainer>
        </div>
      </div>
    );
  }

  addNote = () => {
    NoteActions.create({task:'New Task'});
  }

  onEdit = (id, task) => {
    if (!task.trim()) {
      return;
    }

    NoteActions.update({id,task});
  }

  onDelete = (id, e) => {
    e.preventDefault();
    NoteActions.delete(id);
  }

}

export default App;
