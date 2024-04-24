import React from "react";
import Image from "next/image";
import Link from "next/link";

function Jiralogo() {
  return (
    <Link href="/projects">
      <Image
        src="/assets/jira-logo.svg"
        alt="Project Icon"
        width={150}
        height={170}
        className="w-40 h-auto"
        priority
      />
    </Link>
  );
}

export default Jiralogo;
