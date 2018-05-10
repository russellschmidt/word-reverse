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
      img2: "https://storage.googleapis.com/russellmschmidt-net-portfolio/word-reverse/stockshit/",
      companyName: ''
    }
  }
  componentWillMount() {
    this.setState({companyName: Faker.company.companyName()})
  }
  showStartButton() {
    return (
      <div>
        <div className="game-start__textContainer">
          <h3>Are <b>YOU</b> ready to see what it takes to make it in the corporate world! Time to get specialized and shaped-up... T-shaped up!</h3>
          <h2>Welcome to {this.state.companyName}'s {Faker.commerce.department()} Division</h2>
          <h3>We {Faker.company.bsBuzz()} {Faker.company.bsAdjective()} {Faker.company.bsNoun()}: "{Faker.company.catchPhrase()}"</h3>
          <div>
            <button 
              className="button" 
              onClick={() => this.setState({showInstructions: true})}
            >Start your career</button>
          </div>
          <img src={this.state.img} alt="main stock photo of losers in an empty room"/>
        </div>
      </div>
    )
  }
  showInstructions() {
    return (
      <div className="game-instructions__textContainer">
        <div>
          <GameInstructions />
          <div>
            <button 
              className="button"
              onClick={() => this.setState({showGame: true})}
            >Start Game</button>
          </div>
          <div>
            <p className="game-instructions__disclaimer"><super>*</super>Team membership should not be construed as an offer of employment nor change of inependent contractor status. Thank you for your interest in {this.state.companyName}.</p>
          </div>
        </div>
        <div>
          <img
            className="game-instructions__image" 
            src={this.state.img2 + "9.jpg"} 
            alt="friendly whiteboy coming to help you with your soul crushing job"
          />
        </div>
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
  reStart = () => {
    this.setState({
      showInstructions: false,
      showGame: false,
    })
  }
  render() {
    return (
      <div>
        <header className="header">
          <button className="header-title header-title-1" onClick={() => this.reStart()}>wordreverse</button>
          <button onClick={() => this.reStart()} className="game-title__text game-title__reverse-3 header-title header-title__shadow">wordreverse</button>
        </header>
        {(!this.state.showInstructions) ? this.showStartButton() : ''}
        {(this.state.showInstructions && !this.state.showGame) ?  this.showInstructions() : ''}
        {(this.state.showGame) ? this.startGame() : ''}
      </div>
    )
  }
}

export default GameStart