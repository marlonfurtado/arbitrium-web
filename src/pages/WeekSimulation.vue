<template>
  <div class="container">
    <!-- TITLE -->
    <div class="row">
      <div class="col-md-11">
        <h2>Simulando a semana...</h2>
      </div>
      <div class="col-md-1">
        <router-link to="/">
          <button class="btn btn-outline-danger">DESISTIR</button>
        </router-link>
      </div>
    </div>

    <!-- EVENT -->
    <div class="row align-items-center mt-5 mb-1">

      <ShowEvent v-if="eventNumber == 0" :event="selectedEvent" @respondido="incrementEvents()"></ShowEvent>
      <ShowEvent v-if="eventNumber == 1" :event="selectedEvent2" @respondido="incrementEvents()"></ShowEvent>
      <ShowEvent v-if="eventNumber == 2" :event="selectedEvent3" @respondido="incrementEvents()"></ShowEvent>

      <div style="text-align: center; margin: 0 auto;" v-if="eventNumber > 2">
        <p>Semana concluída!</p>
        <router-link to="/resultado" :events="events" :eventNumber=0>
          <button class="btm btn-outline-primary btn-lg">Encerrar semana</button>
        </router-link>
      </div>

    </div>

  </div>
</template>

<script>

import ShowEvent from '../components/ShowEvent';
import { getAll as getEvents } from '../services/event'
import _ from "underscore"

export default {
  name: 'WeekSimulation',
  components: {
    ShowEvent,
  },
  props: ['events'],
  data: () => {
    return {
      eventNumber: 0,
      selectedEvent: "",
      selectedEvent2: "",
      selectedEvent3: "",
    }
  },
  mounted() {
    if(!this.events){
      this.getAllEvents().then(this.eventSelection)
    }
    if(!this.eventNumber){
      this.eventNumber = 0
    }

  },
  methods: {
    getAllEvents: function () {
      return getEvents()
      .then( function (res) {
        //console.log("Entrei then")
        this.events = res.data
      }.bind(this))
      .catch( function (err){
        //debugger;
        console.error('WeekSimulation, getEvents() ', err)
        this.events = [{id: 1, description: "Seu chefe o convida para um happy hour com os diretores no final do expediente.  Ao mesmo tempo, você recebe uma mensagem de seu cônjuge lembrando da apresentação no colégio do seu filho. O que você faz?"},
                       {id: 2, description: "Você tem muito trabalho a fazer, porém o tempo com sua família anda escasso. No final do expediente você escolheria jantar com sua família ou fazer hora extra?"},
                       {id: 3, description: "Você acorda de manhã e seu filho não está se sentindo bem. Ao verificar sua agenda, lembra que tem uma reunião com um novo cliente em uma hora. Você leva seu filho ao médico ou vai para a reunião?"},
                       {id: 4, description: "Ao checar o seu celular durante uma reunião com os diretores de sua organização, nota que recebeu cinco ligações de seu cônjuge. Você continua na reunião, ou pede para atender o telefone?"},
                       {id: 5, description: "Final de ano, seu chefe chama você para negociar suas férias. Porém, ele apresenta uma proposta de trabalho extra. Você sabe que seria bom para seu futuro na organização. O que você faz?"},
                       {id: 6, description: "Você está coordenando um novo projeto, porém seu cônjuge o convida para uma viagem de final de semana. Neste final de semana, você escolhe avançar o projeto ou viajar com família?"},
                       {id: 7, description: "Você está jantando com sua família, quando de repente recebe uma ligação de seu chefe. Você atende imediatamente ou retorna depois do jantar?"}
                      ]
      }.bind(this))
    },

    eventSelection: function() {
      this.events = _.shuffle(this.events)
      this.selectedEvent = this.events[0]
      this.removeEvent(0)
      this.selectedEvent2 = this.events[0]
      this.removeEvent(0)
      this.selectedEvent3 = this.events[0]
      this.removeEvent(0)
    },

    removeEvent(n){
      this.events.splice(n, 1)
    },

    incrementEvents(){
      this.eventNumber += 1
    }

  }
}
</script>

<style scoped>

</style>
