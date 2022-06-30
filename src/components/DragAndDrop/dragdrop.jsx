import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { default as TouchBackend } from 'react-dnd-touch-backend';
import device from 'current-device';
import { toast } from 'react-hot-toast';

import classNames from 'classnames';
import update from 'immutability-helper';

import DragDiv from './dragdiv';
import DropDiv from './dropdiv';
import DragTouchDiv from './dragTouchDiv';


function DropDivs(props) {
  const ubungs = props.ubungs;
  const statusDrop = props.status.drop;
  const statusDrag = props.status.drag;
  const statusWrong = props.status.classes.dropDiv.wrong;

  const dropList = ubungs.map( (el, i) => (statusDrop[i].empty)
      ?
  
             <p className="centered"><DropDiv index={i} 
                                                  empty={statusDrop[i].empty} 
                                                  dragId={statusDrop[i].dragId}
                                                  wrong={statusWrong}
                                         /></p> 
      
      
      :   
            <p className="centered">
         <DropDiv index={i} empty={statusDrop[i].empty} dragId={statusDrop[i].dragId}> 
                       <DragDiv index={statusDrop[i].dragId} 
                                text={statusDrag[statusDrop[i].dragId].text} 
                                defaultPosition={statusDrag[statusDrop[i].dragId].defaultPosition}
                                currentPosition={i}
                                previousPosition={statusDrag[statusDrop[i].dragId].currentPosition}
                                moveDiv={props.moveDiv}
                                clNames={classNames(props.status.classes.dragDiv)}
                       /> 
                   </ DropDiv>
      </p>
        
      
      );
  
  return (
    <div className="verticalItems">
      {dropList}      
    </div>
  );
}

function DragDivs(props) {
  const status = props.status.drag;

    
  const dragList = status.map( (el, i) => (el.defaultPosition) 
      ?
      <DragDiv index={el.index}
               text={el.text}
               moveDiv={props.moveDiv}
               defaultPosition={el.defaultPosition}
               currentPosition={el.currentPosition}
               previousPosition={el.previousPosition}
               clNames={classNames(props.status.classes.dragDiv)}
      />  
      : 
      null
   );

  return (
    <div>
      {dragList}

      <div>
      <button className="ubutton" onClick={props.onClick}><p>Ok</p></button>
      {/* <button className="ubutton" onClick={props.onClickReset}>Reset</button> */}
      </div>
    </div>
      
    
  );

}

function DropTouchDivs(props) {
  const ubungs = props.ubungs;
  const statusDrop = props.status.drop;
  const statusDrag = props.status.drag;
  const statusWrong = props.status.classes.dropDiv.wrong;

  const dropList = ubungs.map( (el, i) => (statusDrop[i].empty)
      ?
      <p className="centered">{el.textB} <DropDiv index={i} 
                                                  empty={statusDrop[i].empty} 
                                                  dragId={statusDrop[i].dragId}
                                                  wrong={statusWrong}
                                         /> {el.textA}</p> 
      :    
      <p className="centered">
        {el.textB} <DropDiv index={i} empty={statusDrop[i].empty} dragId={statusDrop[i].dragId}> 
                       <DragTouchDiv index={statusDrop[i].dragId} 
                                     text={statusDrag[statusDrop[i].dragId].text} 
                                     defaultPosition={statusDrag[statusDrop[i].dragId].defaultPosition}
                                     currentPosition={i}
                                     previousPosition={statusDrag[statusDrop[i].dragId].currentPosition}
                                     moveDiv={props.moveDiv}
                                     clNames={classNames(props.status.classes.dragDiv)}
                       /> 
                   </ DropDiv> {el.textA}
      </p>
      );
  
  return (
    <div>
      {dropList}      
    </div>
  );
}

function DragTouchDivs(props) {
  const status = props.status.drag;

    
  const dragList = status.map( (el, i) => (el.defaultPosition) 
      ?
      <DragTouchDiv index={el.index}
               text={el.text}
               moveDiv={props.moveDiv}
               defaultPosition={el.defaultPosition}
               currentPosition={el.currentPosition}
               previousPosition={el.previousPosition}
               clNames={classNames(props.status.classes.dragDiv)}
      />  
      : 
      null
   );

  return (
    <div>
      {dragList}
      
      <div>
      <button className="ubutton" onClick={props.onClick}>Ok</button>
      <button className="ubutton" onClick={props.onClickReset}>Reset</button>
      </div>
    </div>
  );

}

class DragDrop extends Component {
  constructor(props) {
    super(props);
    this.moveDiv = this.moveDiv.bind(this);
    this.state = { classes: {
                              mainDiv: {animated: false, shake: false},
                              dropDiv: {wrong: false},
                              dragDiv: {animated: false, fadeIn: false, dragdiv: true}
                            }
                 };
    
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(e) {
    if (
         (this.state.drop.every( el => el.empty === false)) && 
         (this.state.drop.every( (el, i) => el.correctText === this.state.drag[el.dragId].text))
       ) {
      toast.success("Corect!");
    } else {
      const dragObj = [];
      const dropObj = [];

      toast.error("Incorect!");
      
      for (let i = 0; i < this.state.drag.length; i++) {
        dragObj.push({ index: this.state.drag[i].index,
                       text: this.state.drag[i].text,
                       defaultPosition: true,
                       currentPosition: 100,
                       previousPosition: 100});
        dropObj.push({ index: this.state.drop[i].index,
                       correctText: this.state.drop[i].correctText,
                       empty: true, 
                       dragId: 100 });
      }

      this.setState((prevState) => {
        this.setState(update (this.state, { drag: {$set: dragObj},
                                            drop: {$set: dropObj},
                                            classes: { 
                                                       mainDiv: {animated: {$set: true}, shake: {$set: true}},
                                                       dropDiv: {wrong: {$set: true}},
                                                       dragDiv: {animated: {$set: true}, fadeIn: {$set: true}}
                                                     }
                                          }
                             ) 
                     );
        return this.timer = setTimeout (_ => {
          this.setState(update (this.state, { classes: {
                                                         mainDiv: {animated: {$set: false}, shake: {$set: false}},
                                                         dropDiv: {wrong: {$set: false}},
                                                         dragDiv: {animated: {$set: false}, fadeIn: {$set: false}}
                                                       }
                                            }
                               )
                       );
        }, 1500);
      });

    }
    
  }

  handleClickReset(e) {
    const dragObj = [];
    const dropObj = [];
    
    for (let i = 0; i < this.state.drag.length; i++) {
      dragObj.push({ index: this.state.drag[i].index,
                     text: this.state.drag[i].text,
                     defaultPosition: true,
                     currentPosition: 100,
                     previousPosition: 100});
      dropObj.push({ index: this.state.drop[i].index,
                     correctText: this.state.drop[i].correctText,
                     empty: true, 
                     dragId: 100 });
    }

    this.setState((prevState) => {
      this.setState(update (this.state, { drag: {$set: dragObj},
                                          drop: {$set: dropObj},
                                          // classes: { 
                                          //            mainDiv: {animated: {$set: true}, shake: {$set: true}},
                                          //            dropDiv: {wrong: {$set: true}},
                                          //            dragDiv: {animated: {$set: true}, fadeIn: {$set: true}}
                                          //          }
                                        }
                           ) 
                   );
      return this.timer = setTimeout (_ => {
        this.setState(update (this.state, { classes: {
                                                       mainDiv: {animated: {$set: false}, shake: {$set: false}},
                                                       dropDiv: {wrong: {$set: false}},
                                                       dragDiv: {animated: {$set: false}, fadeIn: {$set: false}}
                                                     }
                                          }
                             )
                     );
      }, 1500);
    });

  }

  

  componentWillMount() {
    if (!this.state.drag) {
      let dragObj = [];
      let dropObj = [];
      let shuffleArr = this.props.ubungs.map(el => el.specialWord);
      shuffleArr = shuffle(shuffleArr);
      
      function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
      }
      
      this.props.ubungs.forEach(function (el, index) {
        dragObj.push( {
                        index: index,
                        text: shuffleArr[index], 
                        defaultPosition: true,
                        currentPosition: 100,
                        previousPosition: 100
                      }
        );
        dropObj.push( {
                        index: index,
                        correctText: el.specialWord,
                        empty: true,
                        dragId: 100,
                      }
        );
        
      })
      
      this.setState({ drag: dragObj,
                      drop: dropObj
                    });

    }
  }
  
  moveDiv(dragIndex, dragCurrPosition, dragPrevPosition, dropIndex, dropDragId) {
    const statusDrop = this.state.drop;
    const statusDrag = this.state.drag;
    
    if (statusDrop[dropIndex].empty && dragCurrPosition === 100) {
      this.setState( update(this.state, { drop: {[dropIndex]: { empty: { $set: false},
                                                                dragId: {$set: dragIndex}
                                                                       },
                                                },
                                          drag: {[dragIndex]: { defaultPosition: {$set: false},
                                                                currentPosition: {$set: dropIndex},
                                                                previousPosition: {$set: statusDrag[dragIndex].currentPosition}
                                                              }
                                                }
                                        }
                           )
      );
    } else if (statusDrop[dropIndex].empty && (dragCurrPosition !== 100)) {
      this.setState( update(this.state, { drop: {[dropIndex]:        { empty:  {$set: false},
                                                                       dragId: {$set: dragIndex}
                                                                     },
                                                 [dragPrevPosition]: { empty:  {$set: true},
                                                                       dragId: {$set: 100}
                                                                     },
                                                },
                                          drag: {[dragIndex]: { defaultPosition: {$set: false},
                                                                currentPosition: {$set: dropIndex},
                                                                previousPosition: {$set: statusDrag[dragIndex].currentPosition}
                                                              }
                                                }
                                        }
                           )
      );

      
    } else if (dragIndex !== dropDragId && dragCurrPosition !== 100) {
      this.setState( update(this.state, { drop: {[dropIndex]:        { empty:  {$set: false},
                                                                       dragId: {$set: dragIndex}
                                                                     },
                                                 [dragPrevPosition]: { empty:  {$set: false},
                                                                       dragId: {$set: dropDragId}
                                                                     },
                                                },
                                          drag: {[dragIndex]:  { defaultPosition: {$set: false},
                                                                 currentPosition: {$set: dropIndex},
                                                                 previousPosition: {$set: statusDrag[dragIndex].currentPosition}
                                                               },
                                                 [dropDragId]: { defaultPosition: {$set: false},
                                                                currentPosition: {$set: dragPrevPosition},
                                                                previousPosition: {$set: statusDrag[dragIndex].currentPosition}
                                                               }
                                                }
                                        }
                           )
      );
    } else if (dragIndex !== dropDragId  && dragCurrPosition === 100) {
      this.setState( update(this.state, { drop: {[dropIndex]:        { empty:  {$set: false},
                                                                       dragId: {$set: dragIndex}
                                                                     }
                                                },
                                          drag: {[dragIndex]:  { defaultPosition: {$set: false},
                                                                 currentPosition: {$set: dropIndex},
                                                                 previousPosition: {$set: statusDrag[dragIndex].currentPosition}
                                                               },
                                                 [dropDragId]: { defaultPosition: {$set: true},
                                                                currentPosition: {$set: 100},
                                                                previousPosition: {$set: statusDrag[dragIndex].currentPosition}
                                                               }
                                                }
                                        }
                           )
      );
    }
  }
  
  
  render() {    

    return (
      <div>
        <p className="ds_h1">{this.props.question}</p>
        <div className={classNames(this.state.classes.mainDiv)}>
          {(device.type === 'desktop') ? (
            <DropDivs ubungs={this.props.ubungs} 
                    status={this.state}
                    moveDiv={this.moveDiv} 
                    onClick={(e) => this.handleClick(e)}
                    onClickReset={(e)=>this.handleClickReset(e)}
            />
          ) : (
            <DropTouchDivs ubungs={this.props.ubungs} 
                    status={this.state}
                    moveDiv={this.moveDiv} 
                    onClick={(e) => this.handleClick(e)}
                    onClickReset={(e)=>this.handleClickReset(e)}
            />
          )}
        </div>
        <div>
          {(device.type === 'desktop') ? (
            <DragDivs ubungs={this.props.ubungs} 
                    status={this.state}
                    moveDiv={this.moveDiv} 
                    onClick={(e) => this.handleClick(e)}
                    onClickReset={(e)=>this.handleClickReset(e)}
            />
          ) : (
            <DragTouchDivs ubungs={this.props.ubungs} 
                    status={this.state}
                    moveDiv={this.moveDiv} 
                    onClick={(e) => this.handleClick(e)}
                    onClickReset={(e)=>this.handleClickReset(e)}
            />
          )}
        </div>
      </div>
    );
  }
}

export default DragDropContext( (device.type === 'desktop') ? HTML5Backend : TouchBackend )(DragDrop);