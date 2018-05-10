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
      intervalInSeconds: 5,
      timeLeftInSeconds: 5,
      intervalId: null,
      img: "https://storage.googleapis.com/russellmschmidt-net-portfolio/word-reverse/stockshit/",
      bossImg: "https://storage.googleapis.com/russellmschmidt-net-portfolio/word-reverse/stockshit/" + Math.floor(Math.random() * 32) + ".jpg",
      canThreshold: 0.8,

    }
  }
  componentWillMount() {
    const words = wordsArray.filter(w => !!w.match(/^.{2}/i))
    const word = words[Math.floor(Math.random() * words.length)]
    this.setState({
      targetWord: word, 
      targetWordLength: word.length
    })
  }
  componentDidMount() {
    let intervalId = setInterval(this.timer, 1000);
    this.setState({intervalId: intervalId})
  }
  calculateAccuracy = (guess, answer) => {
    let accuracyScore = 0.0
    // see if all the letters are present
    const guessMatch = this.calculateMatches(guess, answer)
    const answerMatch = this.calculateMatches(answer, answer)
    return guessMatch / answerMatch < 1 ? guessMatch / answerMatch : 1 / (guessMatch / answerMatch)
  }
  calculateMatches = (guess, answer) => {
    let matches = 0
    const iterateLength = guess.length > answer.length ? answer.length : guess.length
    for (var i = 0; i < iterateLength; i++) {
      const char = guess.charAt(i)
      const regex = new RegExp(char, "gi") 
      if (answer.match(regex)) {
        matches += answer.match(regex).length
      }
    }
    return matches
  }
  compareGuess = (guess) => {
    const winrar = this.state.targetWord
    if (winrar === guess) {
      this.setState({
        accuracy: (this.state.accuracy * this.state.level + 1) / (this.state.level + 1), 
        level: this.state.level + 1
      }, this.nextLevel())
    } else {
      const accuracyLast = this.calculateAccuracy(guess, winrar)
      const accuracyLifetime = (this.state.accuracy * this.state.level + accuracyLast) / (this.state.level + 1)
      
      this.setState({
        level: this.state.level + 1,
        accuracy: accuracyLifetime
      })

      if (accuracyLifetime < this.state.canThreshold) {
        alert("I am sorry. We are going to have to let you go")
        this.handleLoss()
      } else {
        this.nextLevel()
      }
    }
  }
  handleLoss = () => {
    alert("We have another temporary engagement opening up. Ready?")
    this.setState({
      level: 1,
      accuracy: 1,
    }, this.nextLevel())
  }
  displayWord() {
    return (
      <div>
        <h1>{this.state.targetWord}</h1>
      </div>
    )
  }
  goodBoy() {
    const img = this.state.img + "9.jpg"

    return (
      <div className="game-bossImage__container-right">
        <figure>
          <img 
            className="game-bossImage" 
            src={img} 
            alt="douche boss" />
          <figcaption>Great job keep it up</figcaption>
        </figure>
      </div>
    )
  }
  displayBoss = () => {
    const img = this.state.bossImg
    return (
      <div className="game-bossImage__container">
        <figure>
          <img
            className="game-bossImage" 
            alt="bosshole"
            src={img}
            />
          <figcaption>"Hmm... I think you can do better."</figcaption>
        </figure>
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
    let intervalId = setInterval(this.timer, 1000);
    this.generateNewWord()
    this.setState({
      timeLeftInSeconds: this.state.intervalInSeconds, 
      intervalId: intervalId
    })
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
    if (timeLeft <= 0) {
      clearInterval(this.state.intervalId)
      this.setState({timeLeftInSeconds: 0})
      this.compareGuess(this.state.guessWord)
      this.handleClear()
      return
    } else {
      this.setState({timeLeftInSeconds: timeLeft})
    }
  }
  handleClear = () => {
    this.setState({ guessWord: '' })
  }
  handleInput = (e) => {
    this.setState({guessWord: e.target.value})
  }
  render () {
    return (
      <div className="game-page__main">
        <GamePageTitle />
        <h4>Accuracy: {this.round(this.state.accuracy * 100, 5)}% --- Level: {this.state.level}</h4>
        <h3>Time Left on Task: {this.state.timeLeftInSeconds}</h3>
        {this.displayWord() && <h3 className="game-word__reverse game-page__text">{this.displayWord()}</h3>}
       
        <input 
          className="game-input game-page__text"
          type="text" 
          value={this.state.guessWord} 
          onChange={this.handleInput} 
        />
        <div>
          <button className="button" onClick={this.handleClear}>Clear</button>
        </div>
        { this.state.accuracy < 0.9 ? this.displayBoss() : this.goodBoy()}
       
      </div>
    )
  }
}

export default GamePage