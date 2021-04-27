import createDataContext from './createDataContext';

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
            console.log('deletou feed '+action.payload);
            return newState
        case 'restore_state':
            console.log('implementar');
            return state;
        case 'delete_all':
            console.log('implementar');
            return state;
        default:
            return state;
    }
};

const addFeed = dispatch => {
    return (titulo, urlFeed, callback) => {
        dispatch({
            type: 'add_feed', 
            payload:{  
                titulo,
                urlFeed
            }
        })
        // if (callback) {
        //     callback();
        // }
        console.log('Adicionando feed '+urlFeed);
    };
};

const deleteFeed = dispatch => {
    return (id) => {
        dispatch({ type: 'delete_feed', payload: id  });
    };
};

const restoreState = dispatch => async () => {
    return () => {
        console.log('implementar');
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
    {
        titulo: 'G1 - Brasil',
        urlFeed: 'http://g1.globo.com/dynamo/brasil/rss2.xml',
        descricao: '',
        urlSite: '',
        urlImagem: ''
    },
    {
        titulo: 'G1 - Tecnologia e Games',
        urlFeed: 'http://g1.globo.com/dynamo/tecnologia/rss2.xml',
        descricao: '',
        urlSite: '',
        urlImagem: ''
    },
    {
        titulo: 'Jovem Nerd - Site Completo',
        urlFeed: 'http://jovemnerd.com.br/rss',
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
