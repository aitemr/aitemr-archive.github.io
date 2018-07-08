import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typewriter from '../components/Typewriter';
import { logEvent } from '../utils/analytics';

const DELAY_BETWEEN_SYMBOLS = 100;
const DELAY_BETWEEN_WORDS = 2000;
const DELAY_BETWEEN_BACKSPACE = 75;

const CONTENT = [
  {
    icon: ['fab', 'github'],
    text: 'aitemr',
    link: 'https://github.com/aitemr'
  },
  {
    icon: ['fab', 'stack-overflow'],
    text: '6416852',
    link: 'https://stackoverflow.com/users/6416852/islam-temirbek'
  },
  {
    icon: ['fab', 'linkedin'],
    text: 'aitemr',
    link: 'https://www.linkedin.com/in/aitemr/'
  },
  {
    icon: ['fab', 'telegram'],
    text: '@aitemr',
    link: 'http://telegram.me/aitemr'
  },
  {
    icon: ['fas', 'envelope'],
    text: 'aitemr16@gmail.com',
    link: 'mailto:aitemr16@gmail.com'
  }
];

class TypewriterContainer extends Component {
  state = { currentIcon: null, currentText: '', currentLink: null };

  componentDidMount() {
    this.startTypingAnimation(0, 0);
  }

  startTypingAnimation = (wordIndex, symbolIndex) => {
    setTimeout(() => {
      if (
        symbolIndex === 0 &&
        CONTENT[wordIndex].icon &&
        !this.state.currentIcon
      ) {
        this.setState(
          {
            currentIcon: CONTENT[wordIndex].icon,
            currentLink: CONTENT[wordIndex].link
              ? CONTENT[wordIndex].link
              : null
          },
          () => this.startTypingAnimation(wordIndex, symbolIndex)
        );
      } else {
        this.setState(
          {
            currentText: `${this.state.currentText}${
              CONTENT[wordIndex].text[symbolIndex]
            }`,
            currentLink: CONTENT[wordIndex].link
              ? CONTENT[wordIndex].link
              : null
          },
          () => {
            if (symbolIndex < CONTENT[wordIndex].text.length - 1) {
              this.startTypingAnimation(wordIndex, symbolIndex + 1);
            } else {
              setTimeout(() => this.startBackspaceAnimation(wordIndex), 1000);
            }
          }
        );
      }
    }, DELAY_BETWEEN_SYMBOLS);
  };

  startBackspaceAnimation = wordIndex => {
    setTimeout(() => {
      this.setState(
        {
          currentText: this.state.currentText.slice(0, -1),
          currentIcon:
            this.state.currentText.length === 0 ? null : this.state.currentIcon,
          currentLink:
            this.state.currentText.length === 0 ? null : this.state.currentLink
        },
        () => {
          if (this.state.currentText.length !== 0) {
            this.startBackspaceAnimation(wordIndex);
          } else if (
            this.state.currentText.length === 0 &&
            this.state.currentIcon
          ) {
            this.startBackspaceAnimation(wordIndex);
          } else if (
            wordIndex < CONTENT.length - 1 &&
            !this.state.currentIcon
          ) {
            setTimeout(
              () => this.startTypingAnimation(wordIndex + 1, 0),
              DELAY_BETWEEN_WORDS
            );
          } else {
            setTimeout(
              () => this.startTypingAnimation(0, 0),
              DELAY_BETWEEN_WORDS
            );
          }
        }
      );
    }, DELAY_BETWEEN_BACKSPACE);
  };

  handleClick = link => {
    logEvent('headerClick', link);
  };

  render() {
    return (
      <Typewriter
        {...this.state}
        onClick={this.handleClick}
        isLogoHomeLink={this.props.isLogoHomeLink}
      />
    );
  }
}

TypewriterContainer.propTypes = {
  isLogoHomeLink: PropTypes.bool.isRequired
};

export default TypewriterContainer;
