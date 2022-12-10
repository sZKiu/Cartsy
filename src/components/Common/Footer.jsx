import React from "react";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

const Footer = () => {
  return (
    <footer>
      <div>
        Cartsy Medicine - All right reserved - Design & Developer by sZKiu, Inc
      </div>

      <div>
        <a href="https://www.linkedin.com/in/augusto-andres-mendez-55688b220/">
          <AiFillGithub />
        </a>

        <a href="https://github.com/sZKiu">
          <AiFillLinkedin />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
