/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import './index.css'

import { initializeIcons } from '@fluentui/font-icons-mdl2'
import ReactDOM from 'react-dom'

import App from './app/App'

initializeIcons()

ReactDOM.render(<App />, document.getElementById('root'))
