import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { StyleSheet, css } from 'aphrodite';
import { toggleLogPlayer } from '../actions/stocks';

const styles = StyleSheet.create({
  scrollableContainer: {
    height: '90vh',
    width: '40vw',
    overflow: 'scroll',
    border: '1px solid',
    padding: '1rem',
  },
});

const mapStateToProps = state => {
  return {
    entryTimes: state.stockHistory.entryTimes,
    stocks: state.stockHistory.stocks,
    isLogPlaying: state.logPlayer,
  };
};

const mapDispatchToProps = dispatch => ({
  toggleLogPlayer: () => dispatch(toggleLogPlayer()),
});

const Stocks = props =>
  props.stocks.map((stock, index) => (
    <div key={index}>
      <div>{stock.code}</div>
      <div>{stock.price}</div>
    </div>
  ));

const StockLog = props => {
  return props.entryTimes.map((entryTime, index) => (
    <div>
      <div>
        Updates for{' '}
        {moment(entryTime)
          .utc()
          .format()}
      </div>
      <Stocks stocks={props.stocks[index]} />
      <br />
    </div>
  ));
};

class StockPlayer extends React.Component {
  render() {
    const { isLogPlaying } = this.props;
    return (
      <div>
        <button onClick={this.props.toggleLogPlayer}>
          <h2>{isLogPlaying ? 'Pause' : 'Play'} Log</h2>
        </button>
        <h1>Log</h1>
        <div className={css(styles.scrollableContainer)}>
          <StockLog
            entryTimes={this.props.entryTimes}
            stocks={this.props.stocks}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockPlayer);
