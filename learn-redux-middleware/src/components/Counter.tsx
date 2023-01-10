import React from "react";

type counterProps = {
  number: number;
  onIncrease: () => any;
  onDecrease: () => any;
};

function Counter({ number, onIncrease, onDecrease }: counterProps) {
  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;
