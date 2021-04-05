  

<br/>
<p align="center">
    ewally-desafio-api 💰
</p>

<br/>
<p align="center">
    <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/luisrabock/ewally-desafio?color=blue&style=flat-square">
      <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/luisrabock/nearby-api?style=flat-square">
	<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/luisrabock/nearby-api?color=blue&style=flat-square">
        <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/luisrabock/nearby-api">
        <img alt="GitHub issues" src="https://img.shields.io/github/issues-raw/luisrabock/nearby-api?color=red">
</p>
<br/>


 
API que recebe linhas digitáveis, faz algumas validações e retorna informações de código de barras, data de vencimento(se existir) e valor(se existir).


## 🚀&nbsp; Installation and Documentation

Você precisa instalar  [Node.js](https://nodejs.org/en/download/).
Você pode instalar também [Yarn](https://yarnpkg.com/) como alternativa para gerenciar as dependências.

Clone o repositório: [https://github.com/luisrabock/ewally-desafio](https://github.com/luisrabock/ewally-desafio)

💻 **Development environment**:

Na pasta raiz do projeto você deve rodar os comandos:

```yarn install``` ou ```npm install```

Para subir a API com nodemon:

```yarn dev``` ou ```npm run dev```


A aplicação está rodando na porta 4000!!

🧪 **Tests environment**:

Na pasta raiz do projeto você deve rodar os comandos:

```yarn test``` ou ```npm run test```

Será apresentado o coverage aproximado.

📋 **Docs**:


```REST Client Vs Code```
No caminho: pastaRaiz\src\docs\rest existe um arquivo **`billet.http`**. Com a extensão REST Client instalada no vscode, é possivel executar requisições nesse arquivo.

```OpenAPI(Swagger)```
Nessa API também existe uma documentação feita com OpenAPI(swagger), ali existem detalhes da response e também o formato do erro que pode retornar. Aqui também é possivel executar requisições, ela está dísponivel em: http://localhost:4000/api-docs.

```Outras opções para consumir a API```
Outra opção é usar alguma ferramenta(postman, insomnia ) para fazer as requisições.
Método: GET
Endpoint: http://localhost:4000/api/v1/boleto/
Param: {payNumber}


## 📘&nbsp; License
O conteúdo de ewally-desafio-api está licenciado sob os termos da MIT License [MIT License](LICENSE).