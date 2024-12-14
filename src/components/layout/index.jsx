/** React Imports */
import React from 'react'
import { View, SafeAreaView, ScrollView, Text } from 'react-native'

/** Local Imports */
import { AuthStyles } from '../../screens/auth/common/auth-styles'

/** Main Export */
const Layout = ({ children, heading, type, subtext, email }) => {
    return (
        <View style={AuthStyles.lf_container}>
            <SafeAreaView />
            <View style={AuthStyles.lf_main_container}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={AuthStyles.lf_title_container}>
                        <Text style={AuthStyles.lf_title}>{heading}</Text>
                        {type === "otp" && (
                            <View style={AuthStyles.lf_otp_container} >
                                <Text style={AuthStyles.lf_otp_text}>
                                    {subtext}
                                </Text>
                                {email && (
                                    <Text style={AuthStyles.lf_email_text}>{email}</Text>
                                )}
                            </View>
                        )}
                    </View>
                    {children}
                </ScrollView>
            </View>
        </View>
    )
}

export default Layout
