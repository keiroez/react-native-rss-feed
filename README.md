# Exercício RSS

A aplicação `rss` está parcialmente implementada no momento. 
A versão atual da aplicação já tem um esqueleto de código para comportar dois contextos, um com uma lista de feeds RSS onde devem ser buscadas notícias, e outro para as notícias específicas de um feed. Atualmente, o estado está *hard-coded* estaticamente.

1. Complete a implementação de `src/context/FeedListContext.js` com as funções que manipulam estado para adicionar e remover feeds RSS (lembre de remover o estado inicial, se não quiser exibir os feeds); 
2. Altere a implementação atual para permitir adicionar *feeds* via componente `src/screens/AddFeedScreen.js`. Perceba que ao adicionar um *feed* o estado será modificado, então tem que adicionar via contexto;
3. Faça com que, ao clicar no título de um RSS feed específico, o usuário seja direcionado para `src/screens/ShowFeedScreen.js`, onde devem ser exibidas todas as notícias associadas com aquele *feed* (atualmente está sempre exibindo a mesma lista de notícias inicial, só com o título);
4. Complete a implementação de `src/context/FeedContext.js` com as funções que manipulam estado para adicionar e remover notícias de um RSS feed em particular (neste caso é **obrigatório** remover o estado inicial após terinar a implementação para manter consistência); 
5. Faça com que, ao clicar em uma notícia o usuário seja direcionado para o link da mesma; 

### Passos opcionais

1. Inclua a possibilidade de persistência de dados, usando `AsyncStorage` ou `SQLite` para armazenar as informações coletadas.

### Atenção

- Inclua comentários no código explicando o que faz cada método criado por você na implementação da aplicação.
- Escreva um Google Docs explicando a sua implementação, informando quais os passos que você completou.
- Entregue o exercício mesmo que não tenha completado todos os itens listados acima.