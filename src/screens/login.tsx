import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import User from '../models/user';
import api from '../services/api';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import createLogin from './creatLogin';

export default function Login() {

    const navigation = useNavigation()




    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    useEffect(() => {
        
    }, [])


    async function acceptLogin() {

        let user: User = {
            username: email,
            password: password
        }

        try {
            const result = await api.post('/user/login', user)
            if (result && result.data && result.data.name) {
                return navigation.reset({
                    index: 0,
                    routes: [{ name: 'Chat', params: { user: result.data.name } }],
                })
            }
        } catch (error) {
            alert("E-mail ou senha incorreto!")
        }
    }

    function goCreat(){
        navigation.navigate("creatLogin")
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
                <Text style={styles.text}>Email:</Text>
                <TextInput style={styles.input} placeholder='Insira seu e-mail'
                    onChangeText={text => setEmail(text)} value={email} />
            </View>
            <View>
                <Text style={styles.text}>Senha:</Text>
                <TextInput style={styles.input} placeholder='Insira sua senha' secureTextEntry={true}
                    onChangeText={text => setPassword(text)} value={password} />
            </View>
            <View style={styles.vazio} />
            <TouchableOpacity onPress={() => acceptLogin()} style={[styles.butoon]}><Text>Login</Text></TouchableOpacity>
            <View style={styles.vazio} />
            <Text style={styles.ou}>---------------  ou  ----------------</Text>
            <View style={styles.vazio} />
            <TouchableOpacity onPress={()=>goCreat()} style={styles.butoon}><Text>Criar conta</Text></TouchableOpacity>
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
