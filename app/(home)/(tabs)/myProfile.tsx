import { SafeAreaView, View, Text, Button,  StyleSheet } from "react-native"
import useAuth from "@/hooks/zustand/useAuth";
import { removeToken } from "@/async-storage/jwtToken";
import { router } from "expo-router";

export default function MyProfileScreen() {
  const { logout } = useAuth();

  const handleLogout =  async () => {
    logout();
    await removeToken();

    router.navigate("/login");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="Logout" onPress={handleLogout} />
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5fcff",
  },
});
