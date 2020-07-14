import 'dotenv/config'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.unregister()
