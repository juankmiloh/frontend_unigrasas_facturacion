<template>
  <div :class="className" :style="{height:height,width:width,display:'none'}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

const animationDuration = 3000

export default {
  props: {
    data: {
      type: Array,
      default: function() { return [] }
    },
    valueTitle: {
      type: String,
      default: 'Valor'
    },
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '600px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    data: function(newVal, oldVal) {
      this.$el.style.display = null
      this.initChart(newVal)
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHandler)
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart(data) {
      this.chart = echarts.init(this.$el, 'macarons')

      if (!data) return

      var values = []
      for (var i = 0; i < data.length; i++) {
        values.push({
          value: data[i].values,
          name: data[i].names.length > 45 ? data[i].names.substring(0, 45) + '..' : data[i].names })
      }
      console.log(values)
      this.chart.setOption({
        backgroundColor: '#344b58',
        title: {
          text: this.valueTitle,
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ffffff'
          }
        },
        series: [{
          name: this.valueTitle,
          type: 'pie',
          stack: 'vistors',
          barWidth: '60%',
          data: values,
          animationDuration,
          label: {
            formatter: '{b}:  {d}%'
          }
        }]
      })
    }
  }
}
</script>
