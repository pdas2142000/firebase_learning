/** React Imports */
import React, { useState } from 'react'

/** Components */

/** Libraries */
import { useForm, } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigation } from '@react-navigation/native'

/** Local Imports */
import { Text, TouchableOpacity, View } from 'react-native'
import Formfields from '../../../utils/models/FormFields.json'
import { AuthStyles } from '../common/auth-styles'
import SubmitButton from '../../../components/submit-button'
import CustomInput from '../../../components/form-utils/custome-inputs'
import Layout from '../../../components/layout'

import auth from '@react-native-firebase/auth';

const SignUpScreen = () => {
    const Navigation = useNavigation()

    const [Loading, SetLoading] = useState(false)

    const { reset, control, handleSubmit, setValue } = useForm({
        resolver: yupResolver(Schema),
    })

    const OnSubmit = async (data) => {
        try {
            const User = await auth().createUserWithEmailAndPassword(data.Email, data.Password)
            console.log("🚀 ~ OnSubmit ~ User:", User)
        } catch (error) {
        console.log("error:", error)
        }
    }

    const FormBuilder = [
        // {
        //     name: 'Email',
        //     parent: 'Register',
        //     type: 'text',
        //     control,
        //     label: true,
        //     placeholder: true,
        //     styles: AuthStyles,
        // },
        {
            name: 'Phone',
            parent: 'Register',
            type: 'text',
            control,
            label: true,
            placeholder: true,
            styles: AuthStyles,
        },
        {
            name: 'Password',
            parent: 'Register',
            type: 'password',
            control,
            label: true,
            placeholder: true,
            styles: AuthStyles,
        },
    ]

    return (
        <Layout heading="Create Your Account">
            <View>
                {FormBuilder.map((item, index) => {
                    return <CustomInput {...item} key={index} flag="create" />
                })}
                <SubmitButton
                    {...{
                        type: "Register",
                        title: "Register",
                        Loading: Loading,
                        OnPress: handleSubmit(OnSubmit)
                    }}
                />
                <View style={AuthStyles.lf_login_container} >
                    <Text style={AuthStyles.lf_login_text}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => { Navigation.navigate("Login") }} >
                        <Text style={AuthStyles.lf_login_bold}> Log in</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Layout>
    )
}

export default SignUpScreen;

const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const Schema = yup.object().shape({
    Password: yup
        .string()
        .required(Formfields.Register.Password.errors.required)
        .min(
            Formfields.Register.Password.errors.minLength.value,
            Formfields.Register.Password.errors.minLength.message,
        )
        .max(
            Formfields.Register.Password.errors.maxLength.value,
            Formfields.Register.Password.errors.maxLength.message,
        ),
        Phone: yup
        .string()
        .required(Formfields.Register.Phone.errors.required),

    // Email: yup
    //     .string()
    //     .required(Formfields.Register.Email.errors.required)
    //     .matches(EmailRegex, Formfields.Register.Email.errors.invalid),
})
