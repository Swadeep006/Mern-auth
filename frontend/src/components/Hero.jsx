function Hero() {
  return (
    <>
      <div className="flex items-center flex-col border-2 border-gray-900 justify-center gap-4 p-4 bg-orange-50 mx-10 lg:mx-64 md:mx-48 sm:mx-28  mt-10 rounded-md">
        <div className="text-3xl text-blue-500 font-bold">
          <h1>Mern Authentication</h1>
        </div>
        <div>
          <p>
            {" "}
            This is a boilerplate for MERN authentication that stores a JWT in
            an HTTP-Only cookie. It also uses Redux Toolkit and Tailwind CSS
            library
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href="/login">
            <button className="font-bold border-[2px] bg-blue-500 text-white border-black rounded-md p-1 hover:bg-white hover:text-black">
              Sign in
            </button>
          </a>
          <a href="/register">
            <button className="font-bold border-[2px] bg-blue-500 text-white border-black rounded-md p-1 hover:bg-white hover:text-black">
              Sign up
            </button>
          </a>
        </div>
      </div>
    </>
  );
}

export default Hero;
