import map from "../db/map";
import mapItemTypesConsts from "../consts/mapItemTypes";
import gameBossShapeConsts from "../consts/gameBossShape";

class MapService {

    constructor() {
        this.initialMap = {};
        this.tracksMap = {};
    }

    generateRandomTracksAndWalls(rows, cols, mapTrackRatio) {
        for (let i = 0; i < rows; i++) {
            let initialRow = {};
            let trackRow = {};
            for (let j = 0; j < cols; j++) {

                if (Math.random() <= mapTrackRatio) {
                    initialRow[j] = mapItemTypesConsts.TRACK;
                    trackRow[j] = mapItemTypesConsts.TRACK;
                } else {
                    initialRow[j] = mapItemTypesConsts.WALL;
                }

            }

            this.initialMap[i] = initialRow;
            this.tracksMap[i] = trackRow;
        }
    }

    generateRandomBoss(rows, cols) {
        let bossWallsCoordinates = [];
        let bossWallTopY = Math.floor(Math.random() * (rows - gameBossShapeConsts.BOSS_WALL_LENGTH));
        let bossWallLeftX = Math.floor(Math.random() * (cols - gameBossShapeConsts.BOSS_WALL_LENGTH));

        for (let i = 0, bossWallX = bossWallLeftX; i < gameBossShapeConsts.BOSS_WALL_LENGTH; i++) {

            bossWallsCoordinates.push({y: bossWallTopY, x: bossWallX});
            bossWallsCoordinates.push({y: (bossWallTopY + gameBossShapeConsts.BOSS_WALL_LENGTH - 1), x: bossWallX});

            if (i === 0 || i === gameBossShapeConsts.BOSS_WALL_LENGTH - 1) {
                for (let j = 1; j <= gameBossShapeConsts.BOSS_LENGTH; j++) {
                    bossWallsCoordinates.push({y: (bossWallTopY + j), x: bossWallX});
                }
            }

            bossWallX++;
        }

        for (let i = 0; i < bossWallsCoordinates.length; i++) {
            let targetY = bossWallsCoordinates[i].y;
            let targetX = bossWallsCoordinates[i].x;

            this.initialMap[targetY][targetX] = mapItemTypesConsts.BOSS_WALL;

            if (this.tracksMap[targetY] && this.tracksMap[targetY][targetX]) {
                delete this.tracksMap[targetY][targetX];
            }
        }

        let bossCoordinates = [];
        let bossTopY = bossWallTopY + gameBossShapeConsts.BOSS_WALL_WIDTH;
        let bossLeftX = bossWallLeftX + gameBossShapeConsts.BOSS_WALL_WIDTH;

        for (let i = 0, bossX = bossLeftX; i < gameBossShapeConsts.BOSS_LENGTH; i++) {
            bossCoordinates.push({y: bossTopY, x: bossX});

            for (let j = 1; j < gameBossShapeConsts.BOSS_LENGTH; j++) {
                bossCoordinates.push({y: (bossTopY + j), x: bossX});
            }

            bossX++;
        }

        for (let i = 0; i < bossCoordinates.length; i++) {
            let targetY = bossCoordinates[i].y;
            let targetX = bossCoordinates[i].x;

            this.initialMap[targetY][targetX] = mapItemTypesConsts.BOSS;

            if (this.tracksMap[targetY] && this.tracksMap[targetY][targetX]) {
                delete this.tracksMap[targetY][targetX];
            }
        }
    }

    generateRandomSkills(skills) {
        for (let i = 0; i < skills; i++) {
            let targetY = Object.keys(this.tracksMap)[Math.floor(Math.random() * Object.keys(this.tracksMap).length)];
            let targetX = Object.keys(this.tracksMap[targetY])[Math.floor(Math.random() * Object.keys(this.tracksMap[targetY]).length)];

            this.initialMap[targetY][targetX] = mapItemTypesConsts.SKILL;
            delete this.tracksMap[targetY][targetX];
        }
    }

    generateRandomCertificates(certificates) {
        for (let i = 0; i < certificates; i++) {
            let targetY = Object.keys(this.tracksMap)[Math.floor(Math.random() * Object.keys(this.tracksMap).length)];
            let targetX = Object.keys(this.tracksMap[targetY])[Math.floor(Math.random() * Object.keys(this.tracksMap[targetY]).length)];

            this.initialMap[targetY][targetX] = mapItemTypesConsts.CERTIFICATE;
            delete this.tracksMap[targetY][targetX];
        }
    }

    generateRandomPlayer(viewportThreshold, viewportSize) {
        let targetRows = Object.keys(this.tracksMap).filter((row) => {
            return row < ((viewportSize - 1) - viewportThreshold);
        });

        let targetY = targetRows[Math.floor(Math.random() * targetRows.length)];
        let targetX = Object.keys(this.tracksMap[targetY])[Math.floor(Math.random() * Object.keys(this.tracksMap[targetY]).length)];

        this.initialMap[targetY][targetX] = mapItemTypesConsts.PLAYER;
        delete this.tracksMap[targetY][targetX];
    }

    generateRandomMap(rows, cols, skills, certificates, viewportThreshold, viewportSize, mapTrackRatio) {
        this.initialMap = {};

        this.generateRandomTracksAndWalls(rows, cols, mapTrackRatio);
        this.generateRandomBoss(rows, cols);
        this.generateRandomSkills(skills);
        this.generateRandomCertificates(certificates);
        this.generateRandomPlayer(viewportThreshold, viewportSize);

        return this.initialMap;
    }

    generateDefaultMap(rows, cols) {
        this.initialMap = {};

        for (let i = 0; i < rows; i++) {
            let initialRow = {};
            for (let j = 0; j < cols; j++) {
                if (map[i] && map[i][j]) {
                    initialRow[j] = map[i][j];
                } else {
                    initialRow[j] = mapItemTypesConsts.TRACK;
                }
            }
            this.initialMap[i] = initialRow;
        }

        return this.initialMap;
    }

    getInitialPlayerY(map) {
        for (let row in map) {
            for (let col in map[row]) {
                if (map[row][col] === mapItemTypesConsts.PLAYER) {
                    return +row;
                }
            }
        }
    }

    getInitialPlayerX(map) {
        for (let row in map) {
            for (let col in map[row]) {
                if (map[row][col] === mapItemTypesConsts.PLAYER) {
                    return +col;
                }
            }
        }
    }
}

export default new MapService();