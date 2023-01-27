import * as React from "react";
import Cta from "./cta";


type Banner = {
  title?: string;
  description?: string;
himage?:any;
  
};



const HeaderBanner = (props: Banner) => {
  const { title, description ,himage} = props;

  return (
    <>
      <div
        className={`relative z-10 w-full bg-cover bg-center h-96 bg-[url(/src/assets/images/tacos-1.avif)] `}
      >
         <div style={{position:"relative"}}>
          <img src={himage}/>
       
        <div style={{position:"absolute"}}>
        <div style={{color:'#fff'}}>
          {title}
        </div>
        <div style={{color:'#fff'}}>
          {description}
        </div>
       </div> </div>
      </div>
    </>
  );
};

export default HeaderBanner;
