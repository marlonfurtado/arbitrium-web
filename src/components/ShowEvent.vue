<template>
  <transition name="modal"> 
    <div class="modal-mask">
      <div class="floating-div">
        <div>
          <h2>Novo evento!</h2>
          <div>
            <p class="event-txt">{{event.description}}</p>
          </div>
        </div>
        <div class="answers-div">
          <button class="btn btn-outline-primary btn-ans" @click="postAnswear('F', event.id)"><span>{{event.op_family}}</span></button>
          <button class="btn btn-outline-primary btn-ans" @click="postAnswear('W', event.id)"><span>{{event.op_work}} </span></button>
        </div>
      </div>
    </div>
  </transition>
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
        var dateTime = `${currentDate.getFullYear()}-
                        ${(currentDate.getMonth()+1)}-
                        ${currentDate.getDate()}T
                        ${currentDate.getHours()}:
                        ${currentDate.getMinutes()}:
                        ${currentDate.getSeconds()}`
        return dateTime
      },

    }
}

</script>

<style scoped>

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .floating-div{
    position: fixed;
    width: 60%;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    border-radius: 15px;
    border-style: solid;
    border-color: #007bff;
    background-color: rgba(255, 255, 255, 0.96);  
    transition: all .3s ease;
  }

  .answers-div{
    margin-top: 60px
  }

  .btn-ans{
    margin-top: 10px;
    width: 100%;
    height: 50px;
    vertical-align: middle  
  }

  .event-txt{
    margin-top: 30px;
    font-size: 22px;
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0; 
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
