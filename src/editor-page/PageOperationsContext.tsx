import React, { createContext, useContext } from "react";
import Operation from "../pdf-generating/operations/Operation";

const PageOperationsContext = createContext<PageOperationsState>(null!);
const PageOperationsDispatchContext = createContext<PageOperationsDispatch>(
  null!
);

export function usePageOperations() {
  return useContext(PageOperationsContext);
}

export function usePageOperationsDispatch() {
  return useContext(PageOperationsDispatchContext);
}

export function PageOperationsProvider({
  state,
  dispatchState,
  children,
}: {
  state: PageOperationsState;
  dispatchState: (newState: PageOperationsState) => void;
  children: React.ReactNode;
}) {
  state = state || initialState;

  const dispatch: PageOperationsDispatch = (action) => {
    const updatedOperations = reducer(state, action);
    dispatchState(updatedOperations);
  };

  return (
    <PageOperationsContext.Provider value={state}>
      <PageOperationsDispatchContext.Provider value={dispatch}>
        {children}
      </PageOperationsDispatchContext.Provider>
    </PageOperationsContext.Provider>
  );
}

type PageOperationsState = Operation[];
type PageOperationsDispatch = (action: PageOperationsAction) => void;
type PageOperationsAction = AddOperation | RemoveOperation | ReplaceOperation;

interface AddOperation {
  type: "ADD";
  operation: Operation;
}

interface RemoveOperation {
  type: "REMOVE";
  index: number;
}

interface ReplaceOperation {
  type: "REPLACE";
  index: number;
  operation: Operation;
}

const initialState: PageOperationsState = [];

function reducer(
  operations: PageOperationsState,
  action: PageOperationsAction
): PageOperationsState {
  switch (action.type) {
    case "ADD": {
      return [...operations, action.operation];
    }
    case "REMOVE": {
      return operations.filter((_, index) => index != action.index);
    }
    case "REPLACE": {
      return operations.map((op, index) =>
        index == action.index ? action.operation : op
      );
    }
    default: {
      return operations;
    }
  }
}
