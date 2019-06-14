import { ofType } from 'redux-observable'
import { delay, mapTo, pipe } from 'rxjs/operators'

export const Actions = {
    LOADING: 'LOADING',
    READY: 'READY'
};

export const open = () => ({ type: Actions.LOADING });

export default (action$) =>
    action$.pipe(
        ofType(Actions.LOADING),
        delay(1000),
        mapTo({ type: Actions.READY })
    )
