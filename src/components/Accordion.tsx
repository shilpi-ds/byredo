import * as React from "react";
import { useState } from 'react';

const Accordion = ({content }) => {
  const [toggle, setToggle] = useState(null);

  let handleToggle=(id)=>{
    if(toggle===id){
        setToggle(null);
        return false
    }
   setToggle(id)
   
}
  return (

    content.map((item:any,index) => {
        console.log(index);
         return(
          <>
      

    <div className="card" key={index}>
    <div className="card-header" onClick={()=>handleToggle(index)} style={{cursor:"pointer"}}>
     <b>{(index===toggle)?'-':'+'}{item.question}</b></div>
                        {(index===toggle)?<div className="card-body">{item.answer}</div>:''}
                     
                    </div>
          </>
         );
       })
    
  
  );
};

export default Accordion;