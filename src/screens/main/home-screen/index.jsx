import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ms } from '../../../utils/helpers/metrics';
import { useAuth } from '../../../utils/context/AuthContext';

const HomeScreen = () => {

    const { logout } = useAuth()
    return (
        <View style={styles.lf_container} >
            <TouchableOpacity style={styles.lf_btn} onPress={()=>logout()}>
                <Text>Log out</Text>
            </TouchableOpacity>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    lf_container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    lf_btn:{
        backgroundColor:"red",
        height:ms(40),
        width:ms(90),
        alignItems:"center",
        justifyContent:"center",
        borderRadius:ms(10)
    }
});
