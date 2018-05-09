import React from 'react'
import GameInstructions from './GameInstructions'
import GamePage from './GamePage'

class GameStart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showInstructions: false,
      showGame: false,
    }
  }
  showStartButton() {
    return (
      <div>
        <h3>Ready to Compartmentalize?</h3>
        <button onClick={() => this.setState({showInstructions: true})}>Start Game</button>
      </div>
    )
  }
  showInstructions() {
    return (
      <div>
        <GameInstructions />
        <button onClick={() => this.setState({showGame: true})}>Start Game</button>
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
        {(this.state.showInstructions && !this.state.showGame) ? this.showInstructions() : ''}
        {(this.state.showGame) ? this.startGame() : ''}
      </div>
    )
  }
}

export default GameStart