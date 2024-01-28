import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { Form } from '@/components/ui/form';

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleSignUp = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, pwd)
      .then((user) => {
        console.log(user);
        // Call the API to create a user in your database
        fetch('https://clock4workserver.onrender.com/createUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.user.uid, // Get the user ID from the user object
            name,
          }),
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error('Error:', error));
        if (user && user.emailVerified === false) {
          user.sendEmailVerification().then(function () {
            console.log('email verification sent to user');
          });
        }

        //send verif mail later
      })
      .catch((e) => {
        console.log(e);
      });

    navigate('/login');
  }; //end of handlesignup

  const handleGoogleSignup = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        // Call the API to create a user in your database
        fetch('https://clock4workserver.onrender.com/createUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: result.user.uid, // Get the user ID from the user object
            name: result.user.displayName,
          }),
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error('Error:', error));
      })
      .catch((e) => {
        console.log(e);
      });

    navigate('/hours-table');
  }; //end of handlesignup

  return (
    <div className="flex flex-col items-center justify-center min-h-screen m-0 p-0 overflow-hidden">
      <div className="w-[300px]">
        <h1>Registrace</h1>

        <Form>
          <Input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Vaše jméno"
            className="my-6"
          />
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="E-mail"
            className="my-6"
          />
          <Input
            onChange={(e) => setPwd(e.target.value)}
            type="password"
            placeholder="Heslo"
            className="my-6"
          />

          <Button
            className="w-full"
            onClick={(e) => handleSignUp(e)}
            variant="outline"
          >
            Zaregistrujte se
          </Button>
        </Form>
        <div className="my-4">
          <h2 className="text-center my-4">Nebo...</h2>

          <Button
            className="w-full"
            variant="outline"
            onClick={handleGoogleSignup}
          >
            Přihlásit/registrovat se přes Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
