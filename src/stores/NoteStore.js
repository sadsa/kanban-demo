import alt from '../libs/alt';
import uuid from 'uuid';
import NoteActions from '../actions/NoteActions';

class NoteStore {

  constructor() {
    this.bindActions(NoteActions);

    this.state = {
      notes: []
    };

    this.exportPublicMethods({
      getNotesByIds: this.getNotesByIds.bind(this)
    });
  }

  create(note) {
    const notes = this.state.notes;
    note.id = uuid.v4();
    
    this.setState({
      notes: notes.concat(note)
    });

    return note;
  }

  // Accepts an array of ids and returns a list of 
  // note objects that match the ids
  getNotesByIds(ids = []) {
    return ids.map(id => {
      return this.state.notes.find(note => note.id === id);
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