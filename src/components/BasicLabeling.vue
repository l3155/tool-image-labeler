<template>
  <div class="mycanvas-container">
    <div class="center">
      <div class="myedit" ref="myedit" @mousedown.prevent="onMousedown" @mousemove="onMousemove" @contextmenu.prevent="">
        <img :src="mysrc"/>
        <span
          class="myedit-span"
          v-for="(item, index) in labelCoordinate"
          :key="index"
          :style="getSpanStyle(item)"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      labelStyle: '2px dashed #afdfe4',
      labelCoordinate: [],
      labelStyleMap: {
        pass: '2px dashed green',
        fail: '2px dashed red',
        normal: '2px dashed #afdfe4'
      }
    }
  },
  props: ['initLabelCoordinate', 'currentLabel', 'mysrc', 'labelType'],
  watch: {
    'currentLabel': 'changeLabelStyle',
    'mysrc': 'initData'
  },
  mounted () {
    document.addEventListener('mouseup', this.onMouseup)
    this.initData()
  },
  beforeDestroy () {
    document.removeEventListener('mouseup', this.onMouseup)
  },
  methods: {
    initData () {
      this.labelCoordinate = this.initLabelCoordinate
    },
    getXY (e) {
      let rect = this.$refs.myedit.getBoundingClientRect()
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    },
    onMousedown (e) {
      if (this.labelType === 'single') {
        this.labelCoordinate = []
      }
      let { x, y } = this.getXY(e)
      this.currentItem = { x, y, w: 0, h: 0 }
      this.startPos = { x, y }
      if (this.labelType === 'multi') {
        this.currentItem.label = this.currentLabel
      }
      this.labelCoordinate.push(this.currentItem)
    },
    onMousemove (e) {
      if (!this.currentItem) return
      let { x, y } = this.getXY(e)
      this.currentItem.w = Math.abs(x - this.startPos.x)
      this.currentItem.h = Math.abs(y - this.startPos.y)
    },
    onMouseup (e) {
      this.currentItem = this.startPos = null
      if (this.labelCoordinate.length > 0) {
        this.labelCoordinate = this.labelCoordinate.filter(_ => _.w > 10 && _.h > 10)
        this.$emit('onCoordinateChange', this.labelCoordinate)
      }
    },
    getSpanStyle (item) {
      let myStyle = {
        width: item.w + 'px',
        height: item.h + 'px',
        top: item.y + 'px',
        left: item.x + 'px'
      }
      if (this.labelType === 'single') {
        myStyle.border = this.labelStyleMap.normal
      } else {
        myStyle.border = this.labelStyleMap[item.label]
      }
      return myStyle
    },
    changeLabelStyle () {
      this.labelStyle = this.labelStyleMap[this.currentLabel]
    }
  }
}
</script>

<style scoped>
body {
  user-select: none
}

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
