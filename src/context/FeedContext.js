import createDataContext from './createDataContext';
import { parse } from 'fast-xml-parser';

//Método para extrair a URL da imagem da descrição da notícia
const getUrlImg = (string) => {
    //Extrai a tag <img /> da descrição
    str = string.match(/<img(.*?)[/]>/g);
    
    if(str){
        //Remove a tag da descrição
        stringRep = string.replace(str[0], '');

        //extrai a url da tag
        url = str[0].match(
                /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
            );
        //retorna a url e a descrição alterada
        return [url ? "https://"+url[0] : null, stringRep.replace('<br />', '')];
    }
    return [null, string];
    
}

const feedReducer = (state, action) => {
    let newState = [];
    let item;
    switch (action.type) {
        case 'fetch_items':
            //Foreach para pegar cada elemento do array de notícias 
            action.payload.feedItems.rss.channel.item.forEach(element => {
                //Manda a string de descrição para extrair a URL da imagem
                //E retorna a descrição sem o texto da URL
                let values = getUrlImg(element.description);
                let img = values[0];
                let desc = values[1];
                
                //Seta as informações no item
                item = {
                    titulo: element.title,
                    link: element.link,
                    descricao: desc,
                    imagem: img ? img : null,
                    dataPublicacao: element.pubDate
                }
                //adiciona item ao state
                newState.push(item);
                //adiciona item ao array
                rssItems.push(item);    
            });
             
            return newState;
        case 'add_item':
            console.log('implementar');
            return state
        case 'delete_item':
            //Removendo item do array 
            rssItems.forEach(element => {
                if(element.link==action.payload){
                    var index = rssItems.indexOf(element);
                    rssItems.splice(index, 1); 
                }
            });
            //Criando novo state
            newState = state.filter(
                (item) => item.link !== action.payload);
            console.log('deletou feed '+action.payload);
            return newState
        case 'restore_state':
            console.log('implementar');
            return state;
        case 'delete_all':
            //Limpa o array
            console.log('Limpando lista de noticias');
            rssItems.splice(0,rssItems.length)
            return [];
        default:
            return state;
    }
};

const addItem = dispatch => {
    return (titulo,link,descricao,imagem,dataPublicacao) => {
        console.log('implementar');
    };
};

//Remove item
const deleteItem = dispatch => {
    return (id) => {
        dispatch({ type: 'delete_item', payload: id  });
    };
};

//fetch do xml
const fetchItems = dispatch => async (fetch) => {
    const response = await fetch.get();
    const feedItems = parse(response.data);

    dispatch({
        type: 'fetch_items',
        payload: {feedItems}
    });
};

const restoreState = dispatch => async () => {
    return () => {
        console.log('implementar');
    }
}

//limpa a lista
const deleteAll = dispatch => {
    return () => {
        dispatch({
            type: 'delete_all',
        });
    }
}

const rssItems = [
    //Itens iniciais removidos
];

export const { Context, Provider } = createDataContext(
    feedReducer,
    { addItem, deleteItem, fetchItems, restoreState, deleteAll },
    rssItems
);
