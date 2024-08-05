import AsyncStorage from '@react-native-async-storage/async-storage';

// JWT 저장
export const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('jwt_token', token);
  } catch (error) {
    console.error('Failed to save the token to the storage', error);
  }
};

// JWT 접근
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('jwt_token');
    if (token !== null) {
      return token;
    }
  } catch (error) {
    console.error('Failed to retrieve the token from the storage', error);
  }
};

// JWT 삭제
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('jwt_token');
  } catch (error) {
    console.error('Failed to remove the token from the storage', error);
  }
};
