import { User } from '../typing/user';
import NotesPageLoggedInView from '../components/NotesPageLoggedInView';
import NotesPageLoggedOutView from '../components/NotesPageLoggedOutView';
type Props = {
  loggedInUser: User | null;
};

function NotesPage({ loggedInUser }: Props) {
  return (
    <div>
      {loggedInUser ? <NotesPageLoggedInView /> : <NotesPageLoggedOutView />}
    </div>
  );
}

export default NotesPage;
