import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      seconds: 10
    };
  }

  fetchPokemon() {
    

    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        
        
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name
          
        })
      })
      
      .catch((err) => console.log(err))
  

    
  
    this.myInterval = setInterval(() => {
        const { seconds } = this.state

        if (seconds > 0) {
            this.setState(({ seconds }) => ({
                seconds: seconds - 1
            }))
        }

    }, 1000)
  }


// componentWillUnmount(){
//   clearInterval(this.myInterval)

// };
  
  render() {
    const { seconds } = this.state
    return (
      
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()} >Start!</button>
       
        <h1 className={'timer'} >   {  seconds === 0
                    ? <div className={'pokeWrap'}>
                    <img className={'pokeImg'} src={this.state.pokeSprite} />
                    <h1 className={'pokeName'}>{this.state.pokeName}</h1>
                  </div>
                    : <div><h1>Time Remaining: :{seconds < 10 ? `0${seconds}` : seconds}</h1> <div className={'pokeWrap'}>
                    <img className={'pokeImgHide'} src={this.state.pokeSprite} />
                    <h1 className={'pokeNameHide'}>{this.state.pokeName}</h1>
                  </div></div>
                }</h1>
       
      </div>
    )
  }
}



export default PokeFetch;