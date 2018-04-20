
# Arbitrium

> Uma aplicação para ajudar a entender como as pessoas tomam decisões e fazem a gestão do tempo em seu cotidiano.

## Tecnologias Utilizadas
- VueJS
- Javascipt, HTML e CSS

## Pré-Requisitos
- NodeJs e NPM - [como instalar](https://www.npmjs.com/get-npm)


## Iniciando
- Clone o repositório:  
`git clone http://www.tools.ages.pucrs.br/arbitrium/web.git`

- Entre no diretório:  
`cd web`

- Instale as dependências:  
`npm install`

- Iniciando o projeto:  
`npm start`

- Acesse no navegador:  
`http://localhost:8080`

> Os comandos acima iniciam apenas o *frontend* da aplicação.  
> Para uma experiência completa inicie também a API, saiba mais [aqui](http://www.tools.ages.pucrs.br/arbitrium/api).

## Estrutura

```
build/
config/
├─ index.js
├─ dev.env.js
├─ prod.env.js
├─ ...
src/
├─ assets/
│  ├─ logo.png
│  ├─ ...
├─ components/
│  ├─ HelloWorld.vue
│  ├─ ...
├─ pages/
│  ├─ Home.vue
│  ├─ ...
├─ router/
│  ├─ index.js
│  ├─ ...
├─ services/
│  ├─ http.js
│  ├─ ...
├─ App.vue
└─ main.js
```

## Comandos

``` bash
# instalar dependências
npm install

# server em localhost:8080
npm run dev

# build para produção
npm run build
```


## Saiba mais
- VueJS: [guia completo](https://br.vuejs.org/v2/guide/) e [boas práticas com o framework](https://br.vuejs.org/v2/style-guide/)

- Frontend: [saiba mais sobre nossa aplicação web](http://www.tools.ages.pucrs.br/arbitrium/api/wikis/frontend)

- Estrutura do projeto web: [vue-cli webpack](http://vuejs-templates.github.io/webpack/) e [vue-loader](http://vuejs.github.io/vue-loader)

- Saiba mais sobre cada arquivo da estrutura: [artigo](http://vuejs-brasil.com.br/crie-rapidamente-um-projeto-vue-com-vue-cli-e-browserify/)

- Arbitrium API: [repositório](http://www.tools.ages.pucrs.br/arbitrium/api)

- Sobre o Arbitrium: [wiki](http://www.tools.ages.pucrs.br/arbitrium/api/wikis/home)
