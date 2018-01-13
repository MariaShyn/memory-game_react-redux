import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

const configureStore = (initialState) => {
    const logger = createLogger();
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk, logger));

    if (process.env.NODE_ENV !== "production") {
        if (module.hot) {
            module.hot.accept('../reducers', () => {
                store.replaceReducer(rootReducer)
            })
        }
    }

    return store;
};

export default configureStore;