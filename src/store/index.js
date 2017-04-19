import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducers/home'
const createStoreWithMiddleware = applyMiddleware(
    thunk
)(createStore)

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(reducer,initialState)

    // check if HotModuleReplacement is enabled
    if(module.hot){
        module.hot.accept('../reducers/home',() =>{
            const nextReducer = require('../reducers/home')
            store.replaceReducer(nextReducer)
        })
    }

    return store
}