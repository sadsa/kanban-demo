import alt from '../libs/alt';
import uuid from 'uuid';
import LaneActions from '../actions/LaneActions';

class LaneStore {

  constructor() {
    this.bindActions(LaneActions);

    this.state = {
      lanes: []
    };
  }

  create(lane) {
    const lanes = this.state.lanes;
    lane.id = uuid.v4();
    lane.notes = [];
    
    this.setState({
      lanes: lanes.concat(lane)
    });
  }

  update(updatedLane) {
    const lanes = this.state.lanes.map(lane => {
      if(lane.id === updatedLane.id) {
        return Object.assign({}, lane, updatedLane);
      }

      return lane;
    });

    this.setState({lanes});
  }

  delete(id) {
    this.setState({
      lanes: this.state.lanes.filter(lane => lane.id !== id)
    });
  }  

  attachToLane({ noteId, laneId }) {
    const lanes = this.state.lanes.map(lane => {
      if(lane.id === laneId) {
        if(lane.notes.includes(noteId)) {
          console.log('Note is already attached to Lane', lanes);
        } else {
          lane.notes.push(noteId);
        }
      }
      return lane;
    });

    this.setState({lanes});
  }

  detachFromLane({ noteId, laneId }) {
    const lanes = this.state.lanes.map(lane => {
      if(lane.id === laneId) {
        lane.notes = lane.notes.filter(note => note !== noteId);
      }
      return lane;
    });    

    this.setState({lanes});
  }

}

export default alt.createStore(LaneStore, 'LaneStore');