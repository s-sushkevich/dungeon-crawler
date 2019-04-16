const params = {
    skills: 25,
    certificates: 3,
    viewportThreshold: 2,
    viewportSizes: [10,12,14],
    mapSize: {
        x: 20,
        y: 100,
    },
    mapTrackRatio: .8,
};

export default {
    ...params,
    defaultViewportSize: params.viewportSizes[0],
}
