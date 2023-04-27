import { useState } from "react";
import SignUpForm from "./SignUpForm";

const SignUpPage = () => {
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  // button sets showSignUpForm state to true so it affects conditional rendering below
  const button = (
    <button onClick={() => setShowSignUpForm(true)}>Sign Up</button>
  );
  const noAccount = <div>Don't have an account? {button}</div>;

  return (
    <div>
      {/* conditional rendering of text & button depending on whether or not a user is signed up */}
      {noAccount}
      {/* conditional rendering of sign up form to appear when a user clicks the button */}
      {showSignUpForm ? (
        <SignUpForm setShowSignUpForm={setShowSignUpForm} />
      ) : null}
    </div>
  );
};

export default SignUpPage;
