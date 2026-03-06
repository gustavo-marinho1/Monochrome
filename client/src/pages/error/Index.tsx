import { Link } from "react-router-dom";

function Error() {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl">
          This page doesn't exist
        </h1>
        <Link to="/" className="underline font-semibold">
          Home
        </Link>
      </div>

    </main>
  )
}

export default Error;