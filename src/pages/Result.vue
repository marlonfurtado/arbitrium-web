<template>
<div>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"><meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    </head>

	<div style="text-align: center;">
		<a style="font-size: 90px;">Fim do Jogo</a>
		<p style="font-size: 20px;">Obrigado por participar! Seu resultado final foi este:</p>
	</div >
<div id="boxResults">
   <div id="boxHealth"><i class="material-icons" style="font-size:80px;">healing</i>{{health}}</div>
   <div id="boxEnergy"><i class="material-icons" style="font-size:80px;">battery_charging_full</i>{{energy}}</div>
   <div id="boxWork"><i class="material-icons" style="font-size:80px">work</i>{{work}}</div>
   <div id="boxMoney"><i class="material-icons" style="font-size:80px;">monetization_on</i>{{money}}</div>

</div>

  <div style= "margin-top: 600px;"><button class="btn-outline-primary btnLarger">Pronto!</button>  </div>

</div>
</template>

<script>
import {get as getResults} from "../services/results"
export default {
  name: 'Result',
  data () {
    return {
        health:null,
        energy: null,
        work:null,
        money:null
     }
     },
     methods: {
         results: function(){
             getResults()
             .then (results => {
                 console.log("executando results")
                 console.log(results)
                 this.health=100 +" pts."
                 this.energy=100 +" pts."
                 this.work=100 +" pts."
                 this.money=100 +" pts."

             })
             .catch (erro => {
                console.log("executando erro")
                console.log(erro)
                this.health="*"
                 this.energy="*"
                 this.work="*"
                 this.money="*"
             })
         }


     },
     mounted(){
         this.results()
     }


  }

</script>

<style scoped>

#boxHealth {
    float: left;
    width: 350px;
    height: 170px;
    padding:35px;
    font-size: 40px;
    text-align: center;
    color: white;
    background-color: #007bff;
    margin-bottom: 50px;
}

#boxEnergy {
    float: right;
    width: 350px;
    height: 170px;
    padding: 35px;
    font-size: 40px;
    text-align: center;
    color: white;
    background-color: #ffbd4a; 
    margin-bottom: 50px;  
}

#boxWork {
    float: left;
    width: 350px;
    height: 170px;
    padding: 35px;
    font-size: 40px;
    text-align: center;
    color: white;
    background-color: #ff5c5c;   
}

#boxMoney {
    float: right;
    width: 350px;
    height: 170px;
    padding: 35px;
    font-size: 40px;
    text-align: center;
    color: white;
    background-color: #99e265;   
}

#boxResults {
    position: relative;
    width: 50%;
    position: relative;
    align-items: center;
    left: 25%;
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

