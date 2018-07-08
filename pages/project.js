import React from 'react';
import PropTypes from 'prop-types';
import { withSize } from 'react-sizeme';
import { withRouter } from 'next/router';

import Layout from '../components/Layout';
import Markdown from '../components/Markdown';
import StackCardContainer from '../containers/StackCardContainer';
import { isDarkMode } from '../utils/isDarkMode';

class Project extends React.Component {
  static getDerivedStateFromProps() {
    return {
      isDarkMode: isDarkMode()
    };
  }

  state = {
    isDarkMode: false
  };

  render() {
    const cardsWidth =
      this.props.size.width > 640 ? 640 : this.props.size.width - 32;

    const {
      router: {
        query: { project }
      }
    } = this.props;

    return (
      <Layout
        title={`${project.name} — Islam Temirbek`}
        isLogoHomeLink
        isDarkMode={this.state.isDarkMode}
      >
        <StackCardContainer
          width={cardsWidth}
          height={cardsWidth / project.ratio}
          maxVisibleCards={4}
          cardShift={cardsWidth / 30}
          transformScaleStep={0.05}
        >
          {project.images.map(image => (
            <img src={image.src} alt={image.alt} key={image.key} />
          ))}
        </StackCardContainer>
        <Markdown markdown={project.markdown} />
      </Layout>
    );
  }
}

Project.propTypes = {
  size: PropTypes.shape({ width: PropTypes.number }).isRequired,
  router: PropTypes.shape({
    query: PropTypes.shape({
      project: PropTypes.shape({
        name: PropTypes.string,
        markdown: PropTypes.string,
        images: PropTypes.arrayOf(
          PropTypes.shape({
            src: PropTypes.string,
            alt: PropTypes.string,
            key: PropTypes.string
          })
        ),
        ratio: PropTypes.number
      })
    })
  }).isRequired
};

export default withSize()(withRouter(Project));
