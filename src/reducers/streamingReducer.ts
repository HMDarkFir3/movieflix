import { UpcomingDTO } from "@dtos/Movie/UpcomingDTO";

export interface StreamingState {
  category: "tv" | "movie" | "my-list";
}

export type StreamingAction = {
  type: "SET_CATEGORY";
  payload: "tv" | "movie" | "my-list";
};

export const initialState: StreamingState = {
  category: "movie",
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

    default: {
      return state;
    }
  }
};
