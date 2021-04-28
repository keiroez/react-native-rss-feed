import React from 'react';
import { useContext} from 'react';
import {StyleSheet, View } from 'react-native';
import {Context} from '../context/FeedListContext';
import FormFeed from "../components/FormFeed";

/*
    Tela de adição do feed utilizando o componente FormFeed
    Utilizando o context e atualizando o state da lista de feeds
*/
const AddFeedScreen = ({ navigation }) => {
    const { addFeed } = useContext(Context);
    return (
        <View>
           <FormFeed saveFeed={
               (title, urlFeed) => {
                addFeed(
                    title,
                    urlFeed,
                    () => navigation.navigate('Index'))}
           }></FormFeed>
        </View>
        //<Text>Implementar formulário de adição de RSS feeds, passando título e link. 
        //Demais informações devem ser obtidas do arquivo XML (tag channel), como imagem, 
        //descrição, etc.</Text>
    );
};

export default AddFeedScreen;
