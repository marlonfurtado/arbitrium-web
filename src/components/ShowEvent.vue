<template>
  <div class="floating-div">
    <div>
      <h2>Novo evento!</h2>
      <div>
        <p style="font-size: 22px;">{{event.description}}</p>
      </div>
    </div>
    <div align="center" style="margin-top: 60px;">
      <button class="btn btn-outline-primary btn-ans" @click="postAnswear('F', event.id)"><span>{{event.op_family}}</span></button>
      <button class="btn btn-outline-primary btn-ans" @click="postAnswear('W', event.id)"><span>{{event.op_work}} </span></button>
    </div>
  </div>
</template>

<script>
  import WeekSimulation from '../pages/WeekSimulation'
  import _ from "underscore"
  import {create} from '../services/questions'

  export default {
    props: ['event'],

    data(){
      return{
        appearTime: this.getDate()
      }
    },

    components: {
      WeekSimulation,
    },

    methods: {
      postAnswear: function(answear, id){
        const data = {
          researcher_id: 1,
          event_id: id,
          question_appears_datetime: this.appearTime,
          answered_question_datetime: this.getDate(),
          choice: answear
        }

        create(data)
        .then(res => {
          if (res.status === 200){
            console.log(res)
          } else {
            console.log(res.data)
          }
        })
        .catch(err => {
          console.error('Erro ao criar question: ', err)
        })
        .then(this.$emit('componentClick'))
      },

      getDate(){
        var currentDate = new Date()
        var dateTime = `${currentDate.getFullYear()}-${(currentDate.getMonth()+1)}-${currentDate.getDate()}T${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`
        return dateTime
      },

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

.floating-div{
  position: fixed;
  width: 60%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 15px;
  border-style: solid;
  border-color: #007bff;
  background-color: rgba(255, 255, 255, 0.90)
}

.answers-div{
  margin-top: 60px;
}

.btn-full{
  margin-bottom: 10px;
  width: 100%
}

body{
  background-color: rgba(0, 0, 0, 0.295)
}

.btn-ans{
  margin-top: 10px;
  width: 100%;
  height: 50px;
  vertical-align: middle
}
</style>
