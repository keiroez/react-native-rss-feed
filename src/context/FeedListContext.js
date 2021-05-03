import { Alert } from 'react-native';
import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'saved_feeds';

//Persistir array de feed 
const saveFeeds = async (value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(KEY, jsonValue);
        console.log('feed persistido no AsyncStorage');
    } catch (e) {
        console.log('erro: ' + e);
    }
}

//Remover item
const deleteItem = async () => {
    try {
        await AsyncStorage.removeItem(KEY)
        console.log('Feed removido do AS')
      } catch(e) {
        alert('Falha ao apagar o feed');
        console.log('Erro: ' + e);
      }
  }

//get feeds persistidos 
const getMyFeed = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(KEY).then(console.log);
      return jsonValue != null ? JSON.parse(jsonValue) : null
      
    } catch(e) {
      alert("Falha ao buscar um feed");
    }
  }


const feedListReducer = (state, action) => {
    let newState = [];
    switch (action.type) {
        case 'add_feed':
            //Cria feed
            let feed = {
                titulo: action.payload.titulo,
                urlFeed: action.payload.urlFeed,
            }
            //adiciona feed ao state
            newState = [
                ...state,
                feed
            ];

            //Persiste o feed
            saveFeeds(newState);

            //adiciona feed ao array
            rssFeeds.push(feed) 
            return newState
        case 'delete_feed':
            //Removendo do array 
            rssFeeds.forEach(element => {
                if(element.urlFeed==action.payload){
                    var index = rssFeeds.indexOf(element);
                    rssFeeds.splice(index, 1); 
                }
            });
            //Criando novo state
            newState = state.filter(
                (feed) => feed.urlFeed !== action.payload);

            //Remover do AS
            deleteItem(newState);    
            console.log('deletou feed '+action.payload);
            return newState
        case 'restore_state':
            newState = action.payload;
            return newState;
        case 'delete_all':
            console.log('implementar');
            return state;
        case 'get_all':
            //get lista de feeds
            newState = state.getMyFeed;
            return newState;
        default:
            return state;
    }
};

const addFeed = dispatch => {
    return (titulo, urlFeed, callback) => {
        //Verifica se os campos estão em branco
        if(titulo && urlFeed){
            dispatch({
                type: 'add_feed', 
                payload:{  
                    titulo,
                    urlFeed
                }
            })
            
            //Função de retorno para tela inicial
            if (callback) {
                callback();
            }
            console.log('Adicionando feed '+urlFeed);
        }
        else{
            Alert.alert('Atenção!', 'Faltam informações!')
        }
    };
};

const deleteFeed = dispatch => {
    return (id) => {
        dispatch({ type: 'delete_feed', payload: id  });
    };
};

//Restaura feeds persistidos no AS
const restoreState = dispatch => async () => {
    try {
        const savedState = await AsyncStorage.getItem(KEY);
        if (!savedState) {
            console.log('Nenhum registro encontrado.');
        }
        else {
            dispatch({ type: 'restore_state', payload: JSON.parse(savedState) })
        }
    } catch (e) {
        console.log('erro: ' + e);
    }
}

const deleteAll = dispatch => {
    return () => {
        console.log('implementar');
    }
}

const rssFeeds = [
    {
        titulo: 'G1 - Todas as notícias',
        urlFeed: 'http://g1.globo.com/dynamo/rss2.xml',
        descricao: '',
        urlSite: '',
        urlImagem: ''
    },
    // {
    //     titulo: 'G1 - Brasil',
    //     urlFeed: 'http://g1.globo.com/dynamo/brasil/rss2.xml',
    //     descricao: '',
    //     urlSite: '',
    //     urlImagem: ''
    // },
    // {
    //     titulo: 'G1 - Tecnologia e Games',
    //     urlFeed: 'http://g1.globo.com/dynamo/tecnologia/rss2.xml',
    //     descricao: '',
    //     urlSite: '',
    //     urlImagem: ''
    // },
    {
        titulo: 'Uol Notícias',
        urlFeed: 'http://rss.home.uol.com.br/index.xml',
        descricao: '',
        urlSite: '',
        urlImagem: ''
    },
    {
        titulo: 'Uol Tecnologia',
        urlFeed: 'http://rss.uol.com.br/feed/tecnologia.xml',
        descricao: '',
        urlSite: '',
        urlImagem: ''
    }
    
];

export const { Context, Provider } = createDataContext(
    feedListReducer,
    { addFeed, deleteFeed, restoreState, deleteAll },
    rssFeeds
);
