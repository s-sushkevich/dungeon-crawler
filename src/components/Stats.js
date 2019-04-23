import React from 'react';
import playerStatsConsts from '../consts/playerStats';
import config from '../db/config';
import PropTypes from 'prop-types';

class Stats extends React.Component {

    componentDidMount() {
        this.props.getHighscore();
    }

    render() {
        return (
            <div className="stats-bar">
                <h3>Player Stats</h3>
                <ul>
                    {
                        Object.keys(this.props.playerStats).map((stat, i) => {
                            return <li key={i}>
                                {stat}: {
                                stat === playerStatsConsts.CERTIFICATES || stat === playerStatsConsts.SKILLS
                                    ? `${this.props.playerStats[stat]}/${config[stat]}`
                                    : this.props.playerStats[stat]
                            }
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

Stats.propTypes = {
    getHighscore: PropTypes.func,
    playerStats: PropTypes.object,
};


export default Stats;