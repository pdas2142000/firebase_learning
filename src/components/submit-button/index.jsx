/** React Import */
import React from 'react'
import { Text, StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native'

/** Style */
import { Colors, MainFonts } from '../../utils/styles'
import { ms } from '../../utils/helpers/metrics'

/** Libraries */
import { getDeviceType } from 'react-native-device-info';

let deviceType = getDeviceType()

/** Main Export */
const SubmitButton = ({ Loading, OnPress, type, title }) => {

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={OnPress}
            disabled={Loading}
            style={[styles.lf_button]}
        >
            {
                Loading ? (
                    <ActivityIndicator size="small" color={"white"} />
                ) : (
                    <Text style={styles.lf_text}>{title}</Text>
                )
            }
        </TouchableOpacity>
    )
}

export default SubmitButton

const styles = StyleSheet.create({
    lf_button: {
        backgroundColor: Colors.lf_black,
        borderRadius: ms(50),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: deviceType === "Tablet"? ms(60) : ms(55),
        marginTop: ms(20)
    },
    lf_text: {
        fontFamily: MainFonts.Font_600,
        color: Colors.lf_white,
        fontSize: deviceType === "Tablet"? ms(20) : ms(15),
    },
})
