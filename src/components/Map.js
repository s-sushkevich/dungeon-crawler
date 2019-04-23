import React from 'react';
import MapItem from './MapItem';
import gameService from '../services/gameService';
import config from '../db/config';
import PropTypes from 'prop-types';
import gameLevelsConsts from '../consts/gameLevels';

class Map extends React.Component {

    constructor() {
        super();
        this.handleArrowKey = this.handleArrowKey.bind(this);
        this.checkForMoving = this.checkForMoving.bind(this);
        this.moveItem = this.moveItem.bind(this);
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleArrowKey);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleArrowKey);
    }

    clearNotificationsMessage() {
        setTimeout(this.props.clearNotificationsMessage, 1500);
    }

    handleArrowKey(event) {
        switch (event.keyCode) {
            case 37:
                event.preventDefault();
                this.checkForMoving(this.props.playerCoordinateY, this.props.playerCoordinateX - 1, this.props.moveLeft);
                break;

            case 39:
                event.preventDefault();
                this.checkForMoving(this.props.playerCoordinateY, this.props.playerCoordinateX + 1, this.props.moveRight);
                break;

            case 38:
                event.preventDefault();
                this.checkForMoving(this.props.playerCoordinateY - 1, this.props.playerCoordinateX, this.props.moveUp);

                let newScrolledUpViewport = gameService.shouldMapScrollUp(this.props.map, this.props.viewportRows, this.props.playerCoordinateY, this.props.viewportThreshold);
                newScrolledUpViewport && this.props.scrollMap(newScrolledUpViewport);
                break;

            case 40:
                event.preventDefault();
                this.checkForMoving(this.props.playerCoordinateY + 1, this.props.playerCoordinateX, this.props.moveDown);

                let newScrolledDownViewport = gameService.shouldMapScrollDown(this.props.map, this.props.viewportRows, this.props.playerCoordinateY, this.props.viewportThreshold);
                newScrolledDownViewport && this.props.scrollMap(newScrolledDownViewport);
                break;
        }
    };

    checkForMoving(targetY, targetX, moveFunction) {
        if (!gameService.isVerticalBorder(this.props.map, targetY)
            && !gameService.isWall(this.props.map, targetY, targetX)) {

            if (gameService.isLeftBorder(targetX)) {
                if (!gameService.isWall(this.props.map, targetY, config.mapSize.x - 1)) {

                    targetX = config.mapSize - 1;
                    moveFunction = this.props.jumpRight;
                } else {
                    return;
                }
            }
            else if (gameService.isRightBorder(targetX)) {
                if (!gameService.isWall(this.props.map, targetY, 0)) {

                    targetX = 0;
                    moveFunction = this.props.jumpLeft;
                } else {
                    return;
                }
            }

            !(this.props.playerLevel === gameLevelsConsts.LEVEL_FIRST && gameService.isCertificate(this.props.map, targetY, targetX))
            && this.moveItem(targetY, targetX, moveFunction);
        }
    };

    moveItem(targetY, targetX, moveFunction) {
        if (this.props.playerLevel === gameLevelsConsts.LEVEL_FIRST && gameService.isSkill(this.props.map, targetY, targetX)) {
            this.props.getSkill();
            this.clearNotificationsMessage();

            if (gameService.isLevelUp(this.props.skillsGot, config.skills)) {
                this.props.levelUp();
            }
        }

        if (this.props.playerLevel === gameLevelsConsts.LEVEL_SECOND && gameService.isCertificate(this.props.map, targetY, targetX)) {
            this.props.getCertificate();
            this.clearNotificationsMessage();

            if (gameService.isLevelUp(this.props.certificatesGot, config.certificates)) {
                this.props.levelUp();
                this.props.breakBossWalls();
            }
        }

        if (this.props.playerLevel === gameLevelsConsts.LEVEL_THIRD && gameService.isBoss(this.props.map, targetY, targetX)) {
            this.props.finishGame();
        }

        moveFunction();
    };

    render() {
        return (
            <div className="map">
                {
                    this.props.viewportRows.map((rowId) => {
                        return (
                            <div key={rowId} className={`map-row row-${rowId}`}>
                                {
                                    Object.keys(this.props.map[rowId]).map((col, i) => (
                                        <MapItem
                                            key={`${rowId}-${i}`}
                                            type={this.props.map[rowId][col]}
                                            id={`${rowId}:${col}`}/>
                                    ))
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

Map.propTypes = {
    map: PropTypes.object,
    viewportRows: PropTypes.array,
    viewportThreshold: PropTypes.number,
    playerCoordinateX: PropTypes.number,
    playerCoordinateY: PropTypes.number,
    playerLevel: PropTypes.number,
    skillsGot: PropTypes.number,
    certificatesGot: PropTypes.number,
};

export default Map;
