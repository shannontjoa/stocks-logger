import React from 'react';
import { connect } from 'react-redux';
import { last, first, map } from 'lodash';

const mapStateToProps = state => {
  return {
    stocks: state.stockHistory.stocks,
  };
};

const StockSummary = props => {
  //   const { stockList = [] } = this.props || [];
  const firstStocksEntry = last(props.stocks) || [];
  const stockCodes = firstStocksEntry.map(stock => stock.code);
  const startingPrices = firstStocksEntry.map(stock => stock.price);

  const currentStocksEntry = first(props.stocks) || [];
  const currentPrices = currentStocksEntry.map(stock => stock.price);

  const lowestPrices = console.log(stockCodes, startingPrices, currentPrices);

  return <div>Testing only testing only</div>;
};

export default connect(mapStateToProps)(StockSummary);
