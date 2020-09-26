import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const middlewaeres = [sagaMiddleware];

if(process.env.NODE_ENV === 'development') {
    middlewaeres.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewaeres));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default { store, persistor };  