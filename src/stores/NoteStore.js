import alt from '../libs/alt';
import uuid from 'uuid';
import NoteActions from '../actions/NoteActions';

class NoteStore {
  constructor() {
    this.bindActions(NoteActions);

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
  create(note) {
    const notes = this.state.notes;
    note.id = uuid.v4();
    
    this.setState({
      notes: notes.concat(note)
    });
  }
  update(updatedNote) {
    const notes = this.state.notes.map(note => {
      if (note.id === updatedNote.id) {
        note.task = updatedNote.task;
      }
      return note;
    });

    this.setState({notes});
  }
  delete(id) {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== id)
    });
  }    
}

export default alt.createStore(NoteStore, 'NoteStore');