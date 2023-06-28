import { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "@screens/Home";
import { SerieDetails } from "@screens/SerieDetails";
import { MovieDetails } from "@screens/MovieDetails";

const { Navigator, Screen } = createNativeStackNavigator();

export const AppRoutes: FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="SerieDetails" component={SerieDetails} />
      <Screen name="MovieDetails" component={MovieDetails} />
    </Navigator>
  );
};
