<template>
  <section>
    <!-- tabbar -->
    <el-row class="tabbar">
      <el-form :inline="true" :model="filter">
        <el-form-item>
          <el-input v-model="filter.name" placeholder="name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getData">search</el-button>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="addNewConsumer">add</el-button>
        </el-form-item>
      </el-form>
    </el-row>

    <!-- table -->
    <el-table
      :data="consumers"
      heightlight-current-row
      style="width:100%"
      height="500"
      @selection-change="selChanged"
      v-loading="loading">
      <el-table-column type="selection" width="50" fixed>
			</el-table-column>
			<el-table-column type="index" width="60" fixed>
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="100" sortable>
			</el-table-column>
			<el-table-column prop="sex" label="性别" width="100" sortable :formatter="formatSex">
			</el-table-column>
			<el-table-column prop="age" label="年龄" width="100" sortable>
			</el-table-column>
			<el-table-column prop="birth" label="生日" width="150" sortable>
			</el-table-column>
      <el-table-column prop="phone" label="电话" width="150">
			</el-table-column>
			<el-table-column prop="addr" label="地址" min-width="200" sortable>
			</el-table-column>
			<el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button size="small" @click="consumerEdit(scope.$index,scope.row)">edit</el-button>
          <el-button size="small" @click="consumerRemove(scope.$index,scope.row)" type="danger">remove</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- toolbar -->
    <el-row>
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0" style="float:left">batchRemove</el-button>
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="20"
        style="float:right"
        @current-change="currentChanged">
      </el-pagination>
    </el-row>
    <!-- </section> -->

    <el-dialog
      title="consumer"
      :visible.sync="dialogVisible"
      width="500px">
      <add-consumer :inputForm="inputForm" :dialogVisible="dialogVisible" @refresh='getData' @visable="dialogVisible=false"></add-consumer>
    </el-dialog>
  </section>
</template>

<script>
import {getConsumerListPage, removeConsumer, batchRemoveConsumer, editConsumer, addConsumer } from '../../api/api.js';
import AddConsumer from './AddConsumer'
export default {
  name: 'JWTable',
  components:{
    AddConsumer
  },
  data () {
    return {
      filter:{
        name:""
      },
      consumers:[],
      page:1,
      total:0,
      sels:[],
      dialogVisible: false,
      inputForm:{
        id: 0,
        name: '',
        sex: -1,
        age: 0,
        birth: '',
        addr: '',
        phone:''
      },
      loading:false
    }
  },
  methods:{
    formatSex(row){
      return row.sex == 1 ? '男' : '女';
    },
    selChanged(sels){
      this.sels = sels;
    },
    getData(){
      // console.log("refresh");
      this.loading=true;
      let para = {
        page:this.page,
        name:this.filter.name
      };
      getConsumerListPage(para).then((res) => {
        this.consumers = res.data.consumers;
        this.total = res.data.total;
        this.loading=false;
      });
      
    },
    currentChanged(val){
      this.page = val;
      this.getData();
    },
    batchRemove(){
      this.$confirm("confirm?","warning",{
        type:'warning'
      }).then(() => {
        let ids = this.sels.map(item => item.id).toString();
        let para = {ids:ids};
        batchRemoveConsumers(para).then((res) => {
          this.$message({
            message:'success',
            type:'success'
          });
        });
        this.getData();
      }).catch(() => {

      });
    },
    consumerEdit(index,row){
      // console.log(index);
      // console.log(row);
      this.inputForm.id = row.id;
      this.inputForm.name = row.name;
      this.inputForm.sex = row.sex;
      this.inputForm.age = row.age;
      this.inputForm.addr = row.addr;
      this.inputForm.birth = row.birth;
      this.inputForm.phone = row.phone;
      this.dialogVisible=true;
    },
    consumerRemove(index,row){
      this.$confirm("Confirm?","warning",{
        type:'warning'
      }).then(() => {
        let para = {id:row.id};
        removeConsumer(para).then((res) => {
          this.$message({
            message:"success",
            type:"success"
          });
          this.getData();
        });
      }).catch(() => {

      });
    },
    addNewConsumer(){
      this.inputForm = {
                          id: 0,
                          name: '',
                          sex: -1,
                          age: 0,
                          birth: '',
                          addr: '',
                          phone:""
                        };
      this.dialogVisible=true;
    }
  },
  mounted(){
    this.getData();
  }
  // watch:{
  //   dialogVisible:{
  //   }
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .hide {
  display: none;
} */
.el-row {
  height:60px;
  line-height: 40px;
  text-align: left;
}
.el-form-item {
  margin-bottom: 0;
  /* line-height: 60px; */
  padding: 10px 0;
}
/* .el-form-item__content {
  line-height: 60px;
} */

</style>