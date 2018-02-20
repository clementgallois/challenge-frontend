import React, { PureComponent } from 'react';
import Navbar from './components/Navbar';
import Content from './components/Content';

import './App.css';

/*
** Main view
*/

class App extends PureComponent {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Content />
      </div>
    );
  }
}

export default App;
