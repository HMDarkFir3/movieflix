import { UpcomingDTO } from "@dtos/Movie/UpcomingDTO";

export interface StreamingState {
  category: "tv" | "movie" | "my-list";
  upcomingMovies: UpcomingDTO.Response;
  isLoading: boolean;
}

export type StreamingAction =
  | {
      type: "SET_CATEGORY";
      payload: "tv" | "movie" | "my-list";
    }
  | {
      type: "SET_MOVIES";
      payload: UpcomingDTO.Response;
    }
  | {
      type: "SET_IS_LOADING";
      payload: boolean;
    };

export const initialState: StreamingState = {
  category: "movie",
  upcomingMovies: {} as UpcomingDTO.Response,
  isLoading: true,
};

export const streamingReducer = (
  state: StreamingState,
  action: StreamingAction
) => {
  switch (action.type) {
    case "SET_CATEGORY": {
      return {
        ...state,
        category: action.payload,
      };
    }
    case "SET_MOVIES": {
      return {
        ...state,
        upcomingMovies: action.payload,
      };
    }
    case "SET_IS_LOADING": {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
