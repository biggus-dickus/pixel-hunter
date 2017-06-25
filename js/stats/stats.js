import StatsView from './stats-view';


export default (state) => {
  const stats = new StatsView(state);

  return stats.element;
};
