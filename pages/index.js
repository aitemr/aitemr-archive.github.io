import React from 'react';

import Layout from '../components/Layout';
import Markdown from '../components/Markdown';

import { HOME_MARKDOWN } from '../static/markdown';

const HomePage = () => (
  <Layout title="Islam Temirbek — Mobile Developer">
    <Markdown markdown={HOME_MARKDOWN} />
  </Layout>
);

export default HomePage;
