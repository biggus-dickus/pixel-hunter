import StatusBarView from './status-bar-view';

export default (state) => {
  const statusBar = new StatusBarView(state);

  return statusBar.element;
};
