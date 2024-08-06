import React, { useState } from "react";
import { router } from "expo-router";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import { authRequests } from "@/apis/auth.api";
import { storeToken } from "@/async-storage/jwtToken";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const response = await authRequests.signUp({
        email,
        password,
        confirmPassword,
      });

      await storeToken(response.token);

      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert("Error", "An error occurred during sign up");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
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
        <View style={styles.field}>
          <Text style={styles.label}>비밀번호 확인</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>
        <Button title="Sign Up" onPress={handleSignUp} />
      </View>
      <View style={styles.redirectLink}>
        <Text>이미 회원이라면?</Text>
        <TouchableOpacity onPress={() => router.navigate("/login")}>
          <Text style={styles.linkText}>로그인하기</Text>
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
