import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import ModalProvider from './components/modal/ModalContext'

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <App />
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
