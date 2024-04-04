import React from "react";
import Image from "next/image";

function Jiralogo() {
  return (
    <Image
      src="/assets/jira-logo.svg"
      alt="Project Icon"
      width={150}
      height={170}
    />
  );
}

export default Jiralogo;
