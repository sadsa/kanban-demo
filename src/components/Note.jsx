import React, { Component } from 'react';

class Note extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editing: false
    }
  }
  checkEnter = (e) => {
    if (e.key === 'Enter') {
      this.saveNote(e);
    }
  }
  editNote = () => {
    this.setState({editing:true});
  }
  renderEdit = () => {
    return <input 
      ref={
        (e) => e ? e.selectionStart = this.props.task.length : null
      }
      type="text" 
      autoFocus={true} 
      onBlur={this.saveNote}
      defaultValue={this.props.task}
      onKeyPress={this.checkEnter}/>
  }
  renderNote = () => {
    return (
      <div onClick={this.editNote}>
        <span className="task">{this.props.task}</span>
        <button className="delete-note" onClick={this.props.onDelete}>x</button>
      </div>
    )
  }
  render() {
    if (this.state.editing) {
      return this.renderEdit();
    }

    return this.renderNote();
  }
  saveNote = (e) => {
    const value = e.target.value;

    if (this.props.onEdit) { 
      this.props.onEdit(value);
      // Exit edit mode.
      this.setState({ 
        editing: false
      }); 
    }    
  }
}

export default Note;