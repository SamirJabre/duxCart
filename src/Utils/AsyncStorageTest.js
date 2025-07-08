import AsyncStorage from '@react-native-async-storage/async-storage';

// Test function to verify AsyncStorage is working
export const testAsyncStorage = async () => {
    try {
        // Test storing data
        await AsyncStorage.setItem('test_key', 'test_value');
        console.log('✅ AsyncStorage.setItem worked');
        
        // Test retrieving data
        const value = await AsyncStorage.getItem('test_key');
        console.log('✅ AsyncStorage.getItem worked, value:', value);
        
        // Test removing data
        await AsyncStorage.removeItem('test_key');
        console.log('✅ AsyncStorage.removeItem worked');
        
        console.log('🎉 AsyncStorage is working properly!');
        return true;
    } catch (error) {
        console.error('❌ AsyncStorage test failed:', error);
        return false;
    }
};

// Function to check if AsyncStorage is available
export const checkAsyncStorageAvailability = () => {
    try {
        if (AsyncStorage && typeof AsyncStorage.getItem === 'function') {
            console.log('✅ AsyncStorage is available');
            return true;
        } else {
            console.error('❌ AsyncStorage is not available or not properly imported');
            return false;
        }
    } catch (error) {
        console.error('❌ Error checking AsyncStorage availability:', error);
        return false;
    }
};
