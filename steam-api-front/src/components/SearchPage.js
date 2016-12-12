import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

//Search page for games, returns all games that have similar titles to the user search query.

class SearchPage extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      gameList: []
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(target) {
    localStorage.setItem('gameName', target);
  }


  componentDidMount() {
    const gameList = [];
    axios.get('/search/' + this.props.submission).then((res) => {
      for (let i=0;i<res.data.length;i++) {
        gameList.push(res.data[i])
      }
    }).then((res) => {
      this.setState({
        loading: false,
        gameList: gameList
      })
    })
  }

  render() {
    const gameArr = this.state.gameList;
    if (this.state.loading) {
      return <div className="progress container loader">
        <div className="indeterminate"></div>
      </div>
    }
    else {
      return (
        <div className="container">
          <h2 className="section"><i className="fa fa-search" aria-hidden="true"></i> SEARCH RESULTS</h2>

          {gameArr.map((game) =>
            <div>
              <ul className="collection">
                <li className="collection-item avatar">
                  <img role="presentation" src={game.img} className="circle" />
                  <span className="title"><Link onClick={() => { this.handleClick(game.name) } } to="/game/">{game.name}</Link></span>
                  <p className="truncate">{game.desc}</p>
                </li>
              </ul>
            </div>
          )}

        </div>
      )
    }
  }
}

export default SearchPage;