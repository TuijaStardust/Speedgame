import React, {Component} from 'react';
import './App.css';
import Circle from './Circle/Circle'
import GameOver from './GameOver/GameOver'

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


class App extends Component {
  state = {
    score: 0,
    current: 0,
    rounds: 0,
    showGameOver: false
  };

  pace = 1500;
  timer = undefined;

  next = () => {

    let nextActive = undefined;
  
    if (this.state.rounds >= 5) {
      this.endHandler()
    }

    do {
      nextActive = getRndInteger(1, 4);
    } while (nextActive === this.state.current)

    this.setState({
      current: nextActive,
    })

    this.pace *= 0.95;
    this.timer = setTimeout(this.next.bind(this), this.pace)

    this.setState({
        rounds: this.state.rounds + 1
      })

    console.log(this.state.rounds) 
  }

  clickhandler = (btnId) => {
    console.log('wow!', btnId)

    if ( this.state.current !== btnId) {
      this.endHandler()
      return;
    }

    this.setState({
      score: this.state.score + 1
    })

    this.setState({
      rounds: 0
    })
  }

  startHandler = () => {
    this.next()
  }

  endHandler = () => {
    clearTimeout(this.timer)
    this.setState({
      showGameOver: true})
  }

  render() {
    return (
      <div>
        <h1>Nopeuspeli</h1>
        <p>Your score is: {this.state.score}</p>

          <Circle 
            buttonColor='yellow' 
            active={this.state.current === 1}
            click={() => this.clickhandler(1)}
          />
          <Circle 
            buttonColor='lightgreen' 
            active={this.state.current === 2}
          click={() => this.clickhandler(2)}/>
          <Circle 
            buttonColor='blue' 
            active={this.state.current === 3}          
          click={() => this.clickhandler(3)}/>
          <Circle 
            buttonColor='tomato' 
            active={this.state.current === 4}          
          click={() => this.clickhandler(4)}/>
        
        <div>
          <button onClick={this.startHandler}>Start Game</button>
          <button onClick={this.endHandler}>End Game</button>
        </div>

        {this.state.showGameOver && <GameOver score={this.state.score}  />}

      </div>
    );
  } 
};

export default App;
