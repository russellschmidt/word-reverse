import React from 'react'
import Faker from 'faker'
import GameInstructions from './GameInstructions'
import GamePage from './GamePage'

class GameStart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showInstructions: false,
      showGame: false,
      img: "https://storage.googleapis.com/russellmschmidt-net-portfolio/word-reverse/stockshit/1.jpg",
      img2: "https://storage.googleapis.com/russellmschmidt-net-portfolio/word-reverse/stockshit/"
    }
  }
  showStartButton() {
    return (
      <div>
        <h2>Welcome to {Faker.company.companyName()}'s {Faker.commerce.department()} Division</h2>
        <h3>We {Faker.company.bsBuzz()} {Faker.company.bsAdjective()} {Faker.company.bsNoun()}: "{Faker.company.catchPhrase()}"</h3>
        <div>
        <button onClick={() => this.setState({showInstructions: true})}>Start your career</button>
        </div>
        <img src={this.state.img}/>
      </div>
    )
  }
  showInstructions() {
    return (
      <div>
        <GameInstructions />
        <div>
          <button onClick={() => this.setState({showGame: true})}>Start Game</button>
        </div>
        <img src={this.state.img2 + Math.floor(Math.random() * 32) + ".jpg"} />
      </div>
    )
  }
  startGame() {
    return (
      <div>
        <GamePage />
      </div>
    )
  }
  render() {
    return (
      <div>
        {(!this.state.showInstructions) ? this.showStartButton() : ''}
        {(this.state.showInstructions && !this.state.showGame) ?  this.showInstructions() : ''}
        {(this.state.showGame) ? this.startGame() : ''}
      </div>
    )
  }
}

export default GameStart