import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routing from './routes/routes'
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
// import rootReducer from './reducers'
import loggerMiddleware from './middleware/logger'
import monitorReducerEnhancer from './enhancers/monitorReducer'

const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunkMiddleware)
const composedEnhancers = compose(middlewareEnhancer, monitorReducerEnhancer)

// const store = createStore(rootReducer, undefined, composedEnhancers)

ReactDOM.render(
  // <Provider store={store}>
    <React.StrictMode>
      <Routing />
    </React.StrictMode>,
  // </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
