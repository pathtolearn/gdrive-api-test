import React from "react";

interface Props {}

const Footer = (props: Props) => {
  return (
    <div>
      <footer className="footer">
        <div className="container">
          <span className="text-muted">Place sticky footer content here.</span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
