import React, { Component } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';

import theme from '../static/theme';
import TypewriterContainer from '../containers/TypewriterContainer';
import Footer from '../components/Footer';
import { initGA, logPageView } from '../utils/analytics';
import { isDarkMode } from '../utils/isDarkMode';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChildrenContainer = styled.div`
  max-width: 640px;
  margin: 0 2em;
`;

class Layout extends Component {
  state = {
    isDarkMode: false
  };

  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      isDarkMode: isDarkMode()
    });
  }

  render() {
    const { children, title, isLogoHomeLink } = this.props;
    return (
      <div>
        <Head>
          <title>{title}</title>
          <style global="true">
            {`
          body {
            margin: 0;
            background: ${
              this.state.isDarkMode
                ? theme.dark.colors.backgroundColor
                : theme.day.colors.backgroundColor
            };
          }
          `}
          </style>
        </Head>
        <ThemeProvider theme={this.state.isDarkMode ? theme.dark : theme.day}>
          <PageContainer>
            <ChildrenContainer>
              <TypewriterContainer isLogoHomeLink={isLogoHomeLink} />
              {children}
              <Footer />
            </ChildrenContainer>
          </PageContainer>
        </ThemeProvider>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  isLogoHomeLink: PropTypes.bool
};

Layout.defaultProps = {
  title: 'teleginzhenya.github.io',
  isLogoHomeLink: false
};

export default Layout;
