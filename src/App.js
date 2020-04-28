import React from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './Game';


const page = {
  WELCOME:"Welcome_Page",
  GAME:"Game_Page",
  TODO:"TODO_list_Page"
}

class App extends React.Component{
  constructor(props){
    super(props);
    this.handlePage = this.handlePage.bind(this);
    this.state={
      view:page.WELCOME,
    };
  }

  handlePage(p){
    for(let i in page){
      if(p === page[i]){
        this.setState({
          view:p,
        })
        break;
      }
    }
  }

  render(){
    let view = this.state.view;
    switch(view){
      case page.WELCOME:
        return (
          <div className="App">
            <WelcomePage onClick = {this.handlePage}/>
          </div>
        );
      case page.GAME:
        return(
          <div className="App">
            <GamePage onClick = {this.handlePage}/>
          </div>
        )
      case page.TODO:
        return(
          <div className="App">
            <TodoPage onClick = {this.handlePage}/>
          </div>
        )
      default:
        alert("App.state.view is wrong")
        break;

      
    }
  }
}


class WelcomePage extends React.Component{
  render(){
    return(
          <header className="App-header">
            <Clock />
            <img src={logo} className="App-logo" alt="logo" />
            <div>
              <button className="App_b" onClick={()=>{this.props.onClick(page.GAME)}}>
                Start Game 
              </button>
              <button className="App_b" onClick={()=>{this.props.onClick(page.TODO)}}>
                ToDo List 
              </button>
            </div>
          </header>
    )
  }
}

class GamePage extends React.Component{
  render(){
    return(
      <header className="App-header">
            <h1>GAME</h1> 
            <div>
              <Game />
              <button className="App_b" onClick={()=>{this.props.onClick(page.WELCOME)}}>
                  HOME PAGE
              </button>
              <button className="App_b" onClick={()=>{this.props.onClick(page.TODO)}}>
                  ToDo List 
              </button>
            </div>
      </header>
    )
  }
}

class TodoPage extends React.Component{
  render(){
    return(
      <header className="App-header">
            <h1>ToDo List</h1> 
            <div>
              <button className="App_b" onClick={()=>{this.props.onClick(page.WELCOME)}}>
                  HOME PAGE
              </button>
              <button className="App_b" onClick={()=>{this.props.onClick(page.GAME)}}>
                Start Game 
              </button>
            </div>
      </header>
    )
  }
}


class Clock extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      date: new Date(),
    }
    this.tick = this.tick.bind(this);
  }
  tick(){
    this.setState({
      date: new Date(),
    });
  }

  componentDidMount(){
    this.timerID = setInterval(this.tick,1000);
  }

  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  render(){
    return (
      <h1 className="Time">{this.state.date.toLocaleTimeString()}</h1>
    )
  }
}

export default App;
