# Iniciando App React

Inicialmente no projeto foi utilizado o banco de dados mysql, pode ser usado tanto o mysql workbench ou o dbeaver como inferface da tabela, inicialmente ainda não estou disponibilizando arquivo para configuração de Banco de dados.
No Banco de dados é usada um schema chamado vestido, com acesso root e senha 1234 (provisório), podendo ser modificado na área de conexão ao banco de dados no arquivo ‘server.js’ localizado em ‘backend/’.
Dentro do Schema vestido tem duas tabelas: alugueis com as seguintes colunas, id, código_vestido, nome_cliente, telefone, endereço, data_retirada, data_devolucão. E info_vestidos com as seguintes colunas: id_vestido, cod_vestido, nome_vestido.

## Scripts para o react

No diretorio do projeto, use esses scripts.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Roda o app em modo de desenvolvedor.
Ele é aberto no http://localhost:3000 no seu navegador.

### `npm run build`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`


Cria o app para produção na pasta /build
Um aplicativo com otimizações e melhor performance.


### `npm run server`

É iniciado o servidor do app, com ele você tem acesso banco de dados, podendo adicionar e ver os vestidos e alugueis


You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
