import { CONTROLS } from "../../core/consts";
import { ControlsOptions } from "../../core/model";

type BaseAction<T, P> = {
  type: T;
  payload: P;
};

export enum ACTIONS {
  INITIAL_STATE = "setInitialState",
  THEME = "selectTheme",
  SIZE = "selectSize",
  DISABLED = "switchDisabled",
  REVERSED = "switchReversed",
}

export type ControlsAction = BaseAction<ACTIONS, string | boolean>;

const modState = (
  state: ControlsOptions,
  prop: string,
  action: ControlsAction
) => ({
  ...state,
  [prop]: action.payload,
});

export const controlsReducer = (
  state: ControlsOptions,
  action: ControlsAction
): ControlsOptions => {
  switch (action.type) {
    case ACTIONS.INITIAL_STATE:
      return { ...state };
    case ACTIONS.THEME:
      return modState(state, CONTROLS.THEME, action);
    case ACTIONS.SIZE:
      return modState(state, CONTROLS.SIZE, action);
    case ACTIONS.DISABLED:
      return modState(state, CONTROLS.DISABLED, action);
    case ACTIONS.REVERSED:
      return modState(state, CONTROLS.REVERSED, action);
    default:
      return { ...state };
  }
};
