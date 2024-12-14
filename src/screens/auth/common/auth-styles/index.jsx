/** React Imports */
import { StyleSheet } from "react-native"

/** Local Imports */
import { ms } from "../../../../utils/helpers/metrics"
import { Colors, HeadingsFonts, MainFonts } from "../../../../utils/styles"

/** Libraries */
import { getDeviceType } from 'react-native-device-info'

let deviceType = getDeviceType()

/** Main Export */
export const AuthStyles = StyleSheet.create({
    lf_container: {
        paddingHorizontal: ms(15),
        flex: 1,
        backgroundColor: Colors.lf_gray,
        alignItems:"center"
    },
    lf_main_container:{ 
        maxWidth:ms(600), 
        flex:1, 
        width:"100%"
    },
    lf_title_container: {
        paddingTop: ms(40),
        paddingBottom:ms(20)
    },
    lf_title: {
        fontSize:deviceType === "Tablet"? ms(35): ms(25),
        color: Colors.lf_black,
        fontFamily: HeadingsFonts.Font_700,
    },
    lf_forget_text:{
        fontFamily: MainFonts.Font_500,
        color: Colors.lf_off_black, 
        fontSize: deviceType === "Tablet" ? ms(20) : ms(15),
        paddingBottom: ms(5),
        marginTop:ms(5)
    },
    lf_login_container: {
        alignSelf: "center",
        marginTop:ms(25),
        flexDirection:"row"
    },
    lf_simple_btn:{
        marginTop:ms(20),
        marginBottom:ms(10)
    },
    lf_otp_footer: {
        alignSelf: "center",
        flexDirection:"row",
        marginTop: ms(30)
    },
    lf_login_text: {
        fontSize: deviceType === "Tablet" ? ms(20) : ms(15),
        color: Colors.lf_off_black,
        fontFamily: MainFonts.Font_500,
        textAlign: "center"
    },
    lf_login_bold: {
        color: Colors.lf_black,
        fontFamily: MainFonts.Font_600,
        fontSize: deviceType === "Tablet" ? ms(20) : ms(15),
    },
    lf_otp_container:{
        paddingTop:ms(10)
    },
    lf_otp_text:{
        fontSize: deviceType === "Tablet" ? ms(20) : ms(15),
        color: Colors.lf_off_black,
        fontFamily: MainFonts.Font_500,
    },
    lf_email_text: {
        fontSize: deviceType === "Tablet" ? ms(20) : ms(15),
        color: Colors.lf_black,
        fontFamily: MainFonts.Font_500
    },
    lf_remove_input:{
        width:ms(19), 
        height:ms(19), 
        backgroundColor:Colors.lf_off_gray, 
        borderRadius:ms(50), 
        marginRight: ms(10), 
        alignItems:"center", 
        justifyContent:"center"
    },

    // otp style
    lf_pincode_container: {
        width: deviceType === "Tablet"? ms(60) : ms(50),
        height: deviceType === "Tablet"? ms(60) : ms(50),
        borderRadius: ms(5),
    },
    lf_focus_stick: {
        height: ms(15),
        backgroundColor: Colors.lf_black,
    },
    lf_pincode_text: {
        fontSize: deviceType === "Tablet" ? ms(20) : ms(16),
        fontFamily: MainFonts.Font_500
    },

    // form style
    lf_formCont:{
        marginBottom: ms(12)
    },
    lf_lable_optional:{
        flexDirection: "row",
        alignItems: "center"
    },
    lf_lable:{
        fontFamily: MainFonts.Font_600,
        color: Colors.lf_black,
        fontSize: deviceType === "Tablet" ? ms(20) : ms(15),
        paddingBottom: ms(5),
    },
    lf_wrapper:{
        height: deviceType === "Tablet"? ms(60) : ms(50),
        display: "flex", 
        flexDirection: "row",
        alignItems: "center", 
        borderWidth:ms(1),
        borderColor: Colors.lf_black,
        borderRadius: ms(10),
        paddingLeft: ms(10),
    },
    lf_input_field:{
        fontSize: deviceType === "Tablet" ? ms(20) : ms(15),
        fontFamily: MainFonts.Font_500,
        color: Colors.lf_black,
        flex: 1,
        height: "100%",
        paddingLeft: ms(10)
    },
    lf_textarea_wrapper: {
        height: ms(180),
        borderRadius: ms(10)
    },
    lf_textarea: {
        textAlignVertical: "top",
        paddingHorizontal: ms(10),
        marginTop: ms(10),
        height: "100%",
    },
    lf_error:{
        color: "red",
        fontFamily: MainFonts.Font_400,
        fontSize: deviceType === "Tablet" ? ms(17) : ms(13),
        paddingTop: ms(3)
    }
}) 