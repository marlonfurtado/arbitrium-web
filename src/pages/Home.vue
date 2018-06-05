<template>
<div class="home">
  <div>
    <a class="welcome-title">Arbitrium</a>
    <p class="welcome-text">Seja Bem-vindo!</p>
  </div>
  <div>
    <p><a class="welcome-text">Arbitrium é uma tarefa criada por pesquisadores para ajudar</a></p>
    <p><a class="welcome-text">a entender como as pessoas tomam decisões e fazem a gestão do tempo</a></p>
    <p><a class="welcome-text">em seu cotidiano.</a></p>
  </div>
  <div align="center" style="margin-top: 60px;">
    <button class="btnLargerGeneric btnLarger1 btn-outline-primary btn-fixed-width" @click="showReport"><span>Resultados </span></button>
    <button class="btnLargerGeneric btnLarger2 btn-outline-primary btn-fixed-width" @click="createInterview"><span>Iniciar </span></button>
  </div>
</div>
</template>

<script>
import { create } from '../services/interview'

export default {
  name: 'Home',
  data () {
    return { }
  },
  methods: {
    createInterview: function () {
      const data = { researcher_id: 1 }
      create(data)
      .then(res => {
        if (res.status === 200) {
          // 'res.data' is a Array, so get id from last position
          const interviewId = res.data[res.data.length - 1].id

          // Save ID in sessionStorage to get it in schedule
          sessionStorage.setItem('interview', interviewId)
        } else {
          sessionStorage.setItem('interview', 0)
        }

        // always redirect
        this.$router.push('agenda')
      })
      .catch(err => {
        console.error('Erro ao criar entrevista: ', err)
        sessionStorage.setItem('interview', 0)
        this.$router.push('agenda')
      })
    },
    showReport: function(){
       this.$router.push('relatorio')
    }
  }
}
</script>

<style scoped>

.welcome-title{
  font-size: 110px;
  color: #666666;
}

.welcome-text{
  font-size: 24px;
  color: #666666;
}

.btnLargerGeneric {
  font-size: 30px;
  margin-right: 50px;
  padding: .5rem 1rem;
  border-radius: .3rem;
  vertical-align: middle;
}

.btnLarger1 {
  margin-right: 100px;
}

.btnLarger2 {
  margin-left: 100px;
}

.btn-fixed-width{
  width: 200px
}

</style>