import { combineReducers } from "redux";
import settings from './settings-slice';
import game from './game-slice';

const reducer = combineReducers({
  settings,
  game,
})

export default reducer;