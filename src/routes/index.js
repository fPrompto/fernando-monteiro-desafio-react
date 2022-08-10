import Home from '../pages/Home';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';

const routes = [
  {
    path: '/',
    name: 'Home',
    element: Home,
    exact: true,
  },
  {
    path: '/user/:user',
    name: 'Perfil',
    element: Profile,
    exact: true,
  },
];

export default routes;
