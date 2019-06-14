import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import openEpic from "./actions/openChannelEpic";
import channelReducer from "./reducers/channelReducer";


const epicMiddleware = createEpicMiddleware();

const store = createStore(channelReducer,
    applyMiddleware(epicMiddleware)
)

epicMiddleware.run(openEpic);

export default store;
