import MonthDropdown from './MonthDropdown';
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';

const Header = ({
  selectedMonth,
  setSelectedMonth,
  MONTHS,
  auth,
  username,
  photoURL,
}) => {
  async function handleSignOut() {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
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
