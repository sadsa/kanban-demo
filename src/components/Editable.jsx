import React, { Component } from 'react';

class Editable extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { editing, onEdit, onDelete, onValueClick, ...props } = this.props;

    return (
      <div {...props}>
        { editing ? this.renderEdit() : this.renderValue() }
      </div>
    )
  }

  checkEnter = (e) => {
    if (e.key === 'Enter') {
      this.finishEdit(e);
    }
  }

  renderDelete = () => {
    return (
      <button className="delete" onClick={this.props.onDelete}>x</button>
    )
  }

  renderEdit = () => {
    return <input 
      ref={
        (e) => e ? e.selectionStart = this.props.value.length : null
      }
      type="text" 
      autoFocus={true} 
      onBlur={this.finishEdit}
      defaultValue={this.props.value}
      onKeyPress={this.checkEnter}/>
  }

  renderValue = () => {
    return (
      <div>
        <span className="value" onClick={this.props.onValueClick}>{this.props.value}</span>
        { this.props.onDelete ? this.renderDelete() : null }
      </div>
    )
  }

  finishEdit = (e) => {
    const value = e.target.value;

    if (this.props.onEdit) { 
      this.props.onEdit(value); 
    }    
  }

}

export default Editable;