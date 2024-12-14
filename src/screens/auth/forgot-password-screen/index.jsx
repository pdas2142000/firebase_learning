/** React Imports */
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'

/** Components */
import Layout from '../../../components/layout'
import SubmitButton from '../../../components/submit-button'

/** Local Imports */
import { AuthStyles } from '../common/auth-styles'
import Formfields from '../../../utils/models/FormFields.json'
import { IconProps } from '../../../utils/helpers/Iconprops'
import { ms } from '../../../utils/helpers/metrics'
import { Colors } from '../../../utils/styles'

/** Libraries */
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import CustomInput from '../../../components/form-utils/custome-inputs'

/** Icons */

import auth from '@react-native-firebase/auth';

/** Main Export */
const ForgotPasswordScreen = () => {

    const Navigation = useNavigation()

    const [Loading, SetLoading] = useState(false)

    const { reset, control, handleSubmit } = useForm({
        resolver: yupResolver(Schema),
    })

    const OnSubmit = async (data) => {
        try {
            await auth().sendPasswordResetEmail(data.Email);
            Alert.alert('Success', 'Password reset email sent. Check your inbox!');
        } catch (error) {
            console.error('Error sending password reset email:', error);
            Alert.alert('Error', error.message);
        }
    }

    const FormBuilder = [
        // {
        //     name: 'Email',
        //     parent: 'ForgotPassword',
        //     type: 'text',
        //     control,
        //     label: true,
        //     placeholder: true,
        //     styles: AuthStyles,
        // },
        {
            name: 'Phone',
            parent: 'ForgotPassword',
            type: 'text',
            control,
            label: true,
            placeholder: true,
            styles: AuthStyles,
        },
    ]
    return (
        <Layout
            {...{
                heading: "Forgot Password",
                subtext: "Enter your email to reset your password.",
                type: "otp"
            }}
        >
            <View>
                {FormBuilder.map((item, index) => {
                    return <CustomInput {...item} key={index} flag="create" />
                })}
                <SubmitButton
                    {...{
                        type: "Forgot",
                        title: "Submit",
                        Loading: Loading,
                        OnPress: handleSubmit(OnSubmit)
                    }}
                />
                <TouchableOpacity style={AuthStyles.lf_otp_footer} onPress={() => { Navigation.goBack() }}>
                    {/* <LeftIcon {...IconProps(ms(22))} fill={Colors.lf_off_black} style={{marginTop:ms(2)}} /> */}
                    <Text style={[AuthStyles.lf_login_text, { marginLeft: ms(2) }]}>cancel and go back</Text>
                </TouchableOpacity>
            </View>
        </Layout>
    )
}

export default ForgotPasswordScreen

const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const Schema = yup.object().shape({
    // Email: yup
    //     .string()
    //     .required(Formfields.Register.Email.errors.required)
    //     .matches(EmailRegex, Formfields.Register.Email.errors.invalid),
    Phone: yup
        .string()
        .required(Formfields.ForgotPassword.Phone.errors.required)
        .matches(EmailRegex, Formfields.ForgotPassword.Phone.errors.invalid),
})
