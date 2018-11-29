import React, { Component } from 'react';
import circle from './circle.svg';
import cross from './cross.svg';
import './App.css';

// Component for displaying current scores
function ScoreCount(props) {
  return(
    <div>
      <p> Results </p>
      <p> X: {props.x} </p>
      <p> O: {props.y} </p>
      <p> Draws: {props.d} </p>
    </div>
  );
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      board : ['', '', '', '', '', '', '', '', ''],
      xsTurn: true,
      end: false,
      xWinsCount: 0,
      oWinsCount: 0,
      draws: 0,
      msg: ''
    };
  }

  // Empty the board and reset state
  playAgain = () => {

    var elements = document.getElementsByClassName("board-sqr");

    for(var i = 0; i < elements.length; i++) {
      var node = elements[i];

      while (node.firstChild) {
          node.removeChild(node.firstChild);
      }
    }

    this.setState({
      board : ['', '', '', '', '', '', '', '', ''],
      xsTurn: true,
      end: false,
      msg: ""
    });
  }

  // Resetting the scores
  resetScore = () => {
    this.setState({
      xWinsCount: 0,
      oWinsCount: 0,
      draws: 0
    })
  }


  // Check for win or draw
  checkIfEnd = (board, turn) => {

    var symbol = (turn === true) ? "X" : "O";

    // horizontal check
    if(board[0] === symbol && board[1] === symbol && board[2] === symbol) return "win";
    if(board[3] === symbol && board[4] === symbol && board[5] === symbol) return "win";
    if(board[6] === symbol && board[7] === symbol && board[8] === symbol) return "win";


    // vertical check
    if(board[0] === symbol && board[3] === symbol && board[6] === symbol) return "win";
    if(board[1] === symbol && board[4] === symbol && board[7] === symbol) return "win";
    if(board[2] === symbol && board[5] === symbol && board[8] === symbol) return "win";

    // diagonal check
    if(board[0] === symbol && board[4] === symbol && board[8] === symbol) return "win";
    if(board[2] === symbol && board[4] === symbol && board[6] === symbol) return "win";

    for(var i = 0; i < board.length; i++) {
      if(board[i] === '') {
        return "inProgress";
      }
    }

    return "draw";
  }


  // Add X or O to board
  add_x_or_o = (e, v) => {

    // Prevent actions when game is over
    if(this.state.end === true) {
      return;
    }

    var board = this.state.board;
    var xturn = this.state.xsTurn;

    (xturn === true) ? board[v] = 'X' : board[v] = 'O';

    var DOM_img;
    var elem = e.target;

    if(xturn === true) {
      DOM_img = document.createElement("img");
      DOM_img.src = cross;
      elem.appendChild(DOM_img);
    }
    else {
      DOM_img = document.createElement("img");
      DOM_img.src = circle;
      elem.appendChild(DOM_img);
    }

    var isEnd = this.checkIfEnd(board, xturn);

    if(isEnd === "inProgress") {
      this.setState({
        board: board,
        xsTurn: !this.state.xsTurn
      });
    }

    else if(isEnd === "win") {

      if(this.state.xsTurn === false) {
        this.setState({
          end: true,
          oWinsCount: this.state.oWinsCount + 1,
          msg: "O wins"
        });
      }
      else {
        this.setState({
          end: true,
          xWinsCount: this.state.xWinsCount + 1,
          msg: "X wins"
        });
      }

    }
    else {
      this.setState({
        end: true,
        draws: this.state.draws + 1,
        msg: "Draw"
      });
    }
  }

  render() {

    var msg;

    if(this.state.end === true) {
      msg = this.state.msg;
    }
    else {
      msg = (this.state.xsTurn === true) ? <p> X's turn </p> : <p> O's turn </p>;
    }

    return (

      <div>

        <div style = {{float: "left", margin: "20px"}}>
          <div className="board-row">
            <div className="board-sqr" id="sq1" onClick= { (e, v) => {this.add_x_or_o(e,0)} }> </div>
            <div className="board-sqr" id="sq2" onClick= { (e, v) => {this.add_x_or_o(e,1)} }> </div>
            <div className="board-sqr" id="sq3" onClick= { (e, v) => {this.add_x_or_o(e,2)} }> </div>
          </div>

          <div className="board-row">
            <div className="board-sqr" id="sq4" onClick= { (e, v) => {this.add_x_or_o(e,3)} }> </div>
            <div className="board-sqr" id="sq5" onClick= { (e, v) => {this.add_x_or_o(e,4)} }> </div>
            <div className="board-sqr" id="sq6" onClick= { (e, v) => {this.add_x_or_o(e,5)} }> </div>
          </div>

          <div className="board-row">
            <div className="board-sqr" id="sq7" onClick= { (e, v) => {this.add_x_or_o(e,6)} }> </div>
            <div className="board-sqr" id="sq8" onClick= { (e, v) => {this.add_x_or_o(e,7)} }> </div>
            <div className="board-sqr" id="sq9" onClick= { (e, v) => {this.add_x_or_o(e,8)} }> </div>
          </div>

          <p> {msg} </p>

        </div>

        <div style = {{float: "left", margin: "10px"}}>

          <button onClick={this.resetScore}> reset score </button>

          <ScoreCount x = {this.state.xWinsCount} y = {this.state.oWinsCount} d = {this.state.draws}/>

          {this.state.end ?
              <div>
                <button onClick={this.playAgain}> play again </button>
              </div>
          : ''}

        </div>

      </div>
    );
  }
}

export default App;
