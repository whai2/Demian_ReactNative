import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams } from 'expo-router';
import { useGetInfiniteMessages, useMessageSocket, useSendMessage } from '@/hooks/query/messages';
import Message from "@/components/Message";
import useSocket from "@/hooks/zustand/useSocket";
import { getToken } from '@/async-storage/jwtToken';

export default function Chat() {
  const { socket, initializeSocket, closeSocket } = useSocket();
  const { id } = useLocalSearchParams();

  const { data: messagesData, fetchNextPage } = useGetInfiniteMessages(id as string);
  console.log(messagesData)
  const { mutate } = useSendMessage(id as string);

  const [message, setMessage] = useState("");
  const messageObserverRef = useRef(null);

  const handleSendMessage = async (e: any, message: any) => {
    e.preventDefault();
    if (!message) return;

    mutate({ message });
    setMessage("");
  };

  const goBack = () => {
    messageObserverRef.current = null;
    // navigation.navigate(routes.chatList);
  };

  useEffect(() => {
    const setupSocket = async () => {
      const token = await getToken();
      initializeSocket(token as string, id as string); // Assuming token is needed for initialization
    };

    setupSocket();

    return () => {
      closeSocket();
    };
  }, [initializeSocket, closeSocket]);

  useMessageSocket(socket, id as string);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack}>
            {/* <Image source={require('/public/icons/leftBlackArrow.png')} style={styles.icon} /> */}
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.messageContainer}>
          <View ref={messageObserverRef} />
          {messagesData && messagesData.map((message) => (
            <View key={message._id} style={styles.messageWrapper}>
              <Message message={message} key={message._id} />
            </View>
          ))}
        </ScrollView>
        <View style={styles.messageLayout}>
          <View style={styles.inputWrapper}>
            {/* <Image source={require('/icons/galleryInMessage.png')} style={styles.icon} /> */}
            <TextInput
              style={styles.inputMessage}
              placeholder="메시지 입력"
              onChangeText={(text) => setMessage(text)}
              value={message}
            />
          </View>
          <TouchableOpacity onPress={(e) => handleSendMessage(e, message)}>
            {/* <SendMessage width={24} height={24}/> */}
            <Text>send</Text>
          </TouchableOpacity>
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

  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },

  icon: {
    width: 24,
    height: 24,
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

  gongji: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },

  gongjiWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  gongjiText: {
    fontSize: 16,
    marginLeft: 5,
  },

  messageContainer: {
    flex: 1,
    padding: 10,
  },

  messageWrapper: {
    marginBottom: 10,
  },

  messageLayout: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  inputMessage: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
  },
});
