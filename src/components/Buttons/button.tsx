
import React from 'react';
import './style.scss';

const VButton = ({pageData}:any) => {

   const capitalLetters=["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",]

    
  return (
    <div>
       {pageData.map((el,i) =>
        <button className="button"><div className="circle"><p className="paragraph">{capitalLetters[i]}</p> </div><p>{el.variantResponse}</p></button>
    )}
    </div>
   
  )
}

export default VButton;