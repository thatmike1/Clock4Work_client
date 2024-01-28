import MonthDropdown from './MonthDropdown';
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Header = ({
  selectedMonth,
  setSelectedMonth,
  MONTHS,
  auth,
  username,
  photoURL,
  login,
  signup,
}) => {
  async function handleSignOut() {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  }

  const navigate = useNavigate();

  if (signup) {
    return (
      <div className="p-1">
        <div className="rounded-lg border p-3 bg-muted/20 flex justify-end items-center">
          <Button onClick={() => navigate('/login')} variant="outline">
            Přihlásit se
          </Button>
        </div>
      </div>
    );
  } else if (login) {
    return (
      <div className="p-1">
        <div className="rounded-lg border p-3 bg-muted/20 flex justify-end items-center">
          <Button onClick={() => navigate('/signup')} variant="outline">
            Registrovat se
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-1">
      <div className="rounded-lg border p-3 bg-muted/20  flex justify-between items-center">
        <MonthDropdown
          setSelectedMonth={setSelectedMonth}
          selectedMonth={selectedMonth}
          MONTHS={MONTHS}
        />
        <div className="flex gap-3">
          {photoURL || username ? (
            <div className="flex items-center justify-center gap-2">
              <img src={photoURL} className="w-7 h-7 rounded-full " />
              <h2>{username}</h2>
            </div>
          ) : null}

          <Button
            onClick={() => {
              handleSignOut();
            }}
            variant="outline"
          >
            Odhlásit se
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
