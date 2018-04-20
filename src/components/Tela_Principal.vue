<template>
<!-- Como é separado os componentes de dentro do código .vue-->
<!-- Primeiramente, colocamos o código em HTML-->
<div>
	<div style="text-align: center;padding-top: 110px;">
		<a style="font-size: 120px;color: #666666;">Arbitrium</a>
		<p style="font-size: 40px;color: #666666;">Seja Bem-vindo!!</p>
	</div>

	<div style="text-align: center;">
		<p><a style="font-size: 30px;color: #666666;">Arbitrium é uma tarefa criada por pesquisadores para ajudar a entender</a></p>
		<p><a style="font-size: 30px;color: #666666;">como as pessoas tomam decisões e fazem a gestão do tempo em seu</a></p>
		<p><a style="font-size: 30px;color: #666666;">cotidiano.</a></p>
	</div>
	<div align="center" style="margin-top: 100px;">
		<button class="button" style="vertical-align:middle;margin-right: 100px;"><span>Resultados </span></button>
		<button class="button" style="vertical-align:middle;margin-left: 100px;"><span>Iniciar </span></button>
	</div>
</div>
</template>

<!-- Segundo vem os scripts em Javascript -->
<!-- Dentro das tags scripts ficam os Códigos Javascript -->
  <script>
  export default {
    name: 'InicialScreen',
    data () {
      return {
        projectName: 'InitialScreen'
      }
    }
  }
  </script>

  <!-- Terceiro vem os Códigos CSS -->
  <!-- Código CSS dos botões da Página -->
  <style>
  /*.button é o estilo do botão , sendo no .button o principal do botão*/
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

/**/
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
