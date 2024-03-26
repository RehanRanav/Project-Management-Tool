import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="flex p-4">
      <div>
        <Image 
        src="/logo-image.png" 
        alt="Logo of Jira software" 
        width={135}
        height={24}/>
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default Header;
