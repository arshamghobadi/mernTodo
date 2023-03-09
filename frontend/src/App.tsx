import { useEffect, useState } from 'react';
import * as NotesApi from './network/notes_api';
import LoginModel from './components/LoginModel';
import Navbar from './components/navbar';
import SignUpModel from './components/SignUpModel';

import { User } from './typing/user';

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showSignUpModel, setShowSignUpModel] = useState(false);
  const [showLoginModel, setShowLoginModel] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NotesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  });

  return (
    <div className=" h-auto bg-gray-200 ">
      <Navbar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginModel(true)}
        onSignUpClicked={() => setShowSignUpModel(true)}
        onLogoutSuccessful={() => setLoggedInUser(null)}
      />

      {showSignUpModel && (
        <SignUpModel
          onDismiss={() => setShowSignUpModel(false)}
          onSignUpSuccessful={(user) => {
            setLoggedInUser(user);
            setShowSignUpModel(false);
          }}
        />
      )}
      {showLoginModel && (
        <LoginModel
          onDismiss={() => setShowLoginModel(false)}
          onSignUpSuccessful={(user) => {
            setLoggedInUser(user);
            setShowLoginModel(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
