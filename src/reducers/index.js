import { combineReducers } from 'redux';
import { stockHistory, hasError, logPlayer } from './stocks';

export default combineReducers({ stockHistory, hasError, logPlayer });
