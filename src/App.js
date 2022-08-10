import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import routes from './routes';

import NotFound from './pages/NotFound';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, i) => (
          <Route
            key={i}
            exact
            path={route.path}
            element={<route.element />}
          />
        ))}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
