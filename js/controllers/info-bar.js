import InfoBarView from '../views/partials/info-bar-view';

export default (state) => {
  const infoBar = new InfoBarView(state);

  return infoBar.element;
};
