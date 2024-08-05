import React, { useState } from "react";
import { Link, router } from "expo-router";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";

import { storeToken } from "@/async-storage/jwtToken";
import { authRequests } from "@/apis/auth.api";
import useAuth from "@/hooks/zustand/useAuth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuth((state) => state.login);

  const handleLogin = async () => {
    try {
      const response = await authRequests.signIn({ email, password });
      await storeToken(response.token);

      router.replace("/(tabs)"); // 로그인 상태 업데이트
    } catch (error) {
      Alert.alert("Error", "An error occurred during login");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Link href="/signup" asChild>
        <Button title="Go to Sign Up" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
