function Navbar() {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <a>
          <h1 className="text-2xl text-blue-500 font-bold">Mern Auth</h1>
        </a>

        <div className="ml-auto">
          <ul className="text-xl text-white flex flex-row gap-4">
            <li>
              <a
                href="/login"
                className="border-white px-2 border-[2px] rounded-md"
              >
                Sign in
              </a>
            </li>
            <li>
              <a
                href="/register"
                className="border-white px-2 border-[2px] rounded-md"
              >
                Sign up
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
