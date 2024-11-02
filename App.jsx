import { View, Text, SafeAreaView, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import database from '@react-native-firebase/database';
import { useEffect, useState } from "react";

const App = () => {

    const [inputtext, setInputText] = useState()
    const [data, setData] = useState([])

    /**
     * Post data firebase database
     */
    const handdlePress = async () => {
        try {
            const index = data.length;
            const Response = await database().ref(`todo/${index}`).set({
                value: inputtext
            })
            setInputText("")

        } catch (error) {
            console.log("🚀 ~ handdlePress ~ error:", error)

        }
    }

    /**
     * Get data from firebase database
     */

    const GetData = async () => {
        try {
            const Response = await database().ref("todo").on("value",(newData)=>{
                setData(newData.val())
            })
        } catch (error) {
            console.log("🚀 ~ GetData ~ error:", error)
        }
    }
    useEffect(() => {
        GetData()
    }, []);

    return (
        <View style={{ paddingHorizontal: 10 }}>
            <SafeAreaView />
            <Text>Enter your list</Text>
            <TextInput
                placeholder="enter"
                style={styles.input}
                value={inputtext}
                onChangeText={(text) => {
                    setInputText(text)
                }}
            />
            <TouchableOpacity style={styles.btn} onPress={handdlePress}>
                <Text style={styles.btn_text}>Add here</Text>
            </TouchableOpacity>
            <View>
                <Text style={styles.list_hade}>List of data</Text>
                {
                    data
                    .filter(item => item !== null)
                    .map((item, index) => {
                        return (
                            <View style={styles.list_card} key={index}>
                                <Text style={styles.list_item}>{item.value}</Text>
                            </View>
                        )
                    })
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    input: {
        borderWidth: 1,
        borderColor: "#133E87",
        height: 47,
        borderRadius: 10,
        marginTop: 9,
        paddingLeft: 10,
        fontSize: 17
    },
    list_hade: {
        fontSize: 15,
        fontWeight: 500,
        color: "#B7B7B7",
        marginTop: 10
    },
    list_item: {
        fontSize: 15,
        color: "#000000",
        fontWeight: 500
    },
    btn: {
        backgroundColor: "#1E3E62",
        height: 47,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    btn_text: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 500
    },
    list_card: {
        backgroundColor: '#F5F5F7',
        height: 47,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    }

});

export default App;
