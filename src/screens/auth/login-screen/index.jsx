import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

/** Libraries */
import { useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Formfields from '../../../utils/models/FormFields.json'
import { AuthStyles } from '../common/auth-styles';
import CustomInput from '../../../components/form-utils/custome-inputs';
import Layout from '../../../components/layout';
import SubmitButton from '../../../components/submit-button';
import auth from '@react-native-firebase/auth';
import { useAuth } from '../../../utils/context/AuthContext';

const LogInScreen = () => {

    const Navigation = useNavigation()

    const { login } = useAuth()

    const [Loading, SetLoading] = useState(false)

    const { reset, control, handleSubmit } = useForm({
        resolver: yupResolver(Schema),
    })

    const OnSubmit = async (data) => {
        try {
            const UserCredential = await auth().signInWithEmailAndPassword(data.Email, data.Password)
            const User = UserCredential.user;

            const idToken = await User.getIdToken();

            if (!UserCredential.user?.emailVerified) {
                await auth().currentUser.sendEmailVerification();
            }

            login({
                Token: idToken || null,
            })

        } catch (error) {
            console.log(" error:", error)
        }
    }

    const FormBuilder = [
        // {
        //     name: 'Email',
        //     parent: 'Login',
        //     type: 'text',
        //     control,
        //     label: true,
        //     placeholder: true,
        //     styles: AuthStyles,
        // },
        {
            name: 'Phone',
            parent: 'Login',
            type: 'text',
            control,
            label: true,
            placeholder: true,
            styles: AuthStyles,
        },
        {
            name: 'Password',
            parent: 'Login',
            type: 'password',
            control,
            label: true,
            placeholder: true,
            styles: AuthStyles,
        },
    ]
    return (
        <Layout heading="Login to Your Account">
            {FormBuilder.map((item, index) => {
                return <CustomInput {...item} key={index} flag="create" />
            })}
            <TouchableOpacity onPress={() => Navigation.navigate("ForgotPassword")} >
                <Text style={AuthStyles.lf_forget_text}>Forgot Password?</Text>
            </TouchableOpacity>
            <SubmitButton
                {...{
                    type: "Register",
                    title: "Log in",
                    Loading: Loading,
                    OnPress: handleSubmit(OnSubmit)
                }}
            />
            <View style={AuthStyles.lf_login_container} >
                <Text style={AuthStyles.lf_login_text}>Don’t have an account?</Text>
                <TouchableOpacity onPress={() => { Navigation.navigate("SignUpScreen") }} >
                    <Text style={AuthStyles.lf_login_bold}> Sign up </Text>
                </TouchableOpacity>
            </View>
        </Layout>
    );
}

export default LogInScreen;

const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const Schema = yup.object().shape({
    // Email: yup
    //     .string()
    //     .required(Formfields.Login.Email.errors.required)
    //     .matches(EmailRegex, Formfields.Login.Email.errors.invalid),
    Phone: yup
        .string()
        .required(Formfields.Login.Phone.errors.required),

    Password: yup
        .string()
        .required(Formfields.Login.Password.errors.required)
        .min(
            Formfields.Login.Password.errors.minLength.value,
            Formfields.Login.Password.errors.minLength.message,
        )
        .max(
            Formfields.Login.Password.errors.maxLength.value,
            Formfields.Login.Password.errors.maxLength.message,
        ),
})