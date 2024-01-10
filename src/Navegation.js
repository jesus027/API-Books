import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

import Home from "./screens/Home";
import Add from "./screens/Add";

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen 
                name="Add"
                component={Add}
                options={{presentation: 'modal'}}
            />
        </Stack.Navigator>
    )
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}