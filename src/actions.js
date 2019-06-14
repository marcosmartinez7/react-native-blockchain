import { ofType } from 'redux-observable'
import { delay, mapTo, pipe } from 'rxjs/operators'

export const Actions = {
    PING: 'PING',
    PONG: 'PONG'
}

export const ping = () => ({ type: Actions.PING })

export default (action$) =>
    action$.pipe(
        ofType(Actions.PING),
        delay(1000),
        mapTo({ type: Actions.PONG })
    )
