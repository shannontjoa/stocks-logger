import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import StockPlayer from './components/StockLog';
import './App.css';
import StockSummary from './components/StockSummary';
import { fetchStocks } from './actions/stocks';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  log: {
    flexGrow: 1,
  },
  summary: {
    flexGrow: 1,
  },
});

const stocksFetcher = (() => {
  let instance;

  const init = () => {
    let setIntervalRef = 0;
    const interval = 2000;
    const startInterval = callback => {
      setIntervalRef = setInterval(callback, interval);
    };
    const stopInterval = () => {
      clearInterval(setIntervalRef);
      setIntervalRef = 0;
    };
    const service = {
      start: startInterval,
      stop: stopInterval,
      toggle: callback =>
        setIntervalRef !== 0 ? stopInterval() : startInterval(callback),
    };

    return service;
  };

  return {
    getInstance: () => {
      if (!instance) {
        instance = init();
      }
      return instance;
    },
  };
})();

const mapStateToProps = state => {
  return {
    stockHistory: state.stocks,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchStocks: url => dispatch(fetchStocks(url)),
  };
};

class App extends Component {
  state = {
    stockHistory: [],
  };
  componentDidMount() {
    stocksFetcher.getInstance().start(this.fetchStocks);
  }

  fetchStocks = () => {
    return this.props.fetchStocks('https://join.reckon.com/stock-pricing');
  };

  toggleStockFetcher = () => {
    stocksFetcher.getInstance().toggle(this.fetchStocks);
  };

  render() {
    return (
      <div>
        <div className={css(styles.container)}>
          <div>
            <StockPlayer />
          </div>
          <div>
            <h1>Summary</h1>
            <StockSummary className={css(styles.summary)} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
