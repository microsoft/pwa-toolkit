import './index.css'

import { initializeIcons } from '@fluentui/font-icons-mdl2'
import ReactDOM from 'react-dom'

import App from './app/App'

initializeIcons()

ReactDOM.render(<App />, document.getElementById('root'))
