import { View, Text, TextInput, Button } from 'react-native'
import React from 'react'
import { string, object, ref } from 'yup';
import { Formik } from 'formik';

const Login = () => {


    let userSchema = object({
        email: string().email(),
        password: string().min(6, "Password must be at least 6 characters").required("Password is required"),
        confirmPassword: string().oneOf([ref('password'), null], "Passwords must match").required()
        // confirmPassword: string().matches(ref('password'), 'Password must match').required()
    });


    return (
        <View className='flex items-center justify-center w-screen h-screen'>
            <Text className='text-2xl font-bold'>Login</Text>
            <Formik
                initialValues={{ email: '', password: '', confirmPassword: '' }}
                validationSchema={userSchema}
                onSubmit={(values) => {
                    console.log('Form Values:', values); // Log the form values
                }}
                validateOnChange={true}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View className='w-1/3'>
                        <TextInput className='w-full border mb-2  '
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                        <TextInput className='w-full border mb-2  '
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        />
                        <TextInput className='w-full border mb-2  '
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                        />
                        <Button onPress={handleSubmit} title="Submit" />
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default Login