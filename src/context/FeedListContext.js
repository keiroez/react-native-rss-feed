import createDataContext from './createDataContext';

const feedListReducer = (state, action) => {
    let newState = [];
    switch (action.type) {
        case 'add_feed':
            console.log('implementar');
            return state;
        case 'delete_feed':
            console.log('implementar');
            return state;
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
        console.log('implementar');
    };
};

const deleteFeed = dispatch => {
    return (id) => {
        console.log('implementar');
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
