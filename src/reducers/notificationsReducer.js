import update from 'immutability-helper';
import notificationsConsts from "../consts/notifications";

const initialState = {
    headerMessage: notificationsConsts.DEFAULT,
};

function notificationsReducer(state = initialState, action) {
    switch (action.type) {
        case 'CLEAR_MESSAGE':
            return update(state, {
                $merge: {
                    headerMessage: null,
                }
            });

        case 'GET_SKILL_MESSAGE':
            return update(state, {
                $merge: {
                    headerMessage: notificationsConsts.GET_SKILL,
                }
            });

        case 'GET_CERTIFICATE_MESSAGE':
            return update(state, {
                $merge: {
                    headerMessage: notificationsConsts.GET_CERTIFICATE,
                }
            });

        default:
            return state;
    }
}

export default notificationsReducer;