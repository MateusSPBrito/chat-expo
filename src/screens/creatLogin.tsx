import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import User from '../models/user';
import api from '../services/api';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function createLogin() {

    const navigation = useNavigation()



    const [newName,setNewName] = useState("")
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("")

    useEffect(() => {
        
    }, [])

    async function creat(){
        let newUser:User={
            name:newName,
            username: newEmail,
            password: newPassword
        }
        await api.post('/user', newUser)
        navigation.navigate("Login")

    }

    function back(){
        navigation.navigate("Login")
    }

    return (
        <LinearGradient
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={['#450563', '#df0891']}
        >

            <FontAwesome name="user-circle" size={150} color="#fdfdfd" style={styles.icon} />
            <View>
                <Text style={styles.text}>Nome:</Text>
                <TextInput style={styles.input} placeholder='Insira seu nome'
                    onChangeText={text => setNewName(text)} value={newName} />
            </View>
            <View>
                <Text style={styles.text}>Email:</Text>
                <TextInput style={styles.input} placeholder='Insira o e-mail'
                    onChangeText={text => setNewEmail(text)} value={newEmail} />
            </View>
            <View>
                <Text style={styles.text}>Senha:</Text>
                <TextInput style={styles.input} placeholder='Crie a senha' secureTextEntry={true}
                    onChangeText={text => setNewPassword(text)} value={newPassword} />
            </View>
            <View style={styles.vazio} />
            <TouchableOpacity onPress={()=>creat()} style={[styles.butoon]}><Text>Criar conta</Text></TouchableOpacity>
            <View style={styles.vazio} />
            <Text style={styles.ou}>---------------  ou  ----------------</Text>
            <View style={styles.vazio} />
            <TouchableOpacity onPress={()=>back()} style={styles.butoon}><Text>Voltar</Text></TouchableOpacity>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#456",
        alignItems: 'center',
        justifyContent: 'center',

    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 25,

    },
    input: {
        backgroundColor: '#fdfdfd',
        height: 40,
        width: 250,
        borderRadius: 10,
        justifyContent: 'center',
        paddingLeft: 15,


    },
    butoon: {
        padding: 15,
        backgroundColor: "#fbaf3b",
        borderRadius: 10,
        width: 150,
        alignItems: "center",
    },
    vazio: {
        height: 40,
    },
    icon: {
        marginBottom: 50,
    },
    ou: {
        fontSize: 20,
        color: "#900a63"

    }
});
