import React from 'react'
import wordsArray from 'an-array-of-english-words'
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
    const words = wordsArray.filter(w => !!w.match(/^.{10}/i))
    const word = words[Math.floor(Math.random() * words.length)]
    this.setState({
      targetWord: word, targetWordLength: word.length
    })
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
  displayWord() {
    return (
      <div>
        <h1>{this.state.targetWord}</h1>
      </div>
    )
  }
  generateNewWord = () => {
    const words = wordsArray.filter(w => !!w.match(/^.{10}/i))
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
  round(number, precision) {
    var shift = function (number, precision) {
      var numArray = ("" + number).split("e");
      return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
    };
    return shift(Math.round(shift(number, +precision)), -precision);
  }
  timer = () => {
    let timeLeft = this.state.timeLeftInSeconds - 1
    if (timeLeft >= 0) {
      this.setState({timeLeftInSeconds: timeLeft})
    } else {
      clearInterval(this.state.intervalId)
    }
  }
  handleClear = () => {
    this.setState({ guessWord: '' })
  }
  handleInput = (e) => {
    this.setState({guessWord: e.target.value}, this.compareGuess(e.target.value))
  }
  render () {
    return (
      <div className="game-page__main">
        <GamePageTitle />
        <h4>Accuracy: {this.round(this.state.accuracy * 100, 5)}% --- Level: {this.state.level}</h4>
        <h3>Time Left on Task: {this.state.timeLeftInSeconds}</h3>
        {this.displayWord() && <h1 className="game-word__reverse">{this.displayWord()}</h1>}
       
        <input 
          className="game-input"
          type="text" 
          value={this.state.guessWord} 
          onChange={this.handleInput} 
        />
        <div>
          <button className="button" onClick={this.handleClear}>Clear</button>
        </div>
       
      </div>
    )
  }
}

export default GamePage