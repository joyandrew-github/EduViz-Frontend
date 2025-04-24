import React from 'react'
import ReactDOM from 'react-dom/client'
// Import styles first
import './index.css'
// Import i18n configuration before App
import './i18n'
// Import App component last
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
