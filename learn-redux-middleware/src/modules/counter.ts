const INCREASE = "INCREASE" as const;
const DECREASE = "DECREASE" as const;

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

type stateType = number;
type actionType = ReturnType<typeof increase> | ReturnType<typeof decrease>;

const initialState: stateType = 0;

const counter = (state = initialState, action: actionType) => {
  switch (action.type) {
    case INCREASE:
      return state + 1;
    case DECREASE:
      return state - 1;
    default:
      return state;
  }
};

export default counter;
