import React, { Component } from 'react';
import AltContainer from 'alt-container';
import LaneActions from '../actions/LaneActions';
import Notes from './Notes';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

class Lane extends Component {
  render() {
    const { lane, ...props } = this.props;

    return (
      <div { ...props }>
        <div className="lane-header">
          <div className="lane-add-note">
            <button onClick={this.addNote.bind(null, lane.id)}>+</button>
          </div>
          <div className="lane-name">{lane.name}</div>
        </div>
        <AltContainer 
          stores={[NoteStore]}
          inject={{ 
            notes: () => NoteStore.getNotesByIds(lane.notes)
          }}>
          <Notes onEdit={this.onEdit} onDelete={this.onDelete} />
        </AltContainer>
      </div>
    );    
  }  

  addNote = (e) => {
    const laneId = this.props.lane.id;
    const note = NoteActions.create({task: 'New task'});

    LaneActions.attachToLane({
      noteId: note.id,
      laneId
    });
  }

  onEdit = (id, task) => {
    if (!task.trim()) {
      return;
    }

    NoteActions.update({id,task});
  }

  onDelete = (noteId, e) => {
    e.preventDefault();

    const laneId = this.props.lane.id;

    LaneActions.detachFromLane({
      noteId,
      laneId
    });

    NoteActions.delete(noteId);
  }

}

export default Lane;