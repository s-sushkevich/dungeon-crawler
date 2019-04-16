import update from 'immutability-helper';
import config from '../db/config';

function setViewportRows(size, firstRow) {
    let viewportRows = [];
    let lastRow = size + firstRow;

    for (let i = firstRow; i < lastRow; i++) {
        viewportRows.push(i);
    }
    return viewportRows;
}

const initialState = {
    viewportRows: setViewportRows(config.defaultViewportSize, 0),
    viewportThreshold: config.viewportThreshold,
    isSoundOn: false,
};

function optionsReducer(state = initialState, action) {
    switch (action.type) {

        case 'SCROLL_MAP':
            return update(state, {
                $merge: {
                    viewportRows: action.payload,
                }
            });

        case 'CHANGE_VIEWPORT':
            let prevFirstRow = state.viewportRows[0];
            let prevLastRow = state.viewportRows[state.viewportRows.length - 1];

            let nextFirstRow = prevFirstRow;
            let nextLastRow = prevFirstRow + action.nextViewportSize - 1;

            if (!action.map[nextLastRow] || (nextLastRow - config.viewportThreshold <= action.playerY)) {
                nextFirstRow = prevLastRow - action.nextViewportSize + 1;
            }

            return update(state, {
                $merge: {
                    viewportRows: setViewportRows(action.nextViewportSize, nextFirstRow),
                }
            });

        case 'RESET_VIEWPORT':
            return update(state, {
                $merge: {
                    viewportRows: initialState.viewportRows,
                }
            });

        case 'TOGGLE_SOUND':
            return update(state, {
                $merge: {
                    isSoundOn: !state.isSoundOn,
                }
            });

        case 'RESET_SOUND':
            return update(state, {
                $merge: {
                    isSoundOn: initialState.isSoundOn,
                }
            });

        default:
            return state;
    }
}

export default optionsReducer;