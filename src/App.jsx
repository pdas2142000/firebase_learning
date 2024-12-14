import { View, Text } from "react-native"

/** Libraries */
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigation } from "./navigation/stack-nav";
import { AuthProvider } from "./utils/context/AuthContext";

const App = () => {

    return (
        <NavigationContainer>
            <AuthProvider>
                <AppNavigation />
            </AuthProvider>
        </NavigationContainer>
    );
}

export default App;
