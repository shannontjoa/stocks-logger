import React from 'react';
import { connect } from 'react-redux';
import {
  last,
  first,
  filter,
  find,
  flatten,
  orderBy,
  uniqWith,
  isEqual,
  maxBy,
  minBy,
} from 'lodash';

const mapStateToProps = state => {
  return {
    stocks: state.stockHistory.stocks,
  };
};

const buildStockSummary = stocks => {
  const startingStockEntry = last(stocks) || [];
  const currentStocksEntry = first(stocks) || [];
  const stockCodes = startingStockEntry.map(stock => stock.code);
  const stocksData = uniqWith(
    orderBy(flatten(stocks), ['code', 'price'], ['asc', 'asc']),
    isEqual,
  );

  let stockSummary = [];
  stockCodes.forEach(code => {
    const stockPrices = filter(stocksData, { code });
    const lowest = (minBy(stockPrices, 'price') || {}).price;
    const highest = (maxBy(stockPrices, 'price') || {}).price;
    const current = (find(currentStocksEntry, { code }) || {}).price;
    const starting = (find(startingStockEntry, { code }) || {}).price;
    stockSummary = [
      ...stockSummary,
      {
        code,
        lowest,
        highest,
        current,
        starting,
      },
    ];
  });
  return stockSummary;
};

const StockSummary = props => {
  const stockSummary = buildStockSummary(props.stocks);

  const printStockSummary = () => {
    return stockSummary.map(stock => (
      <tr>
        <td>{stock.code}</td>
        <td>{stock.starting}</td>
        <td>{stock.lowest}</td>
        <td>{stock.highest}</td>
        <td>{stock.current}</td>
      </tr>
    ));
  };

  return (
    <table style={{ border: '1px solid' }}>
      <thead>
        <tr>
          <th>Stock</th>
          <th>Starting</th>
          <th>Lowest</th>
          <th>Highest</th>
          <th>Current</th>
        </tr>
      </thead>
      <tbody>{printStockSummary()}</tbody>
    </table>
  );
};

export default connect(mapStateToProps)(StockSummary);
