import React, { Component } from "react";
import Api from "./api";

class DeleteCards extends Component {
  deleteCards = () => {
    this.props.deleteCard(this.props.cardId);
    Api.deleteBoardCard(this.props.cardId)
      .then(res => res.json())
      .then(data => console.log(data));
  };
  render() {
    return <button onClick={this.deleteCards}>x</button>;
  }
}

export default DeleteCards;
