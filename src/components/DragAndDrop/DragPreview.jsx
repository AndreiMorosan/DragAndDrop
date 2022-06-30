import React, { Component } from 'react';
import { DragLayer } from 'react-dnd';
import { } from './style.css';

function collect (monitor) {
    return {
        sourceOffset: monitor.getSourceClientOffset()
    };
}

class DragPreview extends Component {
    getLayerStyles() {
        const { sourceOffset } = this.props;

        return {
            transform: sourceOffset ? `translate(${sourceOffset.x}px, ${sourceOffset.y}px)` : ''
        };
    }

    render () {
        const { isDragging } = this.props;
        if (!isDragging) { return null; };

        return (
            <div className="drag-preview" style={this.getLayerStyles()}>
                <p>{this.props.text}</p>
            </div>
        );
    }
}

export default DragLayer(collect)(DragPreview);