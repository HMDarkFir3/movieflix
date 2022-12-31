import {
  createContext,
  useReducer,
  FC,
  ReactNode,
  Reducer,
  Dispatch,
} from "react";

import {
  streamingReducer,
  initialState,
  StreamingState,
  StreamingAction,
} from "@reducers/streamingReducer";

interface StreamingContextData {
  state: StreamingState;
  dispatch: Dispatch<StreamingAction>;
}

interface StreamingProviderProps {
  children: ReactNode;
}

export const StreamingContext = createContext({} as StreamingContextData);

export const StreamingProvider: FC<StreamingProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer<
    Reducer<StreamingState, StreamingAction>
  >(streamingReducer, initialState);

  return (
    <StreamingContext.Provider value={{ state, dispatch }}>
      {children}
    </StreamingContext.Provider>
  );
};
