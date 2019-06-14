import { Actions } from '../actions/openChannelEpic'

export default (state = { loading: false }, action) => {
    switch (action.type) {
        case (Actions.LOADING):
            return { loading: true, initial: false}
        case (Actions.READY):
            return { loading: false, initial: false}
        default:
            return state
    }
}
