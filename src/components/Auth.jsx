import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (auth.currentUser) {
    console.log(auth.currentUser.email);
    console.log(auth.currentUser.uid);
  } else {
    console.log("User email not there");
  }

  const handleSignIn = async (event) => {
    event.preventDefault();
    console.log("Signing In user");
    await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed In");
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={(e) => handleSignIn(e)}>Submit</button>
      </form>

      <div>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>

      <div>
        <button onClick={signInWithGoogle}>Sign in with google</button>
      </div>
    </div>
  );
};

export default Auth;
