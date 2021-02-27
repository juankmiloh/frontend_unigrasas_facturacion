<template>
  <el-card style="height: 100%;">
    <div slot="header" class="clearfix">
      <span>{{ title }}</span>
      <transition name="el-zoom-in-center">
        <el-button
          v-show="show"
          style="float: right; padding: 3px 0;"
          size="small"
          type="text"
          @click="$emit('detallePie', { 'pieSelect': namepie, 'pieTitle': title, 'showDialog': true})"
        >
          <span><b>Ver detalle ></b></span>
        </el-button>
      </transition>
    </div>
    <div style="border: 0px solid; height: 100%; z-index: 0;">
      <transition v-if="show" name="el-zoom-in-bottom">
        <pie-chart v-show="true" :chart-data="piedata" />
      </transition>
      <transition v-else name="el-zoom-in-bottom">
        <div class="msg-not-data">
          <el-image
            v-show="true"
            style="width: 100%; height: 100%"
            :src="imgNotFound"
            fit="contain"
          />
        </div>
      </transition>
    </div>
  </el-card>
</template>

<script>
import imgNotFound from '@/assets/graph.png'
import PieChart from '@/components/Charts/PieChart'
export default {
  components: {
    PieChart
  },
  props: {
    piedata: {
      type: Object,
      default: null
    },
    loadpiedata: {
      type: Boolean,
      default: false
    },
    namepie: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: false,
      load: false,
      imgNotFound: imgNotFound
    }
  },
  watch: {
    piedata: {
      deep: true,
      handler(val) {
        if (Object.entries(val).length) {
          this.show = true
        } else {
          this.show = false
        }
      }
    },
    loadpiedata: {
      deep: true,
      handler(val) {
        this.load = val
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .msg-not-data {
    border: 0px solid red;
    background: white;
    color: #909399;
    justify-content: center;
    align-items: center;
    display: flex;
    font-size: small;
    width: 100%;
    height: 40vh;
    pointer-events: none;
    user-select: none;
  }
</style>

