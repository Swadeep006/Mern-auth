const FormContainer = ({ children }) => {
    return (
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-5">
          {children}
        </div>
      </div>
    );
  };
  
  export default FormContainer;
  