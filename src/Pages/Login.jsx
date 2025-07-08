import { View, Text, TextInput, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { string, object, ref } from 'yup';
import { Formik, useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'

const Login = () => {

    useEffect(()=>{
        const fetchExampleData = async () => {
            try {
                await axios.get('http:192.168.66.53:3000/products').then(res => console.log(res.data));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchExampleData();
    },[])

    const navigation = useNavigation();

    const userSchema = object({
        email: string().email("Enter a valid email").required("Email is required"),
        password: string().min(5, "Password must be at least 5 characters").required("Password is required"),
        confirmPassword: string().oneOf([ref('password'), null], "Passwords must match").required()
    });

    const { values, handleChange, handleBlur, handleSubmit, isSubmitting, touched, errors } = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: userSchema,
        onSubmit: async (values, actions) => {
            console.log('Form Values:', values);
            await new Promise((resolve) => { setTimeout(resolve, 2000) });
            actions.resetForm();
            actions.setSubmitting(false);
            navigation.reset({
                index: 0,
                routes: [{ name: 'AppPage' }],
            });
        }
    })
    console.log('Errors:', errors);

    return (
        <SafeAreaView className='flex-1 items-center justify-center bg-secondary' style={{ paddingTop: StatusBar.currentHeight }}>
            <StatusBar barStyle="light-content" />
            <View className='flex items-center justify-between w-full h-[30%]'>
                <Text className='text-2xl font-bold text-white tracking-widest'>Login</Text>
                <View className='w-2/3 flex flex-col items-center justify-center'>
                    <TextInput
                        className={`w-full border border-gray-300 rounded-md mb-2 p-2 bg-white ${errors.email && touched.email ? 'border-red-500' : 'border-blue-500'}`}
                        placeholder="Email"
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                    />
                    {errors.email && touched.email && <Text className='text-red-500'>{errors.email}</Text>}
                    <TextInput
                        className={`w-full border border-gray-300 rounded-md mb-2 p-2 bg-white ${errors.password && touched.password ? 'border-red-500' : 'border-blue-500'}`}
                        placeholder="Password"
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry
                    />
                    {errors.password && touched.password && <Text className='text-red-500'>{errors.password}</Text>}
                    <TextInput
                        className={`w-full border border-gray-300 rounded-md mb-2 p-2 bg-white ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : 'border-blue-500'}`}
                        placeholder="Confirm Password"
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        value={values.confirmPassword}
                        secureTextEntry
                    />
                    {errors.confirmPassword && touched.confirmPassword && <Text className='text-red-500'>{errors.confirmPassword}</Text>}
                    <TouchableOpacity disabled={isSubmitting} onPress={handleSubmit} className={`w-full border rounded-md mb-2 p-2 bg-blue-500 ${isSubmitting && 'opacity-50'}`}>
                        <Text className='text-center text-white'>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Login