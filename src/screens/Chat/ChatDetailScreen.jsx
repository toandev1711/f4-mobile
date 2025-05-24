import { View, FlatList, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import ChatHeader from "../../components/Chat/Detail/ChatHeader";
import ChatBubble from "../../components/Chat/Detail/ChatBubble";
import ChatInput from "../../components/Chat/Detail/ChatInput";

const messages = [
  { id: '1', text: 'Okay, see you there than!', sender: 'other', time: '12:14' },
  { id: '2', text: 'Hi, do you have time today for a short call?', sender: 'me', time: '12:15' },
  { id: '3', text: 'I have some stuff to finish, but it will be deployed...', sender: 'me', time: '12:16' },
  { id: '4', text: 'Sure! I\'ll schedule a meeting for 2pm.', sender: 'other', time: '12:17' },
];

export default function ChatDetailScreen() {
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={20} 
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 bg-white">
          <ChatHeader />
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ChatBubble item={item} />}
            contentContainerStyle={{ paddingTop: 10 }}
            className="flex-1"
          />
          <ChatInput />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}