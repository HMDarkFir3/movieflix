import { useContext } from "react";

import { StreamingContext } from "@contexts/StreamingContext";

export const useStreaming = () => useContext(StreamingContext);
