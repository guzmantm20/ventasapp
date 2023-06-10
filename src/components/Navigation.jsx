import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Reports from "../screens/Reports";
import Products from "../screens/Products";
import Cart from "../screens/Cart";

const Navigation = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Reports" component={Reports} />
        <Stack.Screen name="Products" component={ Products } />
        <Stack.Screen name="Cart" component={ Cart } />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
