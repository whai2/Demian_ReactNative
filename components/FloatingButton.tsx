import { Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
// import DocumentPicker from 'react-native-document-picker';
import * as DocumentPicker from 'expo-document-picker';

import { useMakeNewMutation } from "@/hooks/query/conversation";

export default function FloatingButton() {
  const { mutate } = useMakeNewMutation(); 

  const handleClick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });

      if (result.canceled) {
        return;
      }

       const { uri, mimeType, name } = result.assets[0];

      // 파일을 Blob으로 변환
      const response = await fetch(uri);
      const blob = await response.blob();

      // FormData 생성 및 파일 추가
      const formData = new FormData();
      if (name && mimeType) {
        formData.append('file', blob, name);
      }

      mutate(formData);
    } catch (err) {
      Alert.alert('Error', 'An error occurred');
      throw err;
    }
  };

  return (
    <TouchableOpacity style={styles.fab} onPress={handleClick}>
      <Text style={styles.fabText}>+</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    right: 20,
    bottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },

  fabText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
