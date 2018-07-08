import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';

const MarkdownStyles = styled(ReactMarkdown)`
  h2,
  h3,
  h4 {
    position: relative;
    color: ${props => props.theme.colors.primaryColor};
    font-weight: bold;
    :hover > a {
      opacity: 1;
    }

    a {
      opacity: 0;
      position: absolute;
      width: 1em;
      left: -1em;
      color: inherit;
    }
  }

  h3,
  p,
  ul {
    color: ${props => props.theme.colors.fontColor};
  }

  h4 {
    color: ${props => props.theme.colors.grey};
  }

  ul {
    padding-left: 1em;
    li {
      line-height: 150%;
      margin-top: 0.5em;
      :last-child {
        line-height: 185%;
      }
    }
  }

  span {
    padding: 0.2em 0.5em;
    color: ${props => props.theme.colors.white};
    background-image: ${props => props.theme.colors.gradient};
    border-radius: 0.2em;
  }

  a {
    color: ${props => props.theme.colors.fontColor};
    text-decoration-color: ${props => props.theme.colors.primaryColor};
    :hover {
      font-weight: bold;
    }
  }
`;

fontawesome.library.add(solid);

function flatten(text, child) {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
}

const HeadingRenderer = props => {
  const children = React.Children.toArray(props.children);
  const text = children.reduce(flatten, '');
  const slug = text.toLowerCase().replace(/\W/g, '');

  return React.createElement(`h${props.level}`, { id: slug }, [
    <a href={`#${slug}`} key={slug}>
      <FontAwesomeIcon icon={['fas', 'link']} size="xs" />
    </a>,
    props.children
  ]);
};

HeadingRenderer.propTypes = {
  children: PropTypes.node.isRequired,
  level: PropTypes.number.isRequired
};

const Markdown = ({ markdown }) => (
  <MarkdownStyles
    source={markdown}
    escapeHtml={false}
    renderers={{ heading: HeadingRenderer }}
  />
);

Markdown.propTypes = {
  markdown: PropTypes.string.isRequired
};

export default Markdown;
