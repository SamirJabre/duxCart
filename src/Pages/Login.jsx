import { View, Text, TextInput, StatusBar, SafeAreaView, TouchableOpacity, Alert, Button } from 'react-native'
import { string, object } from 'yup';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import { BASE_URL } from '@env';

const Login = () => {
    
    console.log('BASE_URL:', BASE_URL);
    // console.log("Hello from Login Page");
    

    const navigation = useNavigation();

    const userSchema = object({
        email: string().email("Enter a valid email").required("Email is required"),
        password: string().min(5, "Password must be at least 5 characters").required("Password is required"),
    }); 

    const { values, handleChange, handleBlur, handleSubmit, isSubmitting, touched, errors } = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: userSchema,
        onSubmit: async (values, actions) => {
            try{
                await axios.post(`${BASE_URL}/users/login`,values)
                .then(() => {
                    actions.resetForm();
                    actions.setSubmitting(false);
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'AppPage' }],
                    });
                })
            }
            catch (error) {
                Alert.alert('Invalid Log In', "Please Sign Up First.");
            }
        }
    })
    console.log('Errors: you bastard', errors);

    return (
        <SafeAreaView className='h-screen w-screen items-center justify-start bg-secondary pt-40'>
            <StatusBar barStyle="light-content" />
            <View className='flex items-center justify-between w-full h-fit'>
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
                    <TouchableOpacity disabled={isSubmitting} onPress={handleSubmit} className={`w-full border rounded-md mb-2 p-2 bg-blue-500 ${isSubmitting && 'opacity-50'}`}>
                        <Text className='text-center text-white'>Submit</Text>
                    </TouchableOpacity>
                </View>
                <Button title="Don't have an Account ?" onPress={() => navigation.navigate('Register')} />
            </View>
        </SafeAreaView>
    )
}

export default Login