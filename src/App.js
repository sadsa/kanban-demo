import React, { Component } from 'react';
import AltContainer from 'alt-container';
import Lanes from './components/Lanes';
import LaneActions from './actions/LaneActions';
import LaneStore from './stores/LaneStore';
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
          <button className="add-lane" onClick={this.addLane}>+</button>
          <AltContainer 
            stores={[LaneStore]}
            inject={{
              lanes: () => LaneStore.getState().lanes
            }}>
            <Lanes />
          </AltContainer>
        </div>
      </div>
    );
  }

  addLane = () => {
    LaneActions.create({name:'New Lane', editing: true});
  }  

}

export default App;
