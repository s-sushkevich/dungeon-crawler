import {connect} from 'react-redux';
import Map from '../components/Map';

const mapStateToProps = (state) => ({
    map: state.game.map,
    viewportRows: state.options.viewportRows,
    viewportThreshold: state.options.viewportThreshold,
    playerCoordinateX: state.game.playerCoordinateX,
    playerCoordinateY: state.game.playerCoordinateY,
    playerLevel: state.stats.level,
    skillsGot: state.stats.skills,
    certificatesGot: state.stats.certificates,
});

const mapDispatchToProps = (dispatch) => {
    return {
        moveLeft: () => {
            dispatch({
                type: 'MOVE_LEFT',
            });
            dispatch({
                type: 'ADD_STEP',
            })
        },
        moveRight: () => {
            dispatch({
                type: 'MOVE_RIGHT',
            });
            dispatch({
                type: 'ADD_STEP',
            })
        },
        moveUp: () => {
            dispatch({
                type: 'MOVE_UP',
            });
            dispatch({
                type: 'ADD_STEP',
            });
        },
        moveDown: () => {
            dispatch({
                type: 'MOVE_DOWN',
            });
            dispatch({
                type: 'ADD_STEP',
            });
        },
        jumpLeft: () => {
            dispatch({
                type: 'JUMP_LEFT',
            });
            dispatch({
                type: 'ADD_STEP',
            })
        },
        jumpRight: () => {
            dispatch({
                type: 'JUMP_RIGHT',
            });
            dispatch({
                type: 'ADD_STEP',
            })
        },
        scrollMap: (newViewportRows) => dispatch({
            type: 'SCROLL_MAP',
            payload: newViewportRows,
        }),
        getSkill: () => {
            dispatch({
                type: 'GET_SKILL',
            });
            dispatch({
                type: 'GET_SKILL_MESSAGE',
            });
        },
        getCertificate: () => {
            dispatch({
                type: 'GET_CERTIFICATE',
            });
            dispatch({
                type: 'GET_CERTIFICATE_MESSAGE',
            })
        },
        levelUp: () => dispatch({
            type: 'LEVEL_UP',
        }),
        breakBossWalls: () => dispatch({
            type: 'BREAK_BOSS_WALLS',
        }),
        clearNotificationsMessage: () => dispatch({
            type: 'CLEAR_MESSAGE',
        }),
        finishGame: () => dispatch({
            type: 'GAME_FINISHED',
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
