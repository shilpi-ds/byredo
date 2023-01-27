import * as React from "react";
import { useState } from "react";
import Hours from "../components/hours";

type TodayProps = {
  data: any;

};




const Today=({data}:TodayProps)=>{

  //Using Inline Function and the The Logical Not (!) to toggle state
  const [toggle, setToggle] = useState(false)

  return (
    <>
      <button 
            onClick={() => setToggle(!toggle)} 
            className="btn btn-primary mb-5">
          More Details
      </button>
      {toggle && (
        <div className="bg-gray-100 p-2">
        {data && <Hours title={"Restaurant Hours"} hours={data} />}
      </div>
      )}
    </>
  )



}

export default Today;


