/** React Import */
import React, { useEffect, useState } from 'react'

/** Liabary*/
import { createNativeStackNavigator } from '@react-navigation/native-stack'

/** Components */
import LoginScreen from '../../screens/auth/login-screen'
import SignUpScreen from '../../screens/auth/sign-up-screen'
import HomeScreen from '../../screens/main/home-screen'
import { useAuth } from '../../utils/context/AuthContext'
import { ActivityIndicator, View } from 'react-native'
import ForgotPasswordScreen from '../../screens/auth/forgot-password-screen'

const Stack = createNativeStackNavigator()

export const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName='Login'
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </Stack.Navigator>
    )
}
export const MainStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName='Home'
        >
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    )
}

export const AppNavigation = () => {

    const { Token } = useAuth()

    const [Loading, SetLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            SetLoading(false)
        }, 1000)
    }, [])

    if (Loading) {
        return <SplashScreen />
    } else {
        return (
            <>
                {Token ? <MainStack /> : <AuthStack />}
            </>
        )
    }

}

const SplashScreen = () => (
    <View style={{ flex: 1,alignItems:"center", justifyContent:"center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
    </View>
);