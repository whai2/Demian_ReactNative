import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
// import { Link } from 'expo-router'; // 필요시 Link 컴포넌트로 교체

import FloatingButton from "./FloatingButton";

export default function ChatList() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.item}>
          <View style={styles.itemInner}>
            <View style={styles.itemTextContent}>
              <Text style={styles.itemTitle}>Title</Text>
              <View style={styles.wrap}>
                <Text style={styles.itemLastMessage}>
                  Last message content...
                </Text>
                <Text style={styles.itemLastMessageTime}>10:45 AM</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.item}>
          <View style={styles.itemInner}>
            <View style={styles.itemTextContent}>
              <Text style={styles.itemTitle}>Title</Text>
              <View style={styles.wrap}>
                <Text style={styles.itemLastMessage}>
                  Last message content...
                </Text>
                <Text style={styles.itemLastMessageTime}>10:45 AM</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <FloatingButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5fcff",
  },

  container: {
    padding: 16,
    backgroundColor: "#f5fcff",
  },

  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },

  item: {
    width: "100%",
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#d0d0d0",
    position: "relative",
    marginBottom: 18,
    fontSize: 14,
  },

  itemInner: {
    flexDirection: "row",
    // marginBottom: 15,
  },

  itemImg: {
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: "#d9d9d9",
  },

  itemTextContent: {
    flex: 1,
  },

  itemTitle: {
    fontWeight: "600",
    marginBottom: 5,
  },

  itemLastMessage: {
    fontWeight: "400",
    color: "#8b8d94",
  },

  itemLastMessageTime: {
    fontSize: 12,
    color: "#8b8d94",
  },

  wrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 2,
  },

  alertMessageCount: {
    color: "#8b8d94",
    marginLeft: 5,
    fontWeight: "400",
  },

  unreadBadge: {
    position: "absolute",
    top: 17,
    right: 2,
    padding: 5,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 10,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },

  unreadBadgeText: {
    color: "white",
  },
});