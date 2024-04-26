import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center h-dvh w-full flex flex-col justify-center items-center">
      <div className="text-9xl text-blue-600 font-extrabold mb-5">404</div>
      <div className="text-3xl">There Was a Problem</div>
      <p>We Could not find requested resource</p>
      <span>
        Go back to the
        <Link href="/" className="text-blue-600 hover:bg-gray-100 rounded underline-offset-2">
          {" "}
          Projects
        </Link>
      </span>
    </div>
  );
}
