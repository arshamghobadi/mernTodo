import { User } from '../../typing/user';
import * as NotesApi from '../../network/notes_api';
type Props = {
  user: User;
  onLogoutSuccessful: () => void;
};

function NavbarLoggedInView({ user, onLogoutSuccessful }: Props) {
  async function logout() {
    try {
      await NotesApi.logout();
      onLogoutSuccessful();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
  return (
    <>
      <div>signed in as: {user.username}</div>
      <button onClick={logout}>Logout</button>
    </>
  );
}

export default NavbarLoggedInView;
