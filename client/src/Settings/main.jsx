import React from 'react'; // imported React from 'react';
import ReactDOM from 'react-dom/client'; // imported ReactDOM from 'react-dom/client';

// import Global Code Editor
import Global from '@setting/Global'; // imported Global from './Global';

// Redux Provider
import { Provider } from 'react-redux'; // imported { Provider } from 'react-redux';

// Redux Store
import Store from '@app/Redux/Store'; // imported Store from '../App/Redux/Store';

ReactDOM.createRoot(document.getElementById('Code-Compiler')).render(
  <React.StrictMode>
    <Provider store={Store} >
    <Global/>
    </Provider>
  </React.StrictMode>,
)
