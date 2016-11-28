import React, {Component} from 'react';

class Poster extends Component {

    render(){
        return(
            <div className='card hoverable large col l4 m6 s12'>
                <div className='card-image'>
                  <img src={game.img} />
                </div>
                <h3> {game.name} </h3>
                <p>{game.year}</p>
                <span>{game.desc}</span>
            </div>
        )
    }
}