import * as React from "react";
import Cta from "../components/cta";

type Link = {
  label: string;
  url: string;
};

const links: Link[] = [
  
  {
    label: "Perfume",
    url: "#",
  },
  {
    label: "Makeup",
    url: "#",
  },
  {
    label: "Home fragnance",
    url: "#",
  },
  {
    label: "Hand & body care",
    url: "#",
  },
  {
    label: "Byproduct",
    url: "#",
  },
];

const Header = () => {
  const linkDoms = links.map((link) => (
    <div key={link.label}>
      <a href={link.url} target="_blank" rel="noreferrer">
        {link.label}
      </a>
    </div>
  ));

  return (
    <div className="bg-gray-50">
      <div className="centered-container">
        <nav className="py-6 flex items-center justify-between">
          <div className="flex gap-x-4 items-center">
           <a href="/index.html"><img
              src="https://a.mktgcdn.com/p-sandbox/ppMPeR6Qb9BFAUGgQj_nwjvzlFH8E55fmGQWfZc2TOY/600x600.png"
              width="100"
              height="100"
            ></img></a>
            <div className="flex gap-x-4 text-sm font-semibold text-body">
              {linkDoms}
            </div>
          </div>
          <div className="space-x-5"></div>
          
        </nav>
      </div>
    </div>
  );
};

export default Header;
