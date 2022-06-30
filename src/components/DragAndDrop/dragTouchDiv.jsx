import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import DragPreview from './DragPreview';

const BOX = 'box';

const dragdivSource = {
  beginDrag(props) {
    return { index: props.index,
             defaultPosition: props.defaultPosition,
             currentPosition: props.currentPosition,
             previousPosition: props.previousPosition
           };
  },
  
  endDrag(props, monitor, component) {
    const dragResult = monitor.getItem();
    const dropResult = monitor.getDropResult();
    const didDrop = monitor.didDrop();
    
    if (didDrop) {
      props.moveDiv(dragResult.index,
                    dragResult.currentPosition,
                    dragResult.previousPosition,
                    dropResult.index,
                    dropResult.dragId
                   );
    }
  }
  
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

class DragTouchDiv extends Component {  
  render() {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div className={this.props.clNames} style={{ opacity: isDragging ? 0.5 : 1,
                                                   margin: this.props.defaultPosition ? 20 : 0,
                                                   boxShadow: this.props.defaultPosition ? "0 5px 7px 0 rgba(0, 0, 0, 0.3)" : "0 0 0 0", 
                                                }}>
        <DragPreview text={this.props.text} {...this.props} />

          
            <p>{this.props.text}</p>

      </div> 
    );
  }
}

export default DragSource(BOX, dragdivSource, collect)(DragTouchDiv);