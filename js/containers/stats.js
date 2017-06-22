import StatsView from '../views/stats-view';


export default (state) => {
  const stats = new StatsView(state);

  return stats.element;
};
