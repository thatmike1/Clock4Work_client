import TableView from './Routes/TableView';
import Login from './Routes/Login';
import SignUp from './Routes/SignUp';
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter as Router,
} from 'react-router-dom';
import { AuthContext } from './Context/AuthContext';
import { Protected } from './Routes/Protected';

function App() {
  // const user = auth().currentUser;

  // if (!user) {
  //   return <Redirect to="/" />;
  // }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <SignUp></SignUp>,
    },
    {
      path: '/signup',
      element: <SignUp></SignUp>,
    },
    {
      path: '/login',
      element: <Login></Login>,
    },
    {
      path: '/hours-table',
      element: (
        <Protected>
          <TableView />
        </Protected>
      ),
    },
  ]);

  return (
    <div>
      <AuthContext>
        <RouterProvider router={router}></RouterProvider>
      </AuthContext>
    </div>
  );
}

export default App;
