import React from 'react';
import PropTypes from 'prop-types';

class Result extends React.Component {

    updateHighscore() {
        if (this.props.score < this.props.highscore) {
            this.props.recordHighscore();
            return true;
        }
        else {
            return false;
        }
    }

    render() {
        return (
            <div className="result-container">
                <div className="result-block">
                    <div className="result-text">
                        <p>Congratulations!</p>
                        <p>Your score is <span>{this.props.score}</span> steps.</p>
                        {this.updateHighscore() && <p>This is a new highscore!</p>}
                    </div>
                    <button onClick={this.props.resetGame}>Try again</button>
                </div>
            </div>
        )
    }
}

Result.propTypes = {
    score: PropTypes.number,
    highscore: PropTypes.number,
};

export default Result;