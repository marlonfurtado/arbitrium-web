<template>
<div class="home">
  <div style="text-align: center;">
    <a style="font-size: 110px;color: #666666;">Arbitrium</a>
    <p style="font-size: 36px;color: #666666;">Seja Bem-vindo!!</p>
  </div>
  <div style="text-align: center;">
    <p><a style="font-size: 24px;color: #666666;">Arbitrium é uma tarefa criada por pesquisadores para ajudar a entender</a></p>
    <p><a style="font-size: 24px;color: #666666;">como as pessoas tomam decisões e fazem a gestão do tempo em seu</a></p>
    <p><a style="font-size: 24px;color: #666666;">cotidiano.</a></p>
  </div>
  <div align="center" style="margin-top: 60px;">
    <button class="btnLargerGeneric btnLarger1 btn-outline-primary" @click="showReport"><span>Resultados </span></button>
    <button class="btnLargerGeneric btnLarger2 btn-outline-primary" @click="createInterview"><span>Iniciar </span></button>
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

</style>