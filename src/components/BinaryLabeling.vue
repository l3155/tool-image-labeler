<template>
  <div>
    <div class="image-area">
      <basic-labeling
      :initLabelCoordinate="currentLabelCoordinate"
      :currentLabel="currentLabel"
      :mysrc="mysrc"
      :labelType="labelType"
      @onCoordinateChange="refreshCoordinate"
      v-if="isLabelingShow"></basic-labeling>
    </div>
    <div>
      <el-button type="success" class="lb" size="mini" @click="postImageData('pass')">良品</el-button>
      <el-button type="danger" class="lb" size="mini" @click="postImageData('fail')">不良</el-button>
    </div>
    <el-divider></el-divider>
    <div>
      <basic-table :tableData="tableData" v-if="isTableShow" @rework="getHistoryImage"></basic-table>
    </div>
  </div>
</template>

<script>
import BasicLabeling from './BasicLabeling.vue'
import BasicTable from './BasicTable.vue'
export default {
  components: {
    'basic-labeling': BasicLabeling,
    'basic-table': BasicTable
  },
  data () {
    return {
      tableData: [],
      mysrc: '',
      labelType: 'single',
      currentLabelCoordinate: [],
      currentLabel: 'normal',
      isLabelingShow: false,
      isTableShow: false,
      id: ''
    }
  },
  mounted () {
    this.getImageData()
    this.getTableData()
  },
  methods: {
    refreshCoordinate (data) {
      this.currentLabelCoordinate = data
    },
    getHistoryImage (qid) {
      this.getImageData(qid)
    },
    getImageData (queryID) {
      this.currentLabelCoordinate = []
      let params = {
        role: window.sessionStorage.getItem('role'),
        id: queryID
      }
      this.$http.get('/get_label_position', { params: params }).then((res) => {
        this.isLabelingShow = false
        this.currentLabelCoordinate = res.data.pos
        this.mysrc = res.data.img
        this.id = res.data.id
        this.isLabelingShow = true
      })
    },
    getTableData () {
      let params = {
        role: window.sessionStorage.getItem('role'),
        limit: 'single'
      }
      this.$http.get('/get_label_history', { params: params }).then((res) => {
        this.isTableShow = false
        this.tableData = res.data
        this.isTableShow = true
      })
    },
    postImageData (tag) {
      let label = this.currentLabelCoordinate[0]
      label.label = tag
      var updateData = {
        id: this.id,
        label: [label],
        role: window.sessionStorage.getItem('role')
      }
      this.$http.post('/update_label_position', updateData).then((res) => {
        if (res.data === 'success') {
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success'
          })
          this.getImageData()
          this.getTableData()
        } else {
          this.$notify.error({
            title: '错误',
            message: '更新失败'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.image-area {
  min-height: 180px
}
</style>
