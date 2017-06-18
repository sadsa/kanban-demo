import React, { Component } from 'react';

class Note extends Component {

  checkEnter = (e) => {
    if (e.key === 'Enter') {
      this.finishEdit(e);
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
      onBlur={this.finishEdit}
      defaultValue={this.props.task}
      onKeyPress={this.checkEnter}/>
  }

  renderNote = () => {
    return (
      <div>
        <span className="task" onClick={this.editNote}>{this.props.task}</span>
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

  finishEdit = (e) => {
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