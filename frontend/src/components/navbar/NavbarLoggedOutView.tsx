type Props = {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
};

function NavbarLoggedOutView({ onLoginClicked, onSignUpClicked }: Props) {
  return (
    <>
      <button onClick={onSignUpClicked}>signUp</button>
      <button onClick={onLoginClicked}>Login</button>
    </>
  );
}

export default NavbarLoggedOutView;
