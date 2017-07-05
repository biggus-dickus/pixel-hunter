import StatusBarView from './status-bar-view';

export default (state, answers) => {
  const statusBar = new StatusBarView(state, answers);

  return statusBar.element;
};
