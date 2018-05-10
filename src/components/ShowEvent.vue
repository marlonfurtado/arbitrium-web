<template>
  <div class="container">
    <div style="text-align: center;">
      <p style="font-size: 36px;">Novo evento</p>
      <div style="text-align: center; margin: 0 auto; height: 150px">
        <p style="font-size: 22px;">{{event.description}}</p>
      </div>
    </div>
    <div align="center" style="margin-top: 60px;">
      <button class="btn btn-outline-primary btn-lg" @click="postAnswear('F', event.id)" style="vertical-align:middle;margin-right: 80px;"><span>Escolho minha família</span></button>
      <button class="btn btn-outline-primary btn-lg" @click="postAnswear('W', event.id)" style="vertical-align:middle;margin-left: 80px;"><span>Escolho meu trabalho </span></button>
    </div>
  </div>
</template>

<script>
  import WeekSimulation from '../pages/WeekSimulation'
  import _ from "underscore"
  import {create} from '../services/questions'

  export default {
    props: ['event'],

    components: {
      WeekSimulation,
    },
    methods: {
      postAnswear: function(answear, id){
        const data = {
          researcher_id: 1,
          event_id: id,
          question_appears_datetime: "2018:04:21T18:30:50",
          answered_question_datetime: "2018-04-21T18:30:54",
          choice: answear
        }
        create(data)
        .then(res => {
          if (res.status === 200){
            console.log(res)
          } else {
            console.log("não deu certo")
            console.log(res.data)
          }
        })
        .catch(err => {
          console.log("erro")
          console.error('Erro ao criar question: ', err)
        })
        this.$emit('respondido')
      },

      //MODELO ABAIXO, EXCLUIR DEPOIS
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
      //FIM DO MODELO
    }
}

</script>

<style scoped>

.big-font{
  font: helvetica;
  font-size: 32px;
}

.pr-6 {
  padding-right: 6rem;
}

.container {
  background-color: rgba(0, 0, 0, 0.0);
  width: 60%;
  height: 350px;
}
</style>