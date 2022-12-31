import { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "@screens/Home";

const { Navigator, Screen } = createNativeStackNavigator();

export const AppRoutes: FC = () => {
  return (
    <Navigator>
      <Screen name="Home" component={Home} />
    </Navigator>
  );
};
