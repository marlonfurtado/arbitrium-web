<template>
<div>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"><meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    </head>
    <div  style="float: right; margin-right: 50px">
        <router-link to="/">
            <button class="btn btn-outline-danger">DESISTIR</button> 
        </router-link>
    </div>
    <div class="container">
        <p style="font-size: 90px;">Fim da Semana {{cont}}</p>
        <p style="font-size: 20px;">Obrigado por participar! Seu resultado foi:</p>
    </div>

    <div id="boxResults">
        <div id="boxHealth">
            <i class="material-icons" style="font-size:80px;">healing</i>
            <span class="font-weight-bold">{{health}}</span>
            <p class="small">Saúde</p>
        </div>
        <div id="boxFamily">
            <i class="material-icons" style="font-size:80px;">home</i>
            <span class="font-weight-bold">{{family}}</span>
            <p class="small">Família</p>
        </div>
        <div id="boxWork">
            <i class="material-icons" style="font-size:80px">work</i>
            <span class="font-weight-bold">{{work}}</span>
            <p class="small">Trabalho</p>
        </div>
        <div id="boxMoney">
            <i class="material-icons" style="font-size:80px;">monetization_on</i>
            <span class="font-weight-bold">{{money}}</span>
            <p class="small">Dinheiro</p>
        </div>
    </div>
  
  <div style= "margin-top: 600px;" v-if="!end">
      <router-link to="/agenda">
      <button class="btn-outline-primary btnLarger" v-on:click="addCont">Continuar</button>
      </router-link>
  </div>
  <div style= "margin-top: 600px;" v-if="end">
      <router-link to="/">
      <button class="btn-outline-primary btnLarger">Fim</button>
      </router-link>
  </div>
</div>
</template>

<script>
import {get as getResults} from "../services/results"
export default {
  name: 'Result',
  data () {
    return {
        health: null,
        family: null,
        work: null,
        money: null,
        end: false,
        cont: sessionStorage.getItem('cont') || 1
    }
  },
  methods: {
    results: function() {
      getResults()
      .then (results => {
        this.health = results.health
        this.family = results.family
        this.work = results.work
        this.money = results.money
      })
      .catch (erro => {
        this.health = "*"
        this.family = "*"
        this.work = "*"
        this.money = "*"
      })
    },
      addCont: function (){
          this.cont  = sessionStorage.getItem('cont') ||1
          this.cont++
          sessionStorage.setItem('cont', this.cont) 

        }  
  },
  mounted(){
    this.results()
    if (this.cont >= 4) this.end=true
  },
}
</script>

<style scoped>

#boxHealth {
    float: left;
    width: 350px;
    height: 170px;
    padding:20px;
    font-size: 40px;
    text-align: center;
    color: white;
    background-color: #ffbd4a;
    margin-bottom: 50px;
}

#boxFamily {
    float: right;
    width: 350px;
    height: 170px;
    padding: 20px;
    font-size: 40px;
    text-align: center;
    color: white;
    background-color: #007bff; 
    margin-bottom: 50px;  
}

#boxWork {
    float: left;
    width: 350px;
    height: 170px;
    padding: 20px;
    font-size: 40px;
    text-align: center;
    color: white;
    background-color: #ff5c5c;   
}

#boxMoney {
    float: right;
    width: 350px;
    height: 170px;
    padding: 20px;
    font-size: 40px;
    text-align: center;
    color: white;
    background-color: #99e265;   
}

#boxResults {
    position: relative;
    width: 55%;
    align-items: center;
    left: 21%;
    margin-top: 100px;
    margin-bottom: 100px;
}

.btnLarger {
    font-size: 30px;
    padding: .5rem 1rem;
    border-radius: .3rem;
}

.material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 60px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
}
</style>