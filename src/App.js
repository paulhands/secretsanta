import React, { Component } from 'react';
import { peopleList } from './constants/constants';
import './App.css';

class App extends Component {
  constructor () {
    super();
    this.state = {
      currentlyShowing: null,
      toBePicked: peopleList,
      alreadyPicked: [],
      shuffling: false
    }
  }

  showMainName() {
    if (this.state.toBePicked.length === 0) {
      return 'All done! Merry Christmas!'
    }
    if (this.state.currentlyShowing) {
      return this.state.currentlyShowing;
    }
    return 'Press the button to begin!'
  }

  selectNext() {
    let random = Math.floor(Math.random() * this.state.toBePicked.length);
    if(random === this.state.toBePicked.length) {
      random--;
    }
    const newCurrentlyShowing = this.state.toBePicked[random];
    const newAlreadyPicked = [...this.state.alreadyPicked, newCurrentlyShowing];
    const newToBePicked = [...this.state.toBePicked.filter(name => name !== newCurrentlyShowing)];
    this.setState({
      currentlyShowing: newCurrentlyShowing,
      toBePicked: newToBePicked,
      alreadyPicked: newAlreadyPicked,
      shuffling: false
    });
  }

  shuffleNames() {
    if (this.state.toBePicked.length === 0) {
      return;
    }
    this.setState({
      ...this.state,
      shuffling: true
    });
    let myCount = 0;
    const myInterval = setInterval(() => {
      this.randomShow()
      myCount++
      if(myCount > 15) {
        clearInterval(myInterval);
        const mySlowInterval = setInterval(() => {
          this.randomShow();
          myCount++
          if(myCount>25) {
            clearInterval(mySlowInterval);
            const mySuperSlowInterval = setInterval(() => {
              this.randomShow();
              myCount++
              if(myCount>28) {
                clearInterval(mySuperSlowInterval);
                this.selectNext();
              }
            }, 900)
          }
        }, 600)
      }
    }, 300)
  }

  randomShow() {
    let random = Math.floor(Math.random() * this.state.toBePicked.length);
      if(random === this.state.toBePicked.length) {
        random--;
      }
      const newCurrentlyShowing = this.state.toBePicked[random];
      this.setState({
        ...this.state,
        currentlyShowing: newCurrentlyShowing,
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Secret Santa 2018</h1>
        </div>
        <p className="App-intro">
          The Handsie secret santa picker
        </p>
        <div className="App-body">
          <div className="to-be-selected">
          <div className="title">Yet to be picked!</div>
            {this.state.toBePicked.map((name, index) => {
              return <div key={index}>{name}</div>
            })}
          </div>
          <div className="middle-column">
            <div className={this.state.shuffling ? "currently-showing-shuffle" : "currently-showing-nonshuffle"}>
              {this.showMainName()}
            </div>
            <button className="go-button" disabled={this.state.shuffling} onClick={() => this.shuffleNames()}>GO!</button>
          </div>
          <div className="already-selected">
            <div className="title">Already given!</div>
            {this.state.alreadyPicked.map((name, index) => {
              return <div key={index}>{name}</div>
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
