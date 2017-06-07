import React, { Component } from 'react';
import Note from './Note';


class Notes extends Component {
  render() {
    const notesList = this.props.notes.map(note => 
      <li className="note" key={note.id}>
        <Note task={note.task} 
          onEdit={this.props.onEdit.bind(null, note.id)} 
          onDelete={this.props.onDelete.bind(null, note.id)}/>
      </li>
    );

    return (
      <div>
        <ul className="notes">
            {notesList}
        </ul>
      </div>
    );
  }
}

export default Notes;
