import React from 'react';
import '@/assets/styles/App.css';
import Routes from '@/routes';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RouterProvider router={Routes} />
      </header>
    </div>
  );
}

export default App;
