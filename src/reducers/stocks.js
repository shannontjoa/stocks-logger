const stocksInitialState = { entryTimes: [], stocks: [] };
const stockHistory = (state = stocksInitialState, action) => {
  switch (action.type) {
    case 'FETCH_STOCKS_SUCCESS':
      return {
        entryTimes: [action.when, ...state.entryTimes],
        stocks: [action.stocks, ...state.stocks],
      };
    default:
      return state;
  }
};

const hasError = (state = false, action) => {
  switch (action.type) {
    case 'FETCH_ERROR':
      return action.hasError;
    default:
      return state;
  }
};

const logPlayer = (state = true, action) => {
  switch (action.type) {
    case 'TOGGLE_LOG_PLAYER':
      return !state;
    default:
      return state;
  }
};

export { stockHistory, hasError, logPlayer };
