import * as React from "react";

type props = {
 ByredoLogo: any;
  ByredoLinks: any;
};

const Header = (props: any) => {
  const {ByredoLogo, ByredoLinks } = props;
  return (
      <header className="site-header">
        <div className="container-lg">
          <div className="navbar">
            <div className="logo">
              <a href="#" className="">
                <img
                  src={ByredoLogo.image.url}
                  alt="Byredo Logo"
                  title="Byredo"
                />
              </a>
            </div>
            <div className="mid-nav">
              {ByredoLinks?.map((e: any) => {
                return (
                  <>
                    <div className="menu-item">
                      <a href={e.link} className="">
                        {e.label}
                      </a>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </header>
  );
};
export default Header;