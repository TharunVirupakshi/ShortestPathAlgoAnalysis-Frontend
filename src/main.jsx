import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import './index.css'
import { ApiDataProvider } from './context/dataProvider.jsx'

ReactDOM.render(
  <React.StrictMode>
    <ApiDataProvider>
      <App />
    </ApiDataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
