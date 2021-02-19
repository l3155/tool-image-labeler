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
      <el-tag
        :key="index"
        v-for="(tag, index) in labelTags"
        effect="dark"
        :color="tag.color"
        :disable-transitions="false"
        @click="handleSelect(tag)"
        @close="handleClose(tag)">
        {{tag.name}}
      </el-tag>
      <!-- <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button> -->
    </div>
    <div>
      <el-button type="success" class="lb" size="mini" @click="postImageData">提交</el-button>
      <el-button class="lb" size="mini" @click="handleClear">清除</el-button>
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
      labelType: 'multi',
      currentLabelCoordinate: [],
      currentLabel: 'normal',
      isLabelingShow: false,
      isTableShow: false,
      id: '',
      labelTags: [
        {
          name: 'pass',
          color: 'green'
        },
        {
          name: 'fail',
          color: 'red'
        }
      ],
      inputVisible: false,
      inputValue: ''
    }
  },
  mounted () {
    this.getImageData()
    this.getTableData()
  },
  methods: {
    handleClose (tag) {
      this.labelTags.splice(this.labelTags.indexOf(tag), 1)
    },
    handleSelect (tag) {
      this.currentLabel = tag.name
      this.$message('当前框选' + this.currentLabel + '标签')
    },
    handleClear () {
      this.currentLabelCoordinate.pop()
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.labelTags.push({name: inputValue, color: 'blue'})
      }
      this.inputVisible = false
      this.inputValue = ''
    },
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
        limit: 'multi'
      }
      this.$http.get('/get_label_history', { params: params }).then((res) => {
        this.isTableShow = false
        this.tableData = res.data
        this.isTableShow = true
      })
    },
    postImageData () {
      var updateData = {
        id: this.id,
        label: this.currentLabelCoordinate,
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
.lb {
  margin: 10px
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
