import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, Button } from "react-native";

/*
    Componente usado para criar o formulário de adição do feed
    Recebendo o método saveFeed pelas props
*/ 
const FormFeed = ({saveFeed}) => {
    const [title, setTitle] = useState();
    const [urlFeed, setUrlFeed] = useState();
    return (
        <View>
            <Text styles={styles.textStyle}>Titulo do Feed</Text>
            <TextInput style={styles.inputStyle} value={title} 
                onChangeText={text => setTitle(text)}/>

            <Text styles={styles.textStyle}>URL Feed</Text>
            <TextInput style={styles.inputStyle} value={urlFeed} 
                onChangeText={text => setUrlFeed(text)}/>

            <Button title="Salvar"
                onPress={() => {
                    saveFeed(title, urlFeed);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputStyle:{
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 15,
        padding: 5,
        margin: 5
    },
    textStyle: {
        fontSize: 50,
        textAlign: "center"
    }
});

export default FormFeed;