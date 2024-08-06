import React, { useState } from "react";
import { router } from "expo-router";
import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";

import { storeToken } from "@/async-storage/jwtToken";
import { authRequests } from "@/apis/auth.api";
import useAuth from "@/hooks/zustand/useAuth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await authRequests.signIn({ email, password });
      await storeToken(response.token);
      login(response.token);
      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert("Error", "An error occurred during login");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      <View style={styles.fieldSet}>
        <View style={styles.field}>
          <Text style={styles.label}>이메일</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>비밀번호</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <Button title="Login" onPress={handleLogin} />
      </View>
      <View style={styles.redirectLink}>
        <Text>아직 회원이 아니라면?</Text>
        <TouchableOpacity onPress={() => router.navigate("/signup")}>
          <Text style={styles.linkText}>이메일로 회원가입하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    marginBottom: 40,
  },

  fieldSet: {
    width: "100%",
    marginBottom: 20,
  },

  field: {
    marginBottom: 16,
  },

  label: {
    marginBottom: 8,
  },

  input: {
    width: "100%",
    padding: 12,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
  },

  error: {
    borderColor: "red",
  },

  errorMessage: {
    color: "red",
    marginTop: 4,
  },

  redirectLink: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },

  linkText: {
    color: "#007bff",
    marginLeft: 8,
  },

  or: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
});
