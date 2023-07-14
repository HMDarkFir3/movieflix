import { Tabs } from 'expo-router';
import { useTheme } from 'styled-components/native';
import { FilmStrip, MonitorPlay } from 'phosphor-react-native';

const TabsLayout = () => {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: {
          backgroundColor: colors.secondary,
          borderTopWidth: 0,
          height: 60,
        },
        tabBarLabelPosition: 'beside-icon',
      }}
    >
      <Tabs.Screen
        name="(home)/index"
        options={{
          title: 'Movies',
          tabBarIcon: ({ color, size }) => <FilmStrip size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="series/index"
        options={{
          title: 'Series',
          tabBarIcon: ({ color, size }) => <MonitorPlay size={size} color={color} />,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
