import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import Main from './pages/Main';
import store from './redux/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Main />
      </Provider>
    </div>
  );
}

export default App;
