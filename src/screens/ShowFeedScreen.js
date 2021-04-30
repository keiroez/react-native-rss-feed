import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Context as FeedListContext } from '../context/FeedListContext'
import { Context as FeedContext } from '../context/FeedContext'
import { useContext } from 'react';
import rssfeed from '../api/rssfeed';
import { useEffect } from 'react';
import { Feather } from '@expo/vector-icons';


const ShowFeedScreen = ({ navigation }) => {
    const feedListContext = useContext(FeedListContext);
    const feedID = navigation.getParam('id');
    const feed = feedListContext.state.find((feed) => feed.urlFeed === feedID);
    const fetch = rssfeed(feed.urlFeed);
    const { state, fetchItems, deleteAll} = useContext(FeedContext);
    

    //limpa e adiciona as notícias do xml ao array após a renderização da tela
    //O uso fora do useEffect ficava repetindo os métodos a todo momento
    useEffect(() => {
        deleteAll();
        fetchItems(fetch);
    }, []);

    const abrirLink = (link) => {
        //Abre o link no aplicativo padrão de navegação web
        Linking.openURL(link);
        // console.log('implementar, mandar o usuário para o link da notícia (item.link)');
    }

    return (
        <>
            <FlatList
                data={state}
                keyExtractor={(item) => item.link}
                renderItem={({ item }) => {
                    //atualmente só exibe o título, faça com que apareça data de publicação, descrição (pode cortar em 100 ou 200 caracteres para não ficar muito grande), e imagem (caso tenha)
                    //ao clicar em uma notícia, devemos chamar a função abrirLink que direciona o usuário para o link da notícia
                    return (
                        
                        <View style={styles.row}>
                            <TouchableOpacity style={styles.texto} onPress={() => abrirLink(item.link)}>
                                <Text style={styles.dataPublicacao}>{new Date(item.dataPublicacao).toLocaleString('pt-BR')}</Text>
                                <Text style={styles.titulo}>{item.titulo}</Text>
                                <Text style={styles.descricao} >{item.descricao.slice(0,200)}...(LER MAIS)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Feather style={styles.icon} name="trash" />
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
        </>
    );
};

//altere os estilos como desejar para melhorar o layout
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: 'gray',
    },
    texto:{
        width:'95%'
    },
    titulo: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    image: {
        //pode alterar largura e altura como desejar
        width: 100,
        height: 100,
        borderRadius: 4,
        margin: 5
    },
    descricao: {
        fontSize: 9,
    },
    dataPublicacao: {
        fontSize: 10,
        fontStyle: 'italic'
    },
    icon: {
        fontSize: 24
    }
});

export default ShowFeedScreen;
