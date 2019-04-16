import update from 'immutability-helper';
import mapItemTypesConsts from '../consts/mapItemTypes';
import config from '../db/config';
import mapModesConsts from '../consts/mapModes';
import mapService from '../services/mapService';

let initialMap = mapService.generateDefaultMap(config.mapSize.y, config.mapSize.x);

const initialState = {
    map: initialMap,
    playerCoordinateY: mapService.getInitialPlayerY(initialMap),
    playerCoordinateX: mapService.getInitialPlayerX(initialMap),
};

function gameReducer(state = initialState, action) {
    switch (action.type) {

        case 'MOVE_LEFT':
            return update(state, {
                $merge: {
                    playerCoordinateX: state.playerCoordinateX - 1,
                },
                map: {
                    [state.playerCoordinateY]: {
                        [state.playerCoordinateX]: {
                            $set: mapItemTypesConsts.TRACK
                        },
                        [state.playerCoordinateX - 1]: {
                            $set: mapItemTypesConsts.PLAYER
                        }
                    }
                },
            });

        case 'MOVE_RIGHT':
            return update(state, {
                $merge: {
                    playerCoordinateX: state.playerCoordinateX + 1,
                },
                map: {
                    [state.playerCoordinateY]: {
                        [state.playerCoordinateX]: {
                            $set: mapItemTypesConsts.TRACK
                        },
                        [state.playerCoordinateX + 1]: {
                            $set: mapItemTypesConsts.PLAYER
                        }
                    }
                },
            });

        case 'MOVE_UP':
            return update(state, {
                $merge: {
                    playerCoordinateY: state.playerCoordinateY - 1,
                },
                map: {
                    [state.playerCoordinateY]: {
                        [state.playerCoordinateX]: {
                            $set: mapItemTypesConsts.TRACK
                        }
                    },
                    [state.playerCoordinateY - 1]: {
                        [state.playerCoordinateX]: {
                            $set: mapItemTypesConsts.PLAYER
                        }
                    },
                },
            });

        case 'MOVE_DOWN':
            return update(state, {
                $merge: {
                    playerCoordinateY: state.playerCoordinateY + 1,
                },
                map: {
                    [state.playerCoordinateY]: {
                        [state.playerCoordinateX]: {
                            $set: mapItemTypesConsts.TRACK
                        }
                    },
                    [state.playerCoordinateY + 1]: {
                        [state.playerCoordinateX]: {
                            $set: mapItemTypesConsts.PLAYER
                        }
                    },
                },
            });

        case 'JUMP_LEFT':
            return update(state, {
                $merge: {
                    playerCoordinateX: 0,
                },
                map: {
                    [state.playerCoordinateY]: {
                        [state.playerCoordinateX]: {
                            $set: mapItemTypesConsts.TRACK
                        },
                        0: {
                            $set: mapItemTypesConsts.PLAYER
                        }
                    }
                },
            });

        case 'JUMP_RIGHT':
            return update(state, {
                $merge: {
                    playerCoordinateX: config.mapSize.x - 1,
                },
                map: {
                    [state.playerCoordinateY]: {
                        [state.playerCoordinateX]: {
                            $set: mapItemTypesConsts.TRACK
                        },
                        [config.mapSize.x - 1]: {
                            $set: mapItemTypesConsts.PLAYER
                        }
                    }
                },
            });

        case 'BREAK_BOSS_WALLS':
            let newState = state;

            Object.keys(state.map).forEach((row) => {
                Object.keys(state.map[row]).forEach((col) => {
                    if (state.map[row][col] === mapItemTypesConsts.BOSS_WALL) {
                        newState = update(newState, {
                            map: {
                                [row]: {
                                    [col]: {
                                        $set: mapItemTypesConsts.TRACK,
                                    }
                                }
                            }
                        });
                    }
                })
            });

            return newState;

        case 'CHANGE_MAP':
            let initializedMap;

            if (action.payload === mapModesConsts.RANDOM) {
                initializedMap = mapService.generateRandomMap(config.mapSize.y, config.mapSize.x, config.skills,
                    config.certificates, config.viewportThreshold, config.defaultViewportSize, config.mapTrackRatio);
            }

            else if (action.payload === mapModesConsts.DEFAULT) {
                initializedMap = mapService.generateDefaultMap(config.mapSize.y, config.mapSize.x);
            }

            return update(state, {
                $merge: {
                    map: initializedMap,
                    playerCoordinateY: mapService.getInitialPlayerY(initializedMap),
                    playerCoordinateX: mapService.getInitialPlayerX(initializedMap),
                }
            });

        case 'RESET_MAP':
            return initialState;

        default:
            return state;
    }
}

export default gameReducer;
