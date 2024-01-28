import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { useState } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  OperationType,
} from 'firebase/auth';
import Header from '@/components/Header';

const Login = () => {
  const navigate = useNavigate();
  // const goToTable = navigate('/hours-table');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleLogin = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, pwd)
      .then((user) => {
        console.log(user);
        navigate('/hours-table');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  async function handleGoogleSignup() {
    try {
      const result = await signInWithPopup(auth, provider);

      const name = result.user.displayName;
      if (OperationType != 'signIn') {
        const response = await fetch(
          'https://clock4workserver.onrender.com/createUser',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: result.user.uid,
              name,
            }),
          }
        );
        console.log(result);
      }

      navigate('/hours-table');
    } catch (error) {
      // Handle errors
    }
  }
  return (
    <>
      <Header login />
      <div className="flex flex-col items-center justify-center min-h-screen m-0 p-0 overflow-hidden">
        <div className="w-[300px]">
          <h2>Přihlášení do Clock4Work</h2>

          <form onSubmit={(e) => handleLogin(e)}>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="E-mail"
              className="my-6"
            />
            <Input
              onChange={(e) => setPwd(e.target.value)}
              type="password"
              placeholder="Heslo"
              className="my-6"
            />

            <Button className="w-full" type="submit" variant="outline">
              Přihlásit se
            </Button>
          </form>
          <div className="my-4">
            <h2 className="text-center my-4">Nebo...</h2>

            <Button
              className="w-full"
              variant="outline"
              onClick={handleGoogleSignup}
            >
              Přihlásit se přes Google
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
