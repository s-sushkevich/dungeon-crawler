import update from 'immutability-helper';
import playerStatsConsts from "../consts/playerStats";

const initialState = {
    [playerStatsConsts.LEVEL]: 1,
    [playerStatsConsts.HIGHSCORE]: 0,
    [playerStatsConsts.STEPS]: 0,
    [playerStatsConsts.CERTIFICATES]: 0,
    [playerStatsConsts.SKILLS]: 0,
};

function playerStatsReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_STEP':
            return update(state, {
                $merge: {
                    steps: state.steps + 1,
                }
            });

        case `GET_SKILL`:
            return update(state, {
                $merge: {
                    skills: state.skills + 1,
                }
            });

        case 'GET_CERTIFICATE':
            return update(state, {
                $merge: {
                    certificates: state.certificates + 1,
                }
            });

        case 'LEVEL_UP':
            return update(state, {
                $merge: {
                    level: state.level + 1,
                }
            });

        case 'FETCH_HIGHSCORE_COMPLETED':
            return update(state, {
                $merge: {
                    highscore: action.payload,
                }
            });

        case 'RESET_STATS':
            return initialState;

        default:
            return state;
    }
}

export default playerStatsReducer;