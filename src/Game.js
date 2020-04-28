import React from 'react';

/* Square
{
    display the value
}
*/
class Square extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            avalible:true
        }
        this.getValue = this.getValue.bind(this);
        this.id = this.props.id;
    }

    getValue(i){
        return this.props.value[i];
    }

    render(){
        return (
            <button className="square" onClick={()=>{
                this.props.onClick(this.id)
            }}>{this.getValue(this.id)}</button>
        );
    }
}


/*  Board
player name
*/ 

class Board extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            O : (this.props.Guest1 || "Guest1"),
            X : (this.props.Guest2 || "Guest2"),
        };
    }
    render(){
        var idArr = [new Array(3),new Array(3),new Array(3)];
        for(let i = 0; i < idArr.length;i++){
            for(let j = 0; j < idArr[i].length; j++){
                idArr[i][j] = i*3 + j;
            }
        }
        idArr = idArr.map(i=>
            <div style={{clear:'both'}} className="border-row" key ={i}>
                {i.map( j=> 
                <Square key={j} id={j} 
                        value={this.props.value} 
                        onClick = {this.props.onClick}
                />)}
                <br />
            </div>
        )

        return(
            <div>
                <h2>Now is <small>{this.Is_X_Turn? this.state.X : this.state.O}</small> turn</h2>
                <div style={{marginLeft:'33%'}}>
                    {idArr}
                    <br />
                </div>
            </div>
        );
    }
}


/*  Game
state{
    value: new Array(9)
    history: Array of value
    Is_X_Turn: Boolean
}

handle the value
win or loss

handle the history

*/
class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value:new Array(9),
            Is_X_Turn: false,
            winner: null
        };
        this.changeTheValue = this.changeTheValue.bind(this);
        this.determinWinOrNot = this.determinWinOrNot.bind(this);
    }
    
    changeTheValue(index){
        var newValue = this.state.value.slice(0);
        if(newValue[index] === 'X' || newValue[index] === 'O'){
            return;
        }
        newValue[index] = this.state.Is_X_Turn?"X":"O";
        let winOrNot = this.determinWinOrNot(index);
        if(winOrNot){
            this.setState({
                value:newValue,
                winner: this.state.Is_X_Turn?"X":"O"
            })
        }else{
            this.setState({
                value:newValue,
                Is_X_Turn: !this.state.Is_X_Turn,
            })
        }
    }

    determinWinOrNot(index){
        let values = this.state.value;
        let value = this.state.Is_X_Turn?"X":"O";
        for(let situation in square_bind_win_situation[index]){
            let winOrNot = true;
            situation = square_bind_win_situation[index][situation];
            for(let i in situation){
                i = situation[i];
                if( i !== index && values[i] !== value){
                    winOrNot = false;
                    break
                }
            }
            if(winOrNot)
                return winOrNot;
        }
        return false;
    }

    render(){
        if(this.state.winner){
            return(
                <div className = "GameView">
                    <Board value={this.state.value} onClick={this.changeTheValue}/>
                    <h1>{this.state.winner} is WIN </h1>
                </div>
            )
        }else{
            return(
                <div className = "GameView">
                    <Board value={this.state.value} onClick={this.changeTheValue}/>
                </div>
            );
        }
    }
}

/*
The Win situation
*/
const win_situation = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const square_bind_win_situation = [
    [
        win_situation[0],win_situation[3],win_situation[6]
    ],
    [
        win_situation[0],win_situation[4],
    ],
    [
        win_situation[0],win_situation[5],win_situation[7]
    ],
    [
        win_situation[1],win_situation[3],
    ],
    [
        win_situation[1],win_situation[4],win_situation[6],win_situation[7]
    ],
    [
        win_situation[1],win_situation[5]
    ],
    [
        win_situation[2],win_situation[3],win_situation[7]
    ],
    [
        win_situation[2],win_situation[4]
    ],
    [
        win_situation[2],win_situation[5],win_situation[6]
    ]
]


export default Game;