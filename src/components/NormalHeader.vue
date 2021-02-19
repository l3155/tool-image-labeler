<template>
<el-row>
  <el-col :span="4">
    <p class="left"><i class="el-icon-s-grid"></i> MFLEX</p>
    <!-- <p class="left" icon="el-icon-search">MFLEX</p> -->
  </el-col>
  <el-col :span="16">
    <p class="middle">AI训练图像标记(AOI图像)</p>
  </el-col >
  <el-col :span="4">
    <el-button type="text" style="color: #909399" @click="changeRole">当前: {{ role=== 0 ?'品质':'工艺' }}</el-button>
  </el-col>
</el-row>
</template>

<script>
export default {
  data () {
    return {
      role: 0
    }
  },
  computed: {
    role_name () {
      return this.role === 0 ? 'pe' : 'qa'
    }
  },
  methods: {
    changeRole () {
      var newRole = !this.role
      this.role = newRole ? 1 : 0
      this.$message(this.role === 0 ? '已切换到品质标记' : '已切换到工艺标记')
    }
  }
}
</script>
<style scoped>
.el-row {
  background-color: #303133;
  padding: 10px;
  color: white;
}
.left {
  float: left;
  margin-top: 13px;
  line-height: 40%
}
.middle {
   line-height: 40%
}
.el-col {
  height: 38px
}
</style>
