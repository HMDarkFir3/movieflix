export interface StreamingState {
  category: "series" | "film" | "myList";
}

export type StreamingAction = {
  type: "SET_CATEGORY_STREAMING";
  payload: "series" | "film" | "myList";
};

export const initialState: StreamingState = {
  category: "film",
};

export const streamingReducer = (
  state: StreamingState,
  action: StreamingAction
) => {
  switch (action.type) {
    case "SET_CATEGORY_STREAMING": {
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
