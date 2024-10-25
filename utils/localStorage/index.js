import AsyncStorage from "@react-native-async-storage/async-storage";

const __getLocalStorageData = async (key) => {
  return await AsyncStorage.getItem(key);
};
const __setLocalStorageData = async (key, value) => {
  return await AsyncStorage.setItem(key, value);
};
const __removeLocalStorageData = async (key) => {
  return await AsyncStorage.removeItem(key);
};
const __cleanLocalStorageData = async () => {
  console.log("cleared local storage");
  return await AsyncStorage.clear();
};

export {
  __getLocalStorageData,
  __setLocalStorageData,
  __removeLocalStorageData,
  __cleanLocalStorageData,
};
