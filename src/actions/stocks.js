import moment from 'moment';

const hasError = bool => ({ type: 'FETCH_ERROR', hasError: bool });

const fetchStocksSuccess = stocks => ({
  type: 'FETCH_STOCKS_SUCCESS',
  when: moment().valueOf(),
  stocks,
});

const fetchStocks = url => {
  return dispatch => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(items => dispatch(fetchStocksSuccess(items)))
      .catch(() => dispatch(hasError(true)));
  };
};

const toggleLogPlayer = () => ({ type: 'TOGGLE_LOG_PLAYER' });

export { hasError, fetchStocksSuccess, fetchStocks, toggleLogPlayer };
