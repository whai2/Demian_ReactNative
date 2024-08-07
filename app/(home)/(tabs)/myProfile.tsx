import { SafeAreaView, View, Alert, Button, StyleSheet } from "react-native";
import useAuth from "@/hooks/zustand/useAuth";
import { removeToken } from "@/async-storage/jwtToken";
import { router } from "expo-router";
import { authRequests } from "@/apis/auth.api";

export default function MyProfileScreen() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    logout();
    await removeToken();

    router.navigate("/login");
  };

  const handleDeleteAccount = async () => {
    // Confirm the user's action
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            // Add your account deletion logic here
            // For example, call an API to delete the account

            // After account deletion, log out the user
            await authRequests.deleteAccount();
            logout();
            await removeToken();
            router.navigate("/login");
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button title="Logout" onPress={handleLogout} />
        <View style={{ marginTop: 20 }}>
          <Button title="Delete Account" color="red" onPress={handleDeleteAccount} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5fcff",
  },
});
