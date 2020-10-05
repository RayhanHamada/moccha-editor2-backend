/**
 * @param tasks {string[]}
 */
const mergeTasks = tasks => tasks.join(' && ');

module.exports = {
  hooks: {
    'pre-commit': mergeTasks('yarn lint', 'yarn fmt', 'yarn test'),
  },
};
