import React from 'react';
import logo from './logo.svg';
import './App.css';
import SearchResults from './components/SearchResults';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <SearchResults title="Pfizer" searchUrl= "https://cors-anywhere.herokuapp.com/https://www.google.com/search?q=pfizer+vaccine" />
        <SearchResults title="Moderna" searchUrl= "https://cors-anywhere.herokuapp.com/https://www.google.com/search?q=moderna+vaccine" />
        <SearchResults title="Johnson&Johnson" searchUrl= "https://cors-anywhere.herokuapp.com/https://www.google.com/search?q=johnson+and+johnson+vaccine" />
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

export default App;
