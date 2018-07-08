const projects = require('./static/projects');

module.exports = {
  exportPathMap() {
    let projectPages = {};

    projects.map(
      // eslint-disable-next-line no-return-assign
      project =>
        (projectPages = {
          ...projectPages,
          [`/${project.path}`]: {
            page: '/project',
            query: { project }
          }
        })
    );

    return {
      ...projectPages,
      '/': { page: '/' }
    };
  }
};
