<template>
  <div id="app">
    <h1>在线翻译</h1>
    <translateForm v-on:formSubmit="translateText"></translateForm>
    <translateOutput v-text="translatedRes"></translateOutput>
  </div>
</template>

<script>
import TranslateForm from './TranslateForm'
import TranslateOutput from './TranslateOutput'
export default {
  name: 'App',
  data:function(){
    return{
      translatedRes:""
    };
  },
  components: {
    TranslateForm,
    TranslateOutput
  },
  methods:{
    translateText:function(text,language){
      this.$http.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170721T082515Z.54cf3dc583f679db.f4a96182281281d8b5dfe24b4e88298e2133f219&lang='+language+'&text='+text)
        .then((response) => {
          console.log(response);
          this.translatedRes = response.body.text[0];
        })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing:grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
