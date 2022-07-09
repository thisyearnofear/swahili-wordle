import { useState } from "react";

export function useSetState<T extends Record<string, any>>(
  initialState: T
): readonly [T, (statePartial: Partial<T> | ((currentState: T) => Partial<T>)) => void] {
  const [state, setState] = useState(initialState);

  const setStatePartial = (statePartial: Partial<T> | ((currentState: T) => Partial<T>)) => {
    setState((currentState) => {
      if (typeof statePartial === "function") {
        return { ...currentState, ...statePartial(currentState) };
      }
      return { ...currentState, ...statePartial };
    });
  };

  return [state, setStatePartial];
}
