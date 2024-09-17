import React from 'react'
import ReactDOM from 'react-dom/client'
import WrappedApp from './App.jsx';
import './config/i18n.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WrappedApp/>
  </React.StrictMode>,
)