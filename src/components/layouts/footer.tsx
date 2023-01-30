import * as React from "react";


var currentTime = new Date()
var year = currentTime.getFullYear()

type props = {
   ByredoHelp: any;
   ByredoServices: any;
   ByredoLocator: any;
  };
  

  const Footer = (props: any) => {
   const {ByredoHelp, ByredoServices,ByredoLocator } = props;
console.log(ByredoLocator);
   return (
      <>
         <footer className="footer">
            <div className="container">
               
               <div className="footer_links">
                  <div className="column">
                       <div className="social-media">
                        <a href="#" target="_blank" title="Facebook" rel="noreferrer"><i className="fa fa-facebook-square" aria-hidden="true"></i></a>
                        <a href="#" target="_blank" title="Instagram" rel="noreferrer"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                        <a href="#" target="_blank" title="Twitter" rel="noreferrer"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                     </div>
                  </div>
                  <div className="column">

               
                     <h5>{ByredoHelp.helpTitle}</h5>
                     <ul>
                     {ByredoHelp.helpLinks?.map((e: any) => {
                    return (
                      <>
                        <div className="menu-item">
                          <li><a href={e.link} className="">
                            {e.label}
                          </a></li>
                        </div>
                      </>
                    );
                  })}
                  </ul>
                  </div>
                  <div className="column">
                     <h5>{ByredoServices.servicesTitle}</h5>
                     <ul>
                     {ByredoServices.servicesList?.map((e: any) => {
                    return (
                      <>
                        <div className="menu-item">
                          <li>
                            {e}
                          </li>
                        </div>
                      </>
                    );
                  })}
                  </ul>
                  </div>
                  <div className="column">
                  <h5>{ByredoLocator.helpTitle}</h5>
                     <ul>
                     {ByredoLocator.helpLinks?.map((e: any) => {
                    return (
                      <>
                        <div className="menu-item">
                          <li><a href={e.link} className="">
                            {e.label}
                          </a></li>
                        </div>
                      </>
                    );
                  })}
                  </ul>
                  </div>
                  
                 
               </div>
            </div>




         </footer>
      </>
   );
};

export default Footer;
