import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import { useEffect } from 'react'
import shoppingCart from '../Assets/Icons/shoppingCartWhite.png'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../Redux/Slices/productSlice'
import { addItem } from '../Redux/Slices/cartSlice'

const Products = () => {
    const dispatch = useDispatch();
    const { items } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
        console.log(items);
    }, []);


    const renderProducts = ({ item }) => {
        return (
            <View key={item.id} className='w-[90%] h-32 bg-primary mb-4 rounded-2xl flex flex-row items-center justify-between self-center p-5'>
                <View className='w-24 h-24 bg-white rounded-lg overflow-hidden'>
                    <Image source={{ uri: item.images[0] }} className='w-full h-full object-contain scale-110' />
                </View>
                <View className='w-56 h-full flex flex-col justify-between items-start'>
                    <Text className='text-lg text-white font-bold'>{item.title}</Text>
                    <View className='w-full h-fit flex flex-row items-center justify-between'>
                        <Text className='text-gray-600'>${item.price}</Text>
                        <TouchableOpacity className='w-6 h-6' onPress={() => dispatch(addItem(item))}>
                            <Image source={shoppingCart} className='w-full h-full object-cover' />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View className='w-screen h-full bg-secondary flex items-center justify-center'>
            <FlatList
                data={items}
                renderItem={renderProducts}
                keyExtractor={(item) => item.id.toString()}
                className='w-full h-fit flex-1 py-5'
            />
        </View>
    )
}

export default Products