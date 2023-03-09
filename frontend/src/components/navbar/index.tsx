import { User } from '../../typing/user';
import NavbarLoggedInView from './NavbarLoggedInView';
import NavbarLoggedOutView from './NavbarLoggedOutView';

type Props = {
  loggedInUser: User | null;
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
  onLogoutSuccessful: () => void;
};

function Navbar({
  loggedInUser,
  onLoginClicked,
  onSignUpClicked,
  onLogoutSuccessful,
}: Props) {
  return (
    <nav className="flex justify-between">
      <div>brand</div>
      <div className=" space-x-3">
        {loggedInUser ? (
          <NavbarLoggedInView
            user={loggedInUser}
            onLogoutSuccessful={onLogoutSuccessful}
          />
        ) : (
          <NavbarLoggedOutView
            onLoginClicked={onLoginClicked}
            onSignUpClicked={onSignUpClicked}
          />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
