import React, { Component } from "react";
import Api from "./api";
import "../componentCss/addList.css";
class AddList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };

    console.log(this.props);
  }

  inputValueHandler = event => {
    // console.log(this, 'inputValuehandler')
    this.setState({
      inputValue: event.target.value
    });
  };

  addNewList = event => {
    event.preventDefault();
    Api.addList(this.state.inputValue, this.props.boardLongId)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.props.addBoardLists(data);
        return this.setState({
          inputValue: ""
        });
      });
  };
  render() {
    return (
      <form className="add-list-input" onSubmit={this.addNewList}>
        <input
          value={this.state.inputValue}
          onChange={this.inputValueHandler}
          placeholder="ADD LIST"
        />
      </form>
    );
  }
}

export default AddList;
