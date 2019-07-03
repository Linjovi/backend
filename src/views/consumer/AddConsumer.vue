<template>
  <div class="add">
    <!-- <span>{{inputForm}}</span> -->
    <el-form :model="inputForm" :rules="rules" ref="inputForm" label-width="80px" style="margin:10px;">
        <el-form-item label="姓名" prop="name">
            <el-input v-model="inputForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
            <el-radio-group v-model="inputForm.sex">
                <el-radio class="radio" :label="1">男</el-radio>
                <el-radio class="radio" :label="0">女</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
            <el-input-number v-model="inputForm.age"></el-input-number>
        </el-form-item>
        <el-form-item label="生日">
            <el-date-picker type="date" placeholder="选择日期" v-model="inputForm.birth" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
            <el-input v-model="inputForm.phone" placeholder="11位电话"></el-input>
        </el-form-item>
        <el-form-item label="地址">
            <el-input type="textarea" v-model="inputForm.addr"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit(inputForm)">提交</el-button>
    </div>
  </div>
</template>

<script>
import { editConsumer, addConsumer } from '../../api/api.js'
import {isvalidPhone} from '../../../config/validate.js'

export default {
  name: 'AddConsumer',
//   props:['inputForm'],
  props:{
      inputForm:{
          type:Object
      },
      dialogVisible:{
          type:Boolean
      }
  },
  data () {
    var validatePhone = (rule, value, callback) => {
        if(!value){
            callback(new Error("输入手机号"));
        }else if(!isvalidPhone(value)){
            callback(new Error("输入正确的手机号"));
        }else{
            callback();
        }
    }

    return {
        // inputForm:this.props
        rules:{
            name:[
                {required: true,message:'name',trigger:'blur'}
            ],
            phone:[
                {required:true,validator:validatePhone,trigger:'blur'},
                // {required: true,message:'name',trigger:'blur'}
            ]
        }
    }
  },
  methods:{
      submit(inputForm){
          console.log(inputForm);
          this.$refs.inputForm.validate((valid) => {
                if(valid){
                    let para = Object.assign({},inputForm);
                        
                    this.$confirm("confirm?","tip",{}).then(() => {
                        if(inputForm.id == 0){
                            addConsumer(para).then((res) => {
                                this.$message({
                                    message:"success",
                                    type:"success"
                                });
                            });
                        }else{
                            editConsumer(para).then((res) => {
                                this.$message({
                                    message:"success",
                                    type:"success"
                                });
                            });
                        }
                        this.$emit('refresh',true);
                        this.$emit('visable',true);
                    }).catch(() => {

                    });
                }
          })

      },
      cancel(){
        this.$emit('visable',true);
        
      }
  },
  watch:{
      'dialogVisible':function(old,newval){
          this.$refs["inputForm"].resetFields();
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
