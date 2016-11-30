import React, { Component } from 'react';

//Front page y'all.

class Index extends Component {
    constructor() {
        super();
        this.state = {
            gameList: [{
                name: 'Overwatch',
                img: 'http://www.gamestop.com/gs/images/bonus/overwatchposter_bonusLG.jpg',
                desc: 'its a game',
                release: 'May 23, 2016',
                platform: 'PC'
            },
            {
                name: 'COUNTER-STRIKE: GLOBAL OFFENSIVE',
                img: 'http://ecx.images-amazon.com/images/I/81L8-mjNlrL._SL1500_.jpg',
                desc: 'just another game',
                release: 'August 21, 2012',
                platform: 'PC'
            },
            {
                name: 'League of Legends',
                img: 'http://i.imgur.com/nIOUjVM.png',
                desc: 'an angry game',
                release: 'October 27, 2009',
                platform: 'PC'
            },
            {
                name: 'Hearthstone: Heroes of Warcraft',
                img: 'http://images.onehitpixel.com/2013/11/hearthstonebox.jpg',
                desc: 'a card game',
                release: 'March 11, 2014',
                platform: 'PC'
            },
            {
                name: 'BATTLEFIELD 1',
                img: 'http://www.gbposters.com/media/catalog/product/cache/1/image/737x938/17f82f742ffe127f42dca9de82fb58b1/b/a/battlefield-1-main-maxi-poster-1.16.jpg',
                desc: 'a game about old stuff',
                release: 'Oct Something, 2016',
                platform: 'PC'
            },
            {
                name: 'DOTA 2',
                img: 'http://pre02.deviantart.net/0c7e/th/pre/i/2011/028/5/4/dota_2_poster_by_jmc5221-d387ukq.jpg',
                desc: 'an angry game of an older game',
                release: 'July 9, 2013',
                platform: 'PC'
            },
            {
                name: 'TOM CLANCY\'S RAINBOW SIX: SIEGE',
                img: 'http://gamepack.in/wp-content/uploads/2015/12/Tom-Clancys-Rainbow-Six-Siege.jpg',
                desc: 'a game about modern tech shooter people',
                release: 'December 1, 2015',
                platform: 'PC'
            },
            {
                name: 'ARMA III',
                img: 'http://vignette2.wikia.nocookie.net/armedassault/images/1/13/Arma-3-cover.jpg/revision/latest?cb=20140704174436',
                desc: 'a game about never trusting anyone',
                release: 'September 12, 2013',
                platform: 'PC'
            },
            {
                name: 'Fifa 2017',
                img: 'https://pbs.twimg.com/media/CZG0YqPWYAAqgEs.png',
                desc: 'a sports game',
                release: 'September 27, 2016',
                platform: 'Xbox One'
            }
            ]
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        localStorage.setItem('gameName', e.toUpperCase());
        setTimeout(() => { window.location = "http://localhost:3000/game/"; }, 250);
    }

    render() {
        let gameArr = this.state.gameList;
        return (
            <div className="App">

                <div className="App-header">
                    <h1>LFG</h1>
                </div>

                <h2 className="App-intro">
                    test
                </h2>

                <div className="container">
                    <div className='posterCase row'>

                        {gameArr.map((game) =>
                            <div className='card hoverable activator large col l4 m6 s12'>
                                <div className='card-image activator'>
                                    <img role="presentation" src={game.img} />
                                </div>
                                <a value={game.name} onClick={() => { this.handleClick(game.name) } }><h3 className="activator"> {game.name} </h3></a>
                                <p>Released: {game.release.replace(/00:00:00/, '')}</p>
                                <p>Platform: {game.platform} </p>
                                <p className="truncate">{game.desc}</p>
                                <div className="card-reveal activator">
                                    <span className="card-title">{game.name}</span>
                                    <p>{game.desc}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <footer></footer>
            </div>
        );
    }
}

export default Index;