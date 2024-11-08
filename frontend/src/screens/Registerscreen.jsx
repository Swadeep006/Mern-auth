import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice.js";
import { toast } from "react-toastify";

const Registerscreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
      <form onSubmit={submitHandler} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2 text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 text-sm font-medium">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-2 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirmpassword" className="mb-2 text-sm font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            id="password"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {isLoading && <h2>loading...</h2>}

        <button
          type="submit"
          className="w-full mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          Sign Up
        </button>
      </form>
      <div className="py-3 text-center">
        <span>
          Already Have An Account?{" "}
          <a href="/login" className="text-blue-500 text-sm">
            Login
          </a>
        </span>
      </div>
    </FormContainer>
  );
};

export default Registerscreen;
