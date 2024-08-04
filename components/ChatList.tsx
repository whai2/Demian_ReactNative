import styled from '@emotion/native';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function ChatList() {
  return (
    <S.Container>
    </S.Container>
  )
}

const S = {
  Container: styled.View`
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
  `,
  Item: styled(Link)`
    width: 100%;
    padding-bottom: 1.8rem;
    border-bottom-width: 1px;
    border-bottom-color: #d0d0d0;
    position: relative;
    font-size: 1.4rem;
  `,
  ItemInner: styled.View`
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
  `,
  ItemImg: styled(Image)`
    width: 4.2rem;
    height: 4.2rem;
    border-radius: 1.5rem;
    background: #d9d9d9;
  `,
  ItemTextContent: styled.View`
    flex: 1;
  `,
  ItemTitle: styled(Text)`
    font-weight: 600;
    margin-bottom: 0.5rem;
  `,
  ItemLastMessage: styled(Text)`
    font-weight: 400;
    color: #8b8d94;
  `,
  ItemLastMessageTime: styled(Text)`
    font-size: 1.2rem;
    color: #8b8d94;
  `,
  Wrap: styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 0.2rem;
  `,
  AlertMessageCount: styled(Text)`
    color: #8b8d94;
    margin-left: 0.5rem;
    font-weight: 400;
  `,
  UnreadBadge: styled(View)`
    position: absolute;
    top: 1.7rem;
    right: 0.2rem;
    padding: 0.5rem;
    border-width: 1px;
    border-color: red;
    border-radius: 10rem;
    background-color: red;
    color: white;
    align-items: center;
    justify-content: center;
  `,
  UnreadBadgeText: styled(Text)`
    color: white;
  `
};