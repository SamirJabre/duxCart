import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import { addProduct } from '../Redux/Slices/productSlice'
import { useDispatch } from 'react-redux'
import { BASE_URL } from '@env';


const AddProduct = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: ''
  })

  const handleAddProduct = async () => {
    try {
      if (!formData.title || !formData.price) {
        alert('Please fill in at least the title and price');
        return;
      }

      const response = await axios.post('https://dummyjson.com/products/add', formData);

      const newProduct = {
        id: response.data.id || Date.now(),
        title: formData.title,
        description: formData.description,
        price: formData.price,
        category: formData.category,
        image: formData.image,
        images: [formData.image]
      };

      dispatch(addProduct(newProduct));

      setFormData({
        title: '',
        description: '',
        price: '',
        category: '',
        image: ''
      });

      alert('Product added successfully!');
    }
    catch (error) {
      console.error("Error adding product:", error);
      alert('Error adding product. Please try again.');
    }
  }


  return (
    <View className='w-full h-full bg-white items-center justify-center'>
      <Text className='text-2xl font-bold'>Add Product</Text>
      <TextInput onChangeText={(text) => setFormData({ ...formData, title: text })} className='border border-gray-300 rounded-md p-2 mt-2 w-3/5' value={formData.title} placeholder='Product Name' />
      <TextInput onChangeText={(text) => setFormData({ ...formData, description: text })} className='border border-gray-300 rounded-md p-2 mt-2 w-3/5' value={formData.description} placeholder='Product Description' />
      <TextInput onChangeText={(text) => setFormData({ ...formData, price: text })} className='border border-gray-300 rounded-md p-2 mt-2 w-3/5' value={formData.price} placeholder='Product Price' keyboardType='numeric' />
      <TextInput onChangeText={(text) => setFormData({ ...formData, category: text })} className='border border-gray-300 rounded-md p-2 mt-2 w-3/5' value={formData.category} placeholder='Product Category' />
      <TextInput onChangeText={(text) => setFormData({ ...formData, image: text })} className='border border-gray-300 rounded-md p-2 mt-2 w-3/5' value={formData.image} placeholder='Product Image URL' />
      <TouchableOpacity className='mt-4 flex items-center justify-center' onPress={handleAddProduct}>
        <Text className='bg-blue-500 text-white p-2 rounded-md mt-4'>Add Product</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AddProduct