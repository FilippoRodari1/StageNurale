import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import RoutesComponent from './routes/index.tsx'
import { store } from './store/applicationStore.ts'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RoutesComponent/>
    </Provider>
  </React.StrictMode>
)

