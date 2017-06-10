import React, { Component } from 'react';
import Lane from './Lane';

class Lanes extends Component {
  render() {
    const { lanes } = this.props;
    const lanesList = lanes.map(lane => 
      <Lane className="lane" key={lane.id} lane={lane} />
    );

    return (
      <div className="lanes">
          {lanesList}
      </div>
    );
  }
}

export default Lanes;
