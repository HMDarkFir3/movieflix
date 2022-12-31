import {
  createContext,
  useEffect,
  useReducer,
  FC,
  ReactNode,
  Reducer,
  Dispatch,
} from "react";
import { useQuery } from "react-query";

import {
  streamingReducer,
  initialState,
  StreamingState,
  StreamingAction,
} from "@reducers/streamingReducer";

import { getUpcomingMovies } from "@services/movies";

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

  const { isLoading: isLoadingUpcomingMovies } = useQuery(
    "upcomingMovies",
    getUpcomingMovies,
    {
      enabled: state.category === "movie",
      onSuccess: (data) => {
        dispatch({ type: "SET_MOVIES", payload: data });
      },
    }
  );

  useEffect(() => {
    dispatch({ type: "SET_IS_LOADING", payload: isLoadingUpcomingMovies });
  }, [isLoadingUpcomingMovies]);

  return (
    <StreamingContext.Provider value={{ state, dispatch }}>
      {children}
    </StreamingContext.Provider>
  );
};
