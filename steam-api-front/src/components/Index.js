import React, { Component } from 'react';

//Front page y'all.

class Index extends Component {
    constructor() {
        super();
        this.state = {
            gameList: [{
                name: 'OVERWATCH',
                img: 'http://www.gamestop.com/gs/images/bonus/overwatchposter_bonusLG.jpg',
                desc: 'A stylish sci-fi team-based first-person shooter from Blizzard in which players can choose from over 20 "action figure"-esque Heroes, each with their own unique weapons and abilities.',
                release: 'May 23, 2016',
                platform: 'PC'
            },
            {
                name: 'COUNTER-STRIKE: GLOBAL OFFENSIVE',
                img: 'http://ecx.images-amazon.com/images/I/81L8-mjNlrL._SL1500_.jpg',
                desc: 'Valve\'s original team-based modern-military first-person shooter, now in its fourth iteration, gets rebuilt for competitive play with new maps, new weapons, and new gameplay mechanics.',
                release: 'August 21, 2012',
                platform: 'PC'
            },
            {
                name: 'LEAGUE OF LEGENDS',
                img: 'http://i.imgur.com/nIOUjVM.png',
                desc: 'A free-to-play competitive MOBA game with a large following in eSports. From the original developers of DotA: Allstars, the game expands the gameplay found in DotA by adding persistent Summoner profiles and a variety of original champions who fight for you on the battlefield against bots or one another.',
                release: 'October 27, 2009',
                platform: 'PC'
            },
            {
                name: 'HEARTHSTONE: HEROES OF WARCRAFT',
                img: 'http://images.onehitpixel.com/2013/11/hearthstonebox.jpg',
                desc: 'A Free-to-Play card collection/strategy game by Blizzard Entertainment set in the Warcraft universe.',
                release: 'March 11, 2014',
                platform: 'PC'
            },
            {
                name: 'BATTLEFIELD 1',
                img: 'http://www.gbposters.com/media/catalog/product/cache/1/image/737x938/17f82f742ffe127f42dca9de82fb58b1/b/a/battlefield-1-main-maxi-poster-1.16.jpg',
                desc: 'Battlefield goes to the first World War for the first time.',
                release: 'Oct Something, 2016',
                platform: 'PC'
            },
            {
                name: 'DOTA 2',
                img: 'http://pre02.deviantart.net/0c7e/th/pre/i/2011/028/5/4/dota_2_poster_by_jmc5221-d387ukq.jpg',
                desc: 'The official free-to-play sequel to the Warcraft III custom scenario that originally popularized the Multiplayer Online Battle Arena sub-genre.',
                release: 'July 9, 2013',
                platform: 'PC'
            },
            {
                name: 'TOM CLANCY\'S RAINBOW SIX: SIEGE',
                img: 'http://gamepack.in/wp-content/uploads/2015/12/Tom-Clancys-Rainbow-Six-Siege.jpg',
                desc: 'A first-person tactical shooter developed by Ubisoft Montreal Studios. In this installment of the Rainbow Six series, some players are focused on assault where as others are defense-oriented.',
                release: 'December 1, 2015',
                platform: 'PC'
            },
            {
                name: 'ARMA III',
                img: 'http://vignette2.wikia.nocookie.net/armedassault/images/1/13/Arma-3-cover.jpg/revision/latest?cb=20140704174436',
                desc: 'Arma 3 is the third core game in the simulation and modern combat Arma franchise developed by Bohemia Interactive.',
                release: 'September 12, 2013',
                platform: 'PC'
            },
            {
                name: 'HEROES OF THE STORM',
                img: 'http://www.goodluckhavefun.net/wp-content/uploads/blizzcon-2013-heroes-of-the-storm-poster-3.jpg',
                desc: 'Heroes from Warcraft, StarCraft, Diablo, and other universes are summoned to the Nexus for five-on-five combat in Blizzard\'s take on the MOBA genre.',
                release: 'June 2, 2015',
                platform: 'PC'
            }
            ]
        }
        this.handleClick = this.handleClick.bind(this);
        this.callClick = this.callClick.bind(this);
    }

    callClick(e) {
        window.location = "/" + e.target.value;
    }

    handleClick(e) {
        localStorage.setItem('gameName', e.toUpperCase());
        setTimeout(() => { window.location = "/game/"; }, 250);
    }

    render() {
        let style = {
            color: '#FFFFFF'
        }
        let gameArr = this.state.gameList;
        return (
            <div className="App">

                <div className="App-Wrapper">

                    <div className="jumbotron">
                        <div className="row">
                            <h1 style={style} className="titleText col s12">LOOKING FOR GROUP</h1>

                            <div className="col s2 xs12 offset-s4 callToButtons">
                                <button value="register" className="btn btn-primary" onClick={this.callClick}>REGISTER</button>
                            </div>
                            <div className="col s2 xs12 callToButtons">
                                <button value="login" className="btn btn-primary" onClick={this.callClick}>LOGIN</button>
                            </div>

                        </div>
                    </div>

                    <h4 className="callToAction section">
                        GET STARTED
                    </h4>

                    <div className="container">

                        <div className="section">
                            <div className="row">
                                <div className="col s4">
                                    <i className="material-icons bigIcon">perm_identity</i>
                                    <h3>Make an account</h3>
                                    <p>Click the Register button, make an account, and log in!</p>
                                </div>
                                <div className="col s4">
                                    <i className="material-icons bigIcon">games</i>
                                    <h3>Add games</h3>
                                    <p>Add the games that you play, and be sure to tell everyone how good you are!</p>
                                </div>
                                <div className="col s4">
                                    <i className="material-icons bigIcon">search</i>
                                    <h3>Find friends!</h3>
                                    <p>Search by game or by user, and find people to play with! Simple as that!</p>
                                </div>
                            </div>
                        </div>

                        <div className='posterCase row'>

                            {gameArr.map((game) =>
                                <div className='card hoverable large col l4 m6 s12'>
                                    <div className='card-image'>
                                        <img role="presentation" src={game.img} />
                                    </div>
                                    <a value={game.name} onClick={() => { this.handleClick(game.name) } }><h3 className="boldCard"> {game.name} </h3></a>
                                    <p>Released: {game.release.replace(/00:00:00/, '')}</p>
                                    <p>Platform: {game.platform} </p>
                                    <p className="truncate">{game.desc}</p>
                                    <div className="card-reveal">
                                        <span className="card-title">{game.name}</span>
                                        <p>{game.desc}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <footer className="section footy">
                    <h5 className="center-align">Generic Easter Egg</h5>
                </footer>
            </div>
        );
    }
}

export default Index;