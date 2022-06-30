
import React from 'react';
import DragDrop from './components/DragAndDrop/dragdrop.jsx';
import './App.css';


const UBUNGS = [
  {  specialWord: 'C', correctAns: '?' },
  {  specialWord: 'B', correctAns: '?' },
  {  specialWord: 'A', correctAns: '?' },
];

const QUESTION=' Question 3';


const PageData =[
  {variantResponse: 'Inside the driver or passenger door'},
  {variantResponse: 'Inside of the glove compartment'},
  {variantResponse: 'On the side of the fuel filler cap'},
  {variantResponse: 'On the engine'},
  {variantResponse: 'The vehicle handbook'},
  {variantResponse: 'On the tyres'},
  {variantResponse: 'Next to the steering wheel'},
]

function App() {
  return (
    <div className="App">
       <img className="image" src='/assets/intrebare.jpg' alt=''/>     
      <DragDrop ubungs={UBUNGS} question={QUESTION} />
    </div>
  );
}

export default App;
