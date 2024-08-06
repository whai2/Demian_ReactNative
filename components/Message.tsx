import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import useAuth from '@/hooks/zustand/useAuth';
import { extractTime } from '@/utils';

export default function Message({ message }: { message: any}) {
  const time = extractTime(message.createdAt);

  return (
    <View style={[styles.container, message.fromMe ? styles.fromMe : styles.fromOthers]}>
      {message.fromMe ? (
        <>
          <View style={[styles.outSide, message.fromMe ? styles.fromMeAlign : styles.fromOthersAlign]}>
            {message?.unReadNumber ? <Text style={styles.outsideNumberText}>{message?.unReadNumber}</Text> : null}
            <Text style={styles.outSideTimeText}>{time}</Text>
          </View>
          <View style={[styles.messageAndNick, message.fromMe ? styles.fromMeAlign : styles.fromOthersAlign]}>
            <Text style={styles.nickNameText}>{message?.senderNickname}</Text>
            <View style={[styles.messageContainer, message.fromMe ? styles.fromMeBackground : styles.fromOthersBackground]}>
              <View style={styles.textContainer}>
                <Text style={[styles.text, message.fromMe ? styles.fromMeText : styles.fromOthersText]}>
                  {message?.message}
                </Text>
              </View>
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={[styles.messageAndNick, message.fromMe ? styles.fromMeAlign : styles.fromOthersAlign]}>
            <Text style={styles.nickNameText}>{message?.senderNickname}</Text>
            <View style={[styles.messageContainer, message.fromMe ? styles.fromMeBackground : styles.fromOthersBackground]}>
              <View style={styles.textContainer}>
                <Text style={[styles.text, message.fromMe ? styles.fromMeText : styles.fromOthersText]}>
                  {message?.message}
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.outSide, message.fromMe ? styles.fromMeAlign : styles.fromOthersAlign]}>
            {message?.unReadNumber ? <Text style={styles.outsideNumberText}>{message?.unReadNumber}</Text> : null}
            <Text style={styles.outSideTimeText}>{time}</Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    gap: 8,
  },

  fromMe: {
    alignSelf: 'flex-end',
  },

  fromOthers: {
    alignSelf: 'flex-start',
  },

  messageContainer: {
    flexShrink: 0,
    maxWidth: 226,
    height: 'auto',
    minHeight: 41,
    marginVertical: 8,
    borderRadius: 20,
    // wordWrap: 'break-word',
  },

  fromMeBackground: {
    borderRadius: 20,
    borderTopRightRadius: 10,
    backgroundColor: '#000',
  },

  fromOthersBackground: {
    borderRadius: 20,
    borderTopLeftRadius: 10,
    backgroundColor: '#F3F4F6',
  },

  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flexShrink: 0,
    width: '100%',
    minHeight: 41,
    padding: 10,
    // wordWrap: 'break-word',
  },

  text: {
    fontSize: 14,
  },

  fromMeText: {
    color: '#FFF',
  },

  fromOthersText: {
    color: '#3F3F3F',
  },

  outSide: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: -35,
  },

  fromMeAlign: {
    alignItems: 'flex-end',
  },

  fromOthersAlign: {
    alignItems: 'flex-start',
  },

  messageAndNick: {
    display: 'flex',
    flexDirection: 'column',
  },

  outsideNumberText: {
    color: '#181F29',
    fontSize: 12,
    fontWeight: 500,
    // lineHeight: 'normal',
  },

  outSideTimeText: {
    color: '#8C8C8C', // 테마 색상으로 대체
    fontSize: 12,
    fontWeight: 400,
    // lineHeight: 'normal',
  },

  outsideProfile: {
    width: 33,
    height: 33,
    flexShrink: 0,
    borderRadius: 12,
    backgroundColor: '#D9D9D9',
  },

  nickNameText: {
    color: '#181F29',
    fontSize: 12,
    fontWeight: 500,
    // lineHeight: 'normal',
  },
});
