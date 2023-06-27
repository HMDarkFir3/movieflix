import { Dimensions, Platform } from "react-native";
import {
  getStatusBarHeight,
  getBottomSpace,
} from "react-native-iphone-x-helper";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");
const IS_IOS = Platform.OS === "ios";
const STATUS_BAR_HEIGHT = getStatusBarHeight();
const BOTTOM_SPACE = getBottomSpace();

export { SCREEN_WIDTH, SCREEN_HEIGHT, IS_IOS, STATUS_BAR_HEIGHT, BOTTOM_SPACE };
