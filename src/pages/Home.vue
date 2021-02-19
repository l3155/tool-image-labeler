<template>
<el-container>
  <el-header>
    <nav-header></nav-header>
  </el-header>
  <el-main>
    <router-view/>
  </el-main>
  <el-footer>
    <p style="color:#C0C4CC; font-size:12px">任何疑问咨询IT 张军军(ZhangJunjun)</p>
  </el-footer>
</el-container>
</template>

<script>
import NavHeader from '../components/NavHeader.vue'
export default {
  data () {
    return {}
  },
  components: {
    'nav-header': NavHeader
  },
  methods: {}
}
</script>
<style scoped>
.el-main {
  min-height: 610px;
}
</style>
