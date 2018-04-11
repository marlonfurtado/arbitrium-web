<template>
<div>
  <div class="project-name m-t-20">
    {{projectName}}
  </div>
  <a href="http://www.tools.ages.pucrs.br/arbitrium/web">Acesse o repositório</a>
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
