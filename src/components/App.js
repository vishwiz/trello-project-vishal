import React, { Component } from "react";
import DisplayList from "./displayLists";
import AddList from "./addList";
import Api from "./api";
import "../componentCss/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.addBoardLists = this.addBoardLists.bind(this);
    this.deleteBoardLists = this.deleteBoardLists.bind(this);
    this.state = {
      boardData: {}
    };
  }
  componentDidMount() {
    Api.getBoardData()
      .then(res => res.json())
      .then(boardData => {
        this.setState({
          boardData
        });
      });
  }

  deleteBoardLists = listId => {
    let list = this.state.boardData;
    list.lists = list.lists.filter(data => data.id !== listId);
    return this.setState({
      boardData: {
        ...this.state.boardData,
        lists: this.state.boardData.lists.filter(data => data.id !== listId)
      }
    });
  };

  addBoardLists = newList => {
    let list = this.state.boardData;
    list.lists.push(newList);
    return this.setState({
      boardData: list
    });
  };

  render() {
    if (this.state.boardData.lists) {
      //  console.log(this.state.boardData)
      return (
        <section>
          <header>
            <h1>Yeh Karna Hai</h1>
          </header>

          <div className="board-data">
            {this.state.boardData.lists.map(boardListData => {
              // console.log(boardListData.id)
              return (
                <div>
                  <DisplayList
                    deleteBoardLists={this.deleteBoardLists}
                    listCardsDetails={boardListData.name}
                    listId={boardListData.id}
                    key={boardListData.id}
                  />
                </div>
              );
            })}
            <AddList
              addBoardLists={this.addBoardLists}
              boardLongId={this.state.boardData.id}
            />
          </div>
        </section>
      );
    } else return <div>Loading.....</div>;
  }
}

export default App;
