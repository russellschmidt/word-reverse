import React from 'react'
import GamePageTitle from './GamePageTitle'

class GamePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      targetWord: '',
      guessWord: '',
      targetWordLength: 0,
      accuracy: 1.00,
      level: 1,
      timeLeftInSeconds: 4,
      intervalId: null,
    }
  }
  componentDidMount() {
    let intervalId = setInterval(this.timer, 1000);
    this.setState({intervalId: intervalId})
  }
  componentWillMount() {
    const words = ["friend", "dangle", "happy"]
    const word = words[Math.floor(Math.random() * words.length)]
    this.setState({
      targetWord: word, targetWordLength: word.length
    })
  }
  timer = () => {
    let timeLeft = this.state.timeLeftInSeconds - 1
    if (timeLeft >= 0) {
      this.setState({timeLeftInSeconds: timeLeft})
    } else {
      clearInterval(this.state.intervalId)
    }
  }
  calculateAccuracy = (guess, answer) => {
    // see if all the letters are present
    return 0.8
    // see if the letters are in the right order
  }
  compareGuess = (guess) => {
    const winrar = this.state.targetWord
    if (winrar) {
      if (guess === winrar) {
        // do win stuff - calc accuracy, next level
        this.setState({
          accuracy: (this.state.accuracy * this.state.level + 1) / (this.state.level + 1), 
          level: this.state.level + 1
        }, this.nextLevel())
      } else if (guess.length === winrar.length) { 
        const lastAccuracy = this.calculateAccuracy(guess, winrar)
        this.setState({
          accuracy: ((this.state.accuracy * this.state.level + lastAccuracy) / (this.state.level + 1)), 
          level: this.state.level + 1
        }, this.nextLevel())
        if (this.state.accuracy < .8) {
          // losing condition
          alert(`I'm sorry, we are going to have to let you go.`)
        } else {
          // keep going
        }
      } 
    }
  }
  generateNewWord = () => {
    const words = ['youth code', 'the damned', 'joy division', 'the pixies']
    const word = words[Math.floor(Math.random() * words.length)]
    this.setState({
      targetWord: word, targetWordLength: word.length
    })
  }
  nextLevel = () => {
    this.generateNewWord()
    this.setState({timeLeftInSeconds: 4})
    let intervalId = setInterval(this.timer, 1000);
    this.setState({intervalId: intervalId})
  }
  displayWord() {
    return (
      <div>
        <h1>{this.state.targetWord}</h1>
      </div>
    )
  }
  handleInput = (e) => {
    this.setState({guessWord: e.target.value}, this.compareGuess(e.target.value))
  }
  render () {
    return (
      <div className="game-page__main">
        <GamePageTitle />
        <h4>Accuracy: {this.state.accuracy * 100}% | Level: {this.state.level}</h4>
        <h3>Time Left on Task: {this.state.timeLeftInSeconds}</h3>
        {this.displayWord() && <h1 className="game-word__reverse">{this.displayWord()}</h1>}
       
          <input type="text" 
            value={this.state.guessWord} 
            onChange={this.handleInput} 
          />
       
      </div>
    )
  }
}

export default GamePage