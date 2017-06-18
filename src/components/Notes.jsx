import React from 'react';
import Editable from './Editable';


function Notes({ notes, editing, onEdit, onDelete, onValueClick, ...props }) {

    const notesList = notes.map(note =>
      <li className="note" key={note.id}>
        <Editable 
          editing={note.editing}
          value={note.task} 
          onEdit={onEdit.bind(null, note.id)} 
          onDelete={onDelete.bind(null, note.id)}
          onValueClick={onValueClick.bind(null, note.id)}/>
      </li>
    );

    return (
      <div>
        <ul className="notes">
          {notesList}
        </ul>
      </div>
    )

}

export default Notes;
