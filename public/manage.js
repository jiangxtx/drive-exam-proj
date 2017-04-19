import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'react-redux'
import route from '../src/routes/route-manage'
import configureStore from '../src/store/index'

const store = configureStore()

ReactDom.render(
    <Provider store={store} >
        <div className="bodyFont">
            {route}
        </div>
    </Provider>
    , document.getElementById('root')
)