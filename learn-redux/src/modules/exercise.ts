import { createStore } from "redux";

export interface initialStateType {
  counter: number;
  text: string;
  list: Array<any>;
}

const initialState: initialStateType = { counter: 0, text: "", list: [] };

const INCREASE = "INCREASE" as const;
const DECREASE = "DECREASE" as const;
const CHANGE_TEXT = "CHANGE_TEXT" as const;
const ADD_TO_LIST = "ADD_TO_LIST" as const;

const increase = () => ({ type: INCREASE });

const decrease = () => ({ type: DECREASE });

const changeText = (text: string) => ({ type: CHANGE_TEXT, text });

const addToList = (item: any) => ({ type: ADD_TO_LIST, item });

type exerciseAction =
  | ReturnType<typeof increase>
  | ReturnType<typeof decrease>
  | ReturnType<typeof changeText>
  | ReturnType<typeof addToList>;

const reducer = (
  state: initialStateType = initialState,
  action: exerciseAction
) => {
  switch (action.type) {
    case INCREASE:
      return { ...state, counter: state.counter + 1 };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    case CHANGE_TEXT:
      return {
        ...state,
        text: action.text,
      };
    case ADD_TO_LIST:
      return {
        ...state,
        list: state.list.concat(action.item),
      };
    default:
      return state;
  }
};

const store = createStore(reducer);
console.log(store.getState());

const listener = () => {
  const state = store.getState();
  console.log(state);
};

const unsubscribe = store.subscribe(listener);

store.dispatch(increase());
store.dispatch(decrease());
store.dispatch(changeText("안녕하세요"));
store.dispatch(addToList({ id: 1, text: "와우" }));
