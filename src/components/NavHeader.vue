<template>
<el-menu :default-active="activeKey" class="el-menu" mode="horizontal"
  active
  background-color="#303133"
  text-color="#FFFFFF"
  active-text-color="#409EFF"
  @select="handleSelect">
  <el-menu-item index="0" class="my-title"><i class="el-icon-s-grid"></i>MFLEX (Image-labeler)</el-menu-item>
  <el-menu-item index="1">单框二分类</el-menu-item>
  <el-menu-item index="2">多框二分类</el-menu-item>
  <!-- <el-submenu index="1">
    <template slot="title">苏州厂区</template>
    <el-menu-item index="1-1">产出计划制定</el-menu-item>
    <el-menu-item index="1-2">历史缺失数据维护</el-menu-item>
  </el-submenu>
  <el-submenu index="2">
    <template slot="title">盐城厂区</template>
    <el-menu-item index="2-1">产出计划制定</el-menu-item>
    <el-menu-item index="2-2">历史缺失数据维护</el-menu-item>
  </el-submenu> -->
  <!-- <el-button type="text" class="user" icon="el-icon-user-solid" @click="changeRole">{{ role=== 0 ?'品质':'工艺' }}</el-button> -->
  <el-dropdown @command="handleCommand" class="user">
    <span class="el-dropdown-link"><i class="el-icon-user-solid"></i> {{ roleName }}</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="pe">工艺</el-dropdown-item>
      <el-dropdown-item command="qa">品质</el-dropdown-item>
      <!-- <el-dropdown-item command="e" divided>切换</el-dropdown-item> -->
    </el-dropdown-menu>
  </el-dropdown>
</el-menu>
</template>

<script>
export default {
  data () {
    return {
      role: 'pe',
      activeKey: ''
    }
  },
  computed: {
    roleName () {
      return this.role === 'pe' ? '工艺' : '品质'
    }
  },
  watch: {
    'role': 'handleChangeRole'
  },
  mounted () {
    this.setStorageRole()
  },
  methods: {
    handleChangeRole () {
      if (this.activeKey !== '0') {
        this.activeKey = '0'
        this.$router.push('/')
      }
    },
    setStorageRole () {
      sessionStorage.setItem('role', this.role)
    },
    handleCommand (command) {
      this.role = command
      this.setStorageRole()
      this.$message('已切换至 ' + this.roleName)
    },
    handleSelect (key) {
      if (this.activeKey !== key) {
        this.activeKey = key
        if (key === '1') {
          this.$router.push('/binary')
        } else if (key === '2') {
          this.$router.push('/multi')
        } else {
          console.log(key)
          this.$router.push('/')
        }
      }
    }
  }
}
</script>
<style scoped>
.my-title {
  width: 300px;
  text-align: left;
  color:whitesmoke
}
.user {
  color: #909399;
  float:right;
  margin: 20px 30px 20px 10px
}
</style>
