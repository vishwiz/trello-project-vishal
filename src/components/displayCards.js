import React, { Component } from "react";
import "../componentCss/displayCards.css";
import CheckList from "./checkList";
import DeleteCards from "./deleteCards";
import AddCards from "./addCards";
import Api from "./api";

class DisplayCards extends Component {
  constructor(props) {
    super(props);
    this.deleteCard = this.deleteCard.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.state = {
      listCardData: [],
      showPopup: false,
      currentCardId: ""
    };
  }

  componentDidMount() {
    Api.getBoardCard()
      .then(res => res.json())
      .then(listCardData => {
        this.setState({
          listCardData
        });
      });
  }

  addCard = newList => {
    let list = this.state.listCardData;
    list.push(newList);
    return this.setState({
      listCardData: list
    });
  };

  deleteCard = cardId => {
    let card = this.state.listCardData;
    card = card.filter(data => data.id !== cardId);
    return this.setState({
      listCardData: card
    });
  };
  togglePopup(cardId) {
    console.log(cardId);
    this.setState({
      showPopup: !this.state.showPopup,
      currentCardId: cardId
    });
  }

  render() {
    let listId = this.props.listId;
    if (this.state.listCardData.length !== 0) {
      return (
        <div>
          <div className="fixed-cards">
            {this.state.listCardData.map(cardDetails => {
              let newCardId = cardDetails.id;
              return (
                <div>
                  <div className="cards">
                    {cardDetails.idList === listId ? (
                      <p>
                        <div className="card-click">
                          {this.state.showPopup ? (
                            <CheckList
                              closePopup={this.togglePopup}
                              cardId={this.state.currentCardId}
                            />
                          ) : null}
                          <div
                            className="cards-title"
                            onClick={e => this.togglePopup(newCardId)}
                          >
                            {cardDetails.name}{" "}
                          </div>{" "}
                        </div>
                        <div className="card-delete">
                          <DeleteCards
                            cardId={cardDetails.id}
                            deleteCard={this.deleteCard}
                          />
                        </div>
                      </p>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="card-input">
            <AddCards listId={listId} addCard={this.addCard} />
          </div>
        </div>
      );
    } else return null;
  }
}

export default DisplayCards;
