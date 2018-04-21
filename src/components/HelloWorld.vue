<template>
<div>
  <img src="../assets/logo.png">
  <div class="project-name m-t-20">
    {{projectName}}
  </div>
  <a href="http://www.tools.ages.pucrs.br/arbitrium/web">Acesse o repositório </a>
   <ul>
  <li>VueJS:<a target="_blank" href="https://br.vuejs.org/v2/guide/"> guia completo </a></li>
  <li>Frontend:<a target="_blank" href="http://www.tools.ages.pucrs.br/arbitrium/api/wikis/frontend"> saiba mais sobre nossa aplicação web </a></li>
  <li>Estrutura do projeto web:<a target="_blank" href="http://vuejs-templates.github.io/webpack/"> vue-cli webpack </a> </li>
  <!--below is located how to link pages in vue.js -->
  <li>Tela inicial do Projeto:<router-link to="/tela">Tela Inicial</router-link></li>
</ul> 
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      projectName: 'Bem vindo ao Arbitrium!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.project-name {
  font-size: 52px;
}
.m-t-20 {
  margin-top: 20px;
}
</style>
