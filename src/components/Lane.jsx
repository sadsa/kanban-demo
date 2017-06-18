import React, { Component } from 'react';
import AltContainer from 'alt-container';
import LaneActions from '../actions/LaneActions';
import Editable from './Editable';
import Notes from './Notes';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

class Lane extends Component {

  render() {
    const { lane, ...props } = this.props;

    return (
      <div { ...props }>
        <div className="lane-header" onClick={this.activateLaneEdit}>
          <div className="lane-add-note">
            <button onClick={this.addNote}>+</button>
          </div>
          <Editable 
            className="lane-name" 
            value={lane.name}
            editing={lane.editing}
            onEdit={this.editName}
            onValueClick={this.activateLaneEdit} />
          <div className="lane-delete">
            <button onClick={this.deleteLane}>x</button>
          </div>            
        </div>
        <AltContainer 
          stores={[NoteStore]}
          inject={{ 
            notes: () => NoteStore.getNotesByIds(lane.notes)
          }}>
          <Notes 
            onEdit={this.onEdit} 
            onDelete={this.onDelete} 
            onValueClick={this.activateNoteEdit} />
        </AltContainer>
      </div>
    );    
  }  

  activateLaneEdit = () => {
    const laneId = this.props.lane.id;

    LaneActions.update({ id: laneId, editing: true });
  }

  activateNoteEdit = (id) => {
    NoteActions.update({ id, editing: true });
  }

  addNote = (e) => {
    e.stopPropagation();

    const laneId = this.props.lane.id;
    const note = NoteActions.create({
      task: 'New task',
      editing: true
    });

    LaneActions.attachToLane({
      noteId: note.id,
      laneId
    });
  }
  
  deleteLane = (e) => {
    e.stopPropagation();

    const laneId = this.props.lane.id;
    const laneNotes = this.props.lane.notes;

    NoteActions.deleteNotesByIds(laneNotes);
    LaneActions.delete(laneId);
  }

  editName = (name) => {
    const laneId = this.props.lane.id;

    if (!name.trim()) {
      LaneActions.update({ id: laneId, editing: false });
      return;
    }

    LaneActions.update({ name, id: laneId, editing: false });
  }

  onEdit = (id, task) => {
    if (!task.trim()) {
      return;
    }

    NoteActions.update({ id, task, editing: false});
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