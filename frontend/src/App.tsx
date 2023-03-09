import { useEffect, useState } from 'react';
import * as NotesApi from './network/notes_api';
import LoginModel from './components/LoginModel';
import Navbar from './components/navbar';
import SignUpModel from './components/SignUpModel';

import { User } from './typing/user';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import NotesPage from './pages/NotesPage';
import NotFoundPage from './pages/NotFoundPage';

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
    <BrowserRouter>
      <div className=" h-auto bg-gray-200 ">
        <Navbar
          loggedInUser={loggedInUser}
          onLoginClicked={() => setShowLoginModel(true)}
          onSignUpClicked={() => setShowSignUpModel(true)}
          onLogoutSuccessful={() => setLoggedInUser(null)}
        />
        <Routes>
          <Route path="/" element={<NotesPage loggedInUser={loggedInUser} />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>

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
    </BrowserRouter>
  );
}

export default App;
