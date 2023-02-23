import React from 'react';
import '@/assets/styles/App.css';
import { Logo } from '@/assets';
import { Button } from '@/components';

const SobrePage = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={Logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Button text='Click' />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export { SobrePage };
