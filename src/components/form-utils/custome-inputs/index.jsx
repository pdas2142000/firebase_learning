/**React Import */
import React, { useState } from 'react'
import { View, Text, TextInput, Platform, TouchableOpacity } from 'react-native'

/**Component */
import Formfields from '../../../utils/models/FormFields.json'

/** Library */
import { Controller } from 'react-hook-form'
import { getDeviceType } from 'react-native-device-info';

/**Local Import */
import { IconProps } from '../../../utils/helpers/Iconprops'

/** Styles */
import { ms } from '../../../utils/helpers/metrics'
import { Colors } from '../../../utils/styles'

/** Icons */
import ShowIcon from "../../../../assets/svgs/eye.svg"
import HideIcon from "../../../../assets/svgs/eye_close.svg"
import CrossIcon from "../../../../assets/svgs/cross.svg"

let deviceType = getDeviceType()

/** Main Export */
const CustomInput = ({
    name,
    parent,
    control,
    type,
    label,
    styles,
    Icon,
    keyboardType,
    flag,
}) => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prevState) => !prevState);
    };

    const Fields = Formfields
    const FieldName = parent ? Fields[parent][name] : Fields[name]

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                const errorMessage = error
                    ? error.message
                        ? error.message
                        : error
                    : ''
                return (
                    <View style={styles.lf_formCont}>
                        {label ?
                            <View style={styles.lf_lable_optional}>
                                <Text style={[styles.lf_lable]}>{FieldName?.label}</Text>
                            </View>
                            : null}
                        <View
                            style={[
                                styles.lf_wrapper,
                                type === 'textarea' ? styles.lf_textarea_wrapper : null,
                                {
                                    borderColor: isFocused ? Colors.lf_black : Colors.lf_off_gray + "54"
                                }
                            ]}
                        >
                            {Icon && (
                                <View style={{ marginTop: ms(-3) }} >
                                    <Icon {...IconProps(18)} fill={Colors.lf_off_black} />
                                </View>
                            )}
                            <TextInput
                                style={[
                                    styles.lf_input_field,
                                    type === 'textarea' ? styles.lf_textarea : null,
                                    {
                                        marginLeft: flag === 'create' ? ms(-5) : null,
                                        marginBottom: Platform.OS === "android" ? ms(-2) : null
                                    }
                                ]}
                                placeholder={FieldName?.placeholder}
                                value={value || ''}
                                onBlur={() => {
                                    setIsFocused(false);
                                    onBlur();
                                }}
                                onFocus={() => setIsFocused(true)}
                                onChangeText={onChange}
                                placeholderTextColor={Colors.lf_off_black}
                                autoCapitalize="none"
                                multiline={type == 'textarea' ? true : false}
                                keyboardType={keyboardType}
                                secureTextEntry={type === 'password' && !isPasswordVisible}
                            />
                            {type === 'password' && (
                                <TouchableOpacity
                                    onPress={togglePasswordVisibility}
                                    style={{ paddingRight: ms(10) }}
                                >
                                    {isPasswordVisible ? (
                                        <ShowIcon {...IconProps(ms(deviceType === "Tablet" ? ms(25) :ms(25)))} fill={Colors.lf_off_black} />
                                    ) : (
                                        <HideIcon {...IconProps(deviceType === "Tablet" ? ms(27) :ms(23))} fill={Colors.lf_off_black} />
                                    )}
                                </TouchableOpacity>
                            )}
                            {type === 'text' && value ? (
                                <TouchableOpacity
                                    style={styles.lf_remove_input}
                                    onPress={() => onChange('')} 
                                >
                                    <CrossIcon {...IconProps(16)} fill={Colors.lf_white} />
                                </TouchableOpacity>
                            ) : null}
                        </View>
                        {errorMessage ? (
                            <Text style={styles.lf_error} numberOfLines={1} ellipsizeMode="tail">
                                {errorMessage}
                            </Text>
                        ) : null
                        }
                    </View>
                )
            }}
        />
    )
}

export default CustomInput
