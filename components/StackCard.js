import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Card = styled.div.attrs({
  style: p => ({
    zIndex: p.zIndex,
    transform: `translateX(${p.translateX}px) scale(${p.transformScale})`,
    opacity: p.opacity,
    boxShadow: p.boxShadow
  })
})`
  width: ${p => (p.width ? `${p.width}px` : '100%')};
  height: ${p => (p.height ? `${p.height}px` : '100%')};
  transition: ${p => `all ${p.animationDuration}ms ease-in-out;`};

  border-radius: 5px;
  position: absolute;
  transform-origin: 50% -50%;

  & > * {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: inherit;
  }
`;

const CardContainer = styled.div`
  position: relative;
  width: ${p => (p.width ? `${p.width}px` : '100%')};
  height: ${p => (p.height ? `${p.height}px` : '100%')};
  padding-top: ${p => `${p.paddingTop}px`};
`;

const StackCard = ({
  cardsArray,
  cards,
  width,
  height,
  transformScaleStep,
  maxVisibleCards,
  animationDuration
}) => (
  <CardContainer
    width={width}
    height={height}
    cardsAmount={cardsArray ? cardsArray.length : 0}
    paddingTop={
      // eslint-disable-next-line no-restricted-properties
      height * Math.pow(transformScaleStep, maxVisibleCards) - height
    }
  >
    {cardsArray &&
      cardsArray.map((card, index) => (
        <Card
          {...cards[index]}
          width={width}
          height={height}
          key={card.children.key}
          animationDuration={animationDuration}
        >
          {card.children}
        </Card>
      ))}
  </CardContainer>
);

StackCard.propTypes = {
  cardsArray: PropTypes.arrayOf(PropTypes.object),
  cards: PropTypes.shape().isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  transformScaleStep: PropTypes.number.isRequired,
  maxVisibleCards: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired
};

StackCard.defaultProps = {
  cardsArray: []
};

export default StackCard;
