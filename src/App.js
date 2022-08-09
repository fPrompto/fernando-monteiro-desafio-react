import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import routes from './routes';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, i) => (
          <Route
            key={i}
            // exact={route.exact}
            path={route.path}
            element={<route.element />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
