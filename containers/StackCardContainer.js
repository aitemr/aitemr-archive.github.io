import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import StackCard from '../components/StackCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 18px;
`;

const ButtonsContainer = styled.div`
  color: ${props => props.theme.colors.fontColor};
  display: flex;
  justify-content: space-between;
  width: 150px;
  margin-top: 16px;
`;

const ControlButton = styled.a`
  color: ${props => props.theme.colors.fontColor};
  text-decoration: underline;
  text-decoration-color: ${props => props.theme.colors.primaryColor};
  user-select: none;
  :hover {
    font-weight: bold;
    cursor: pointer;
  }
`;

class StackCardContainer extends Component {
  state = {
    cards: {},
    topCardIndex: 0,
    currentIndex: 1,
    bottomCardIndex: 0,
    disabled: false
  };

  componentDidMount = () => {
    const { maxVisibleCards, transformScaleStep, shadow } = this.props;

    const childrenArray = React.Children.toArray(this.props.children);

    const opacityStep = maxVisibleCards
      ? 1 / maxVisibleCards
      : 1 / childrenArray.length;

    const cardsArray = childrenArray
      .reverse()
      .map((children, index) => ({
        zIndex: childrenArray.length - index,
        transformScale:
          index < maxVisibleCards
            ? 1 - transformScaleStep * index
            : 1 - transformScaleStep * (maxVisibleCards - 1),
        translateX: 0,
        opacity: index < maxVisibleCards ? 1 - opacityStep * index : 0,
        boxShadow: index < maxVisibleCards && shadow,
        children
      }))
      .reverse();

    const cards = Object.assign({}, cardsArray);

    this.setState({ cards, cardsArray, topCardIndex: cardsArray.length - 1 });
  };

  handleNextButtonClick = () => {
    const {
      cards,
      cardsArray,
      topCardIndex,
      bottomCardIndex,
      currentIndex
    } = this.state;
    const { cardShift, animationDuration } = this.props;

    this.setState(
      {
        disabled: true,
        cards: {
          ...cards,
          [topCardIndex]: {
            ...cards[topCardIndex],
            translateX: cardShift
          }
        }
      },
      () => {
        const updatedCards = cardsArray.map(
          (card, index) =>
            index === topCardIndex
              ? {
                  ...cards[bottomCardIndex],
                  translateX: 0
                }
              : {
                  ...cards[(index + 1) % cardsArray.length],
                  translateX: 0
                }
        );

        setTimeout(() => {
          this.setState({ cards: Object.assign({}, updatedCards) }, () => {
            this.setState({
              topCardIndex:
                topCardIndex === 0 ? cardsArray.length - 1 : topCardIndex - 1,
              bottomCardIndex: topCardIndex,
              disabled: false,
              currentIndex: (currentIndex % cardsArray.length) + 1
            });
          });
        }, animationDuration);
      }
    );
  };

  handlePreviousButtonClick = () => {
    const {
      cards,
      cardsArray,
      topCardIndex,
      bottomCardIndex,
      currentIndex
    } = this.state;
    const { cardShift, animationDuration } = this.props;

    const updatedCards = cardsArray.map(
      (card, index) =>
        index === bottomCardIndex
          ? {
              ...cards[topCardIndex],
              translateX: -1 * cardShift,
              zIndex: cards[bottomCardIndex].zIndex
            }
          : {
              ...cards[index === 0 ? cardsArray.length - 1 : index - 1],
              translateX: 0
            }
    );

    this.setState(
      {
        disabled: true,
        cards: Object.assign({}, updatedCards)
      },
      () => {
        setTimeout(() => {
          this.setState(
            {
              cards: {
                ...this.state.cards,
                [bottomCardIndex]: {
                  ...this.state.cards[bottomCardIndex],
                  translateX: 0,
                  zIndex: cardsArray.length
                }
              }
            },
            () =>
              this.setState({
                topCardIndex: bottomCardIndex,
                bottomCardIndex:
                  bottomCardIndex === cardsArray.length - 1
                    ? 0
                    : bottomCardIndex + 1,
                disabled: false,
                currentIndex:
                  currentIndex === 1 ? cardsArray.length : currentIndex - 1
              })
          );
        }, animationDuration);
      }
    );
  };

  render() {
    const { cardsArray, cards, disabled, currentIndex } = this.state;
    const {
      maxVisibleCards,
      transformScaleStep,
      animationDuration,
      width,
      height
    } = this.props;

    return (
      <Container>
        <StackCard
          cardsArray={cardsArray}
          cards={cards}
          width={width}
          height={height}
          transformScaleStep={maxVisibleCards}
          maxVisibleCards={transformScaleStep}
          animationDuration={animationDuration}
        />
        <ButtonsContainer>
          <ControlButton
            onClick={!disabled ? this.handlePreviousButtonClick : null}
          >
            {'<'} prev
          </ControlButton>
          {currentIndex}/{React.Children.toArray(this.props.children).length}
          <ControlButton
            onClick={!disabled ? this.handleNextButtonClick : null}
          >
            next {'>'}
          </ControlButton>
        </ButtonsContainer>
      </Container>
    );
  }
}

StackCardContainer.propTypes = {
  children: PropTypes.node.isRequired,
  maxVisibleCards: PropTypes.number,
  transformScaleStep: PropTypes.number,
  cardShift: PropTypes.number,
  animationDuration: PropTypes.number,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  shadow: PropTypes.string
};

StackCardContainer.defaultProps = {
  maxVisibleCards: 3,
  transformScaleStep: 0.1,
  cardShift: 150,
  animationDuration: 300,
  shadow: '0 5px 15px 0 rgba(0, 0, 0, 0.1)'
};

export default StackCardContainer;
