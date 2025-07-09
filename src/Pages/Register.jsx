import { View, Text, TextInput, StatusBar, SafeAreaView, TouchableOpacity, Button } from 'react-native'
import { string, object, ref } from 'yup';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import { BASE_URL } from '@env';


const Register = () => {


    const navigation = useNavigation();

    const userSchema = object({
        name: string().required("Name is required"),
        email: string().email("Enter a valid email").required("Email is required"),
        password: string().min(5, "Password must be at least 5 characters").required("Password is required"),
        confirmPassword: string().oneOf([ref('password'), null], "Passwords must match").required()
    }); 

    const { values, handleChange, handleBlur, handleSubmit, isSubmitting, touched, errors } = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: userSchema,
        onSubmit: async (values, actions) => {
                await axios.post(`${BASE_URL}/users/register`, values)
                .then(()=>{
                    actions.resetForm();
                    actions.setSubmitting(false);
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'AppPage' }],
                    });
                })
        }
    })
    
    console.log('Errors:', errors);

    return (
        <SafeAreaView className='h-screen w-screen items-center justify-start bg-secondary pt-40'>
            <StatusBar barStyle="light-content" />
            <View className='flex items-center justify-between w-full h-fit'>
                <Text className='text-2xl font-bold text-white tracking-widest'>Register</Text>
                <View className='w-2/3 flex flex-col items-center justify-center'>
                    <TextInput
                        className={`w-full border border-gray-300 rounded-md mb-2 p-2 bg-white ${errors.email && touched.email ? 'border-red-500' : 'border-blue-500'}`}
                        placeholder="Name"
                        value={values.name}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                    />
                    {errors.name && touched.name && <Text className='text-red-500'>{errors.name}</Text>}
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
                <Button title="Already have an Account ?" onPress={() => navigation.navigate('Login')} />
            </View>
        </SafeAreaView>
    )
}

export default Register