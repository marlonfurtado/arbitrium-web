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
    <button class="button" style="vertical-align:middle;margin-right: 100px;"><span>Resultados </span></button>
    <button class="button" @click="createInterview" style="vertical-align:middle;margin-left: 100px;"><span>Iniciar </span></button>
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
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Arimo');

.home {
  font-family: 'Arimo';
}

.button {
  display: inline-block;
  border-radius: 10px;
  background-color: #2eb2ff;
  border: none;
  color: #FFFFFF;
  text-align: center;
  font-size: 28px;
  padding: 20px;
  width: 200px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
}

.button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.button span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.button:hover span {
  padding-right: 25px;
}

.button:hover span:after {
  opacity: 1;
  right: 0;
}
</style>