import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Exercise } from '../screens';
const StackNavigator = createNativeStackNavigator();

export const RootNavigation = () => {
  return (
    <NavigationContainer>
      <StackNavigator.Navigator
        initialRouteName='Exercise'
        screenOptions={{
          headerShown: false,
        }}
      >
        <StackNavigator.Screen
          name="Exercise"
          component={Exercise}
        />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
};
