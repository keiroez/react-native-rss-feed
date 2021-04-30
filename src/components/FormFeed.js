import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

/*
    Componente usado para criar o formulário de adição do feed
    Recebendo o método saveFeed pelas props
*/ 
const FormFeed = ({saveFeed}) => {
    const [title, setTitle] = useState();
    const [urlFeed, setUrlFeed] = useState();
    return (
        <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>Titulo do Feed</Text>
            <TextInput style={styles.inputStyle} value={title} 
                onChangeText={text => setTitle(text)}/>

            <Text style={styles.textStyle}>URL Feed</Text>
            <TextInput style={styles.inputStyle} value={urlFeed} 
                onChangeText={text => setUrlFeed(text)}/>
            
            <TouchableOpacity style={styles.buttonStyle}
                onPress={() => {
                    saveFeed(title, urlFeed);
                }}
            >
                <Text style={styles.textButtonStyle}>Salvar</Text>
            </TouchableOpacity>
            
        </View>
    );
};

const styles = StyleSheet.create({
    viewStyle:{
        paddingTop: 150
    },
    textStyle: {
        fontSize: 20,
        textAlign: 'center'
    },
    inputStyle: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 15,
        padding: 5,
        margin: 10
    },
    buttonStyle: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    textButtonStyle: {
        fontSize: 20,
        textAlign: 'center',
        color:'#ffffff'
    },
});

export default FormFeed;