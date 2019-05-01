class HighscoreService {
    getValue() {
        return fetch('http://localhost:4000/highscore')
            .then((res) => {
                return res.json();
            })
    };

    setValue(value) {
        return fetch('http://localhost:4000/highscore', {
            method: "PUT",
            body: JSON.stringify({steps: value}),
            headers: {
                "Content-Type": "application/json",
            },
        })
    };
}

export default new HighscoreService();