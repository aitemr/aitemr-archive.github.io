import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import solid from '@fortawesome/fontawesome-free-solid';

const GradientContainer = styled.div`
  margin: 1em 0;
  color: ${props => props.theme.colors.white};
  background-image: ${props => props.theme.colors.gradient};
  border-radius: 0.1em;
  padding: 0.4em 0.8em;
  font-size: 2em;
  font-weight: bold;
  display: inline-block;

  @media (max-width: 550px) {
    word-break: break-all;
    display: block;
  }
`;

const LogoLink = styled.a`
  text-decoration: none;
  color: ${props => props.theme.colors.white};
`;

const blinkAnimation = keyframes`
  50% {
    visibility: hidden;
  }
`;

const Blink = styled.span`
  font-weight: normal;
  animation: ${blinkAnimation} 1s step-start 0s infinite;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin-right: 0.4em;
`;

fontawesome.library.add(brands, solid);

class Typewriter extends Component {
  handleClick = currentLink => {
    this.props.onClick(currentLink);
  };

  render() {
    const {
      currentIcon,
      currentLink,
      currentText,
      isLogoHomeLink
    } = this.props;
    return (
      <LogoLink
        href={isLogoHomeLink ? '/' : currentLink}
        onClick={() => this.handleClick(currentLink)}
      >
        <GradientContainer>
          {currentIcon && (
            <StyledFontAwesomeIcon icon={currentIcon} size="xs" />
          )}
          <span>{currentText}</span>
          <Blink>_</Blink>
        </GradientContainer>
      </LogoLink>
    );
  }
}

Typewriter.propTypes = {
  currentIcon: PropTypes.arrayOf(PropTypes.string),
  currentLink: PropTypes.string,
  currentText: PropTypes.string,
  onClick: PropTypes.func,
  isLogoHomeLink: PropTypes.bool.isRequired
};

Typewriter.defaultProps = {
  currentIcon: null,
  currentLink: null,
  currentText: null,
  onClick: () => {}
};

export default Typewriter;
