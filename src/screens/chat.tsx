
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Alert, FlatList, Keyboard, ScrollViewComponent, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import io, { Socket } from 'socket.io-client'
import modelMessage from '../models/message';
import api from '../services/api';
import { Ionicons,FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';

export default function Chat({ route }) {

  let message: modelMessage = new modelMessage()
  message.name = route.params.user

  const [messages, setMessages] = useState<any[]>([])
  const [text, setText] = useState('');

  const socket = useMemo<Socket>(() => io('http://192.168.0.110:3000/', { transports: ['websocket'] }), []);


  useEffect(() => {
    getMessages();
    socket.on('connect', () => {
      socket.on('receive-message', (content: { message: modelMessage }) => {
        getMessages()
      })
    })
  }, []);
  //get
  async function getMessages() {
    try {
      const { data } = await api.get("/message");
      setMessages(data);
    } catch (error) {
      console.error(error)
    }
  }
  //send
  function send() {
    message.message = text;
    socket.emit('send-message', message)
    setText('')
    Keyboard.dismiss();
  }

  return (
    <>

      <LinearGradient
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={['#450563', '#df0891']}
      >
        <View style={styles.top}>
          <View style={styles.bol}><FontAwesome name="group" size={40} color="black" style={styles.iconTop} /></View>
          <Text style={styles.textTop}>CHAT: {message.name}</Text>
        </View>

        <ScrollView>
          <View style={styles.boby}>
            <FlatList
              style={styles.flatList}
              data={messages}
              keyExtractor={(item, index) => {
                return index.toString();
              }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <>
                  {/* {show(item.name, item.message)} */}
                  {item.name == message.name && (
                    <View style={styles.op1}>
                      <View style={styles.containerView1Name}><Text style={styles.textoName}>{item.name}:</Text></View>
                      <View style={styles.containerView1message}><Text style={styles.textoMessage}>{item.message}</Text></View>
                    </View>
                  )}
                  {item.name != message.name && (
                    <View style={styles.op2}>
                      <View style={styles.containerView2Name}><Text style={styles.textoName}>{item.name}:</Text></View>
                      <View style={styles.containerView2message}><Text style={styles.textoMessage}>{item.message}</Text></View>
                    </View>
                  )}
                </>
              )}
            />
          </View>
        </ScrollView>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholderTextColor='#999'
            placeholder='Message'
            maxLength={15}
            onChangeText={text => setText(text)}
            value={text}
          />
          {/* Botao + */}
          <TouchableOpacity style={styles.button} onPress={() => send()}>
            <Ionicons name="ios-send" style={styles.icon} size={24} color="black" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20,
  },
  top:{
    flexDirection: "row",
    alignItems:'center',
    height: 80,
    borderBottomWidth: 2,
    borderColor: '#eee',
  },
  boby: {
    flex: 1,
  },
  form: {
    padding: 0,
    height: 45,
    justifyContent: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingTop: 13,
    borderTopWidth: 2,
    borderColor: '#eee',

  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#eee',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  button: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fbaf3b',
    borderRadius: 20,
    marginLeft: 10,
  },
  flatList: {
    flex: 1,
    marginTop: 5,
  },
  op1: {
    alignItems: 'flex-end'
  },
  op2: {
    alignItems: 'flex-start'
  },
  textoName: {
    marginLeft: 5,
    marginRight: 10,
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',

    textAlign: 'center',
  },
  textoMessage: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    color: "#df0891"
  },
  iconTop: {
    
    color:"white"
  },
  textTop:{
    marginLeft: 20,
    marginRight: 70,
    fontSize: 25,
    color:"white"
  },
  containerView2Name: {
    padding: 5,
    borderTopEndRadius: 50,
    backgroundColor: '#dde',

    alignItems: 'flex-start',
    width: 300
  },
  containerView2message: {
    marginBottom: 5,
    padding: 15,
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,
    backgroundColor: '#eee',

    alignItems: 'flex-start',
    width: 300,
  },
  containerView1Name: {
    padding: 5,
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    backgroundColor: '#dda',

    alignItems: 'flex-end',
    width: 300
  },
  containerView1message: {
    marginBottom: 5,
    padding: 15,
    borderBottomStartRadius: 50,
    backgroundColor: '#eea',

    alignItems: 'flex-end',
    width: 300
  },
  bol:{
    backgroundColor:"black",
    flex:1,
    justifyContent:"center",
    alignItems:'center',
    marginLeft: 20,
    padding:10,
    borderRadius:50,

  },
});
