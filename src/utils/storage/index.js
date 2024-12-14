import AsyncStorage from "@react-native-async-storage/async-storage";

export const SetAuthToken = async (token, user, isemailVerified) => {
    try {
        const tokenString = JSON.stringify(token);
        await AsyncStorage.setItem('authToken', tokenString);
        await AsyncStorage.setItem('authUser', JSON.stringify(user));
        await AsyncStorage.setItem('authEmail', isemailVerified);
    }
    catch (err) {
        console.log(err);
    }
};


export const GetUserData = async () => {
    try {
        const token = await AsyncStorage.getItem('authToken')
        const user = await AsyncStorage.getItem('authUser')
        const email = await AsyncStorage.getItem('authEmail')
        return {
            token: token,
            user: user != null ? JSON.parse(user) : null,
            email:email
        }
    }
    catch (err) {
        console.log(err)
    }
}


export const RemoveAuthUser = async () => {
    try {
        await AsyncStorage.removeItem('authToken')
        await AsyncStorage.removeItem('authUser')
        await AsyncStorage.removeItem('authEmail')
    }
    catch (err) {
        console.log(err) 
    }
}
