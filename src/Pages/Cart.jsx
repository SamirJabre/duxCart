import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeItem, increaseQuantity, decreaseQuantity } from '../Redux/Slices/cartSlice'

const Cart = () => {
  const { products } = useSelector(state => state.cart);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    let totalPrice = 0;
    products.forEach(item => {
      totalPrice += item.price * item.quantity;
    });
    setTotal(totalPrice);
  }, [products]);

  const renderCartItem = ({ item }) => {
    return (
      <View className='w-full h-20 bg-white mb-4 rounded-lg flex flex-row items-center justify-between px-4 py-2'>
        <View className='flex-1'>
          <Text className='text-lg font-semibold'>{item.title}</Text>
          <Text className='text-gray-600'>${item.price}</Text>
          <View className='w-1/2 flex flex-row items-center justify-between'>
            <Text className='text-gray-600'>Quantity: {item.quantity}</Text>
            <TouchableOpacity className='bg-gray-300 w-5 h-5 rounded-full flex items-center justify-center' onPress={() => dispatch(decreaseQuantity(item))}>
              <Text>-</Text>
            </TouchableOpacity>
            <TouchableOpacity className='bg-gray-300 w-5 h-5 rounded-full flex items-center justify-center' onPress={() => dispatch(increaseQuantity(item))}>
              <Text>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity className='w-8 h-8 bg-red-500 rounded-full flex items-center justify-center' onPress={() => dispatch(removeItem(item))}>
          <Text className='text-white text-lg'>X</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View className='w-full h-full bg-secondary flex items-center justify-between'>
      <View className='w-full h-3/4'>
        <FlatList
          data={products}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id.toString()}
          className='w-full h-full'
          contentContainerStyle={{ padding: 16, alignContent: 'center', justifyContent: 'center' }}
        />
      </View>

      <View className='w-full h-1/4 bg-primary rounded-t-2xl flex flex-col items-center justify-evenly py-5 gap-y-4'>
        <Text>Proceed To Checkout</Text>
        <Text>Total: ${total.toFixed(2)}</Text>
        <TouchableOpacity className='w-4/5 h-12 bg-blue-500 rounded-lg flex items-center justify-center'>
          <Text className='text-white text-lg font-semibold'>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Cart