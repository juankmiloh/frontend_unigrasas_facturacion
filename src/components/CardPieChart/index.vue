<template>
  <el-card style="height: 100%">
    <div slot="header" class="clearfix">
      <span>{{ title }}</span>
      <transition name="el-zoom-in-center">
        <el-button
          v-show="show"
          style="float: right; padding: 3px 0"
          size="small"
          type="text"
        >
          <span><b>Ver detalle ></b></span>
        </el-button>
      </transition>
    </div>
    <div v-loading="load" style="border: 0px solid; height: 100%; z-index: 0;">
      <pie-chart v-if="show" :chart-data="piedata" />
      <div v-else class="msg-not-data">Sin Datos</div>
    </div>
  </el-card>
</template>

<script>
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
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: false,
      load: false
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
  }
</style>

