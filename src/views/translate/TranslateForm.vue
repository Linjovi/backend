<template>
  <div class="translateForm">
    <form v-on:submit="formSubmit">
      <el-input 
        placeholder="输入要翻译的内容" 
        v-model="textToTranslate" 
        clearable>
      </el-input>
      <el-select v-model="language" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button @click="formSubmit">翻译</el-button>
      <!-- <input type="submit" value="翻译"> -->
    </form>
  </div>
</template>

<script>
export default {
  name: "translateForm",
  data() {
    return {
      options: [
        {
          value: "en",
          label: "English"
        },
        {
          value: "ru",
          label: "Russian"
        },
        {
          value: "ko",
          label: "Korean"
        },
        {
          value: "ja",
          label: "Janpenese"
        }
      ],
      textToTranslate: "",
      language: ""
    };
  },
  methods: {
    formSubmit: function(e) {
      e.preventDefault();
      // alert(this.textToTranslate);
      this.$emit("formSubmit", this.textToTranslate, this.language);
    }
  },
  created: function() {
    this.language = "en";
  }
};
</script>

<style lang="scss" scoped>

</style>