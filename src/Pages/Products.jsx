import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Products = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get("https://dummyjson.com/products", { timeout: 5000 })
                    .then(res => setProducts(res.data.products))
            } catch (error) {
                console.error("Error fetching data:", error);
            }

        }
        fetchData();
    }, [])

    const renderProducts = ({ item }) => {
        return (
            <View
                key={item.id}
                className='w-[90%] h-32 bg-primary mb-4 rounded-2xl flex flex-row items-center justify-between self-center p-5'>
                <View className='w-24 h-24 bg-white rounded-lg overflow-hidden'>
                    <Image source={{ uri: item.images[0] }} className='w-full h-full object-contain scale-110'/>
                </View>
                {/* <Text className='text-lg font-bold'>{item.title}</Text>
                <Text className='text-gray-600'>{item.description}</Text>
                <Text className='text-green-500'>${item.price}</Text> */}
            </View>
        )
    }

    return (
        <View className='w-screen h-full flex items-center justify-center'>
            <FlatList
                data={products}
                renderItem={renderProducts}
                keyExtractor={(item) => item.id.toString()}
                className='w-full h-fit flex-1 py-5'
            />
        </View>
    )
}

export default Products