import {call, put, takeLatest, all, select} from 'redux-saga/effects';
import highscoreService from '../services/highscoreService';

function* getHighscore() {
    let highscoreData = yield call(highscoreService.getValue);
    yield put({type: 'FETCH_HIGHSCORE_COMPLETED', payload: highscoreData.steps});
}

function* getHighscoreSaga() {
    yield takeLatest('FETCH_HIGHSCORE', getHighscore)
}

function* setHighscore() {
    let newHighscore = yield select((state) => state.stats.steps);
    yield call(highscoreService.setValue, newHighscore);
}

function* setHighscoreSaga() {
    yield takeLatest('RECORD_HIGHSCORE', setHighscore);
}

export default function* rootSaga() {
    yield all([
        getHighscoreSaga(),
        setHighscoreSaga(),
    ]);
};