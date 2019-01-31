import React, { Component } from "react";
import Api from "./api";

class AddCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };
  }

  inputValueHandler = event => {
    this.setState({
      inputValue: event.target.value
    });
  };

  addCard = event => {
    event.preventDefault();
    Api.addNewCard(this.state.inputValue, this.props.listId)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.props.addCard(data);
        return this.setState({
          inputValue: ""
        });
      });
  };
  render() {
    return (
      <form onSubmit={this.addCard}>
        <input
          value={this.state.inputValue}
          onChange={this.inputValueHandler}
          placeholder="Type ....."
        />
      </form>
    );
  }
}

export default AddCards;
