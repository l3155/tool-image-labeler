<template>
  <div class="mycanvas-container">
    <div class="center">
      <div class="myedit" ref="myedit" @mousedown.prevent="onMousedown" @mousemove="onMousemove" @contextmenu.prevent="">
        <img :src="mysrc" />
        <span
          class="myedit-span"
          v-for="(item, index) in mydata"
          :key="index"
          :style="getSpanStyle(item)"
        ></span>
      </div>
    </div>
    <div class="right">
      <el-button type="success" class="lb" size="mini" @click="updateLabelPosition('pass')">良品</el-button>
      <el-button type="danger" class="lb" size="mini" @click="updateLabelPosition('fail')">不良</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mysrc: '',
      mydata: [],
      labelColor: {
        pass: '2px dashed green',
        fail: '2px dashed red',
        normal: '2px dashed #afdfe4'
      },
      mymenu: { current: null, style: { left: 0, top: 0 } },
      prevId: '',
      id: '',
      searchId: ''
    }
  },
  watch: {
    'change': 'goBack'
  },
  props: ['role', 'change'],
  mounted () {
    document.addEventListener('mouseup', this.onMouseup)
    this.getLabelPosition()
  },
  beforeDestroy () {
    document.removeEventListener('mouseup', this.onMouseup)
  },
  methods: {
    getXY (e) {
      let rect = this.$refs.myedit.getBoundingClientRect()
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    },
    goBack () {
      if (this.prevId !== '') {
        this.searchId = this.prevId
        this.mydata = []
        this.$http.get('/get_label_position?role=' + this.role + '&id=' + this.searchId).then((res) => {
          this.prevId = ''
          console.log(res.data.pos)
          this.mydata.push(res.data.pos)
          this.mysrc = res.data.img
          this.id = res.data.id
        })
      } else {
        this.$message('仅能回退一张')
      }
    },
    getLabelPosition () {
      this.mydata = []
      this.$http.get('/get_label_position?role=' + this.role + '&id=0').then((res) => {
        this.mydata.push(res.data.pos)
        this.mysrc = res.data.img
        this.id = res.data.id
      })
    },
    updateLabelPosition (label) {
      var updateData = {
        id: this.id,
        position: this.mydata[0],
        label: label,
        role: this.role
      }
      this.$http.post('/update_label_position', updateData).then((res) => {
        if (res.data === 'success') {
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success'
          })
          this.prevId = this.id
          this.getLabelPosition()
        } else {
          this.$notify.error({
            title: '错误',
            message: '更新失败'
          })
        }
      })
    },
    onMousedown (e) {
      this.mydata = []
      // this.mymenu.current = null
      let { x, y } = this.getXY(e)
      this.currentItem = { x, y, w: 0, h: 0 }
      this.startPos = { x, y }
      // this.mydata[0] = this.currentItem'
      this.mydata.push(this.currentItem)
    },
    onMousemove (e) {
      if (!this.currentItem) return
      let { x, y } = this.getXY(e)
      this.currentItem.w = Math.abs(x - this.startPos.x)
      this.currentItem.h = Math.abs(y - this.startPos.y)
    },
    onMouseup (e) {
      this.currentItem = this.startPos = null
      this.mydata = this.mydata.filter(_ => _.w > 10 && _.h > 10)
      console.log(this.mydata)
    },
    // onRemoveItem () {
    //   this.mydata.splice(this.mydata.indexOf(this.mymenu.current), 1)
    //   // this.mymenu = { ...this.mymenu, current: null }
    // },
    getSpanStyle (item) {
      return {
        // width: `${item.w}px`,
        // height: `${item.h}px`,
        // top: `${item.y}px`,
        // left: `${item.x}px`
        width: item.w + 'px',
        height: item.h + 'px',
        top: item.y + 'px',
        left: item.x + 'px',
        border: this.labelColor.normal
      }
    }
  }
}
</script>

<style scoped>
body {
  user-select: none
}

.myMenu {
  position: fixed;
  top: 400px;
  left: 400px;
  width: 100px;
  padding: 8px 0;
  background-color: #fff;
}
.myMenu > * {width: 100%;}

.lb {
  margin: 20px
}

#canvas > div {
  /* border: 2px solid green; */
  position: absolute;
  background-color: transparent;
}

#canvas > div > span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: simsun;
  font-size: 9pt;
}

.mycanvas-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.left .center .right {
  margin: 10px;
}

p {
  text-align: center;
}

.myshow,
.myedit {
  /* border: 1px solid #000; */
  position: relative;
}

.myedit-span {
  position: absolute;
  /* border: 1px dashed red; */
  background-size: contain;
}

.mycanvas {
  border: 1px solid pink;
  position: absolute;
  top: 0;
  left: 0;
}

img {
  width: 100%;
}

.right {
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: left;
  flex-direction: column;
}
</style>
