import { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "@screens/Home";
import { Details } from "@screens/Details";

const { Navigator, Screen } = createNativeStackNavigator();

export const AppRoutes: FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="Details" component={Details} />
    </Navigator>
  );
};
