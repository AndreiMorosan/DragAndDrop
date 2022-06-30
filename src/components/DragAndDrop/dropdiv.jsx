import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

const BOX = 'box';

const dropdivTarget = {
  drop(props, monitor, component) {
    return { index: props.index,
             empty: props.empty,
             dragId: props.dragId
           };
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class DropDiv extends Component {
  render() {
    const { connectDropTarget, isOver } = this.props;
    return connectDropTarget(
     
          <div className="dropdiv" style={{
                                       minWidth: this.props.empty ? "110px" : "0",
                                       minHeight: this.props.empty ? "68px" : "0",
                                       backgroundColor: this.props.wrong ? "rgba(254,229,229,1)" : "white"
                                     }}>
        {this.props.children}
      </div>
     
    );
  }
}

export default DropTarget(BOX, dropdivTarget, collect)(DropDiv);