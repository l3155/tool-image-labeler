<template>
<el-table
  :data="tableData"
  border
  size="mini"
  style="font-size: 12px"
  >
  <el-table-column v-for="(item, index) in colunmName" :key="index" :label="item">
    <template slot-scope="scope">
      <span>{{scope.row[item]}}</span>
    </template>
  </el-table-column>
  <el-table-column
    label="picture_path"
    align="center"
    width="550px">
    <template slot-scope="scope">
      <span>{{ scope.row.picture_path }}</span>
    </template>
  </el-table-column>
  <el-table-column
    align="center"
    label="action">
    <template slot-scope="scope">
      <el-button @click="handleEdit(scope.row)" icon="el-icon-edit" type="text" circle></el-button>
    </template>
  </el-table-column>
</el-table>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: [ 'tableData' ],
  mounted () {},
  methods: {
    handleEdit (row) {
      this.$emit('rework', row.id)
    }
  },
  computed: {
    colunmName () {
      let newColumnName = []
      if (this.tableData[0]) {
        let oldColumnName = Object.keys(this.tableData[0])
        for (var i = 0; i < oldColumnName.length; i++) {
          if (oldColumnName[i] !== 'picture_path') {
            newColumnName.push(oldColumnName[i])
          }
        }
      }
      return newColumnName
    }
  }
}
</script>
<style scoped>
</style>
