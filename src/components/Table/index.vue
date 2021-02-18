<template>
  <el-row style="border: 0px solid red; height: 100%;">
    <el-col :span="24">
      <el-row class="pane-container-text">
        <el-col :span="18"><label>VENTAS X {{ nametable | uppercase }}</label></el-col>
        <el-col :span="6">
          <el-button :loading="downloadLoading" style="border: 1px solid #67C23A;" size="mini" type="success" plain icon="el-icon-download" @click="handleDownload">
            <span><b>Exportar a Excel</b></span>
          </el-button>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="24" style="border: 0px solid green; height: 100%;">
      <el-table
        ref="tableComponent"
        v-loading="loading"
        :data="datatable"
        height="93%"
        element-loading-text=""
        border
        show-summary
        :summary-method="getSummaries"
        fit
        size="mini"
        highlight-current-row
        class="table-class"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center" />
        <el-table-column
          v-for="column in tableColumns"
          :key="column.label"
          :label="column.label"
          :prop="column.prop"
          :width="x.matches ? column.width_xs : column.width"
          align="center"
          sortable
        >
          <template slot-scope="scope">
            <div v-if="column.prop === 'precio' || column.prop === 'total'">$ {{ scope.row[column.prop] | formatNumber }}</div>
            <div v-else-if="column.prop === 'cantidad'">{{ scope.row[column.prop] | formatNumber }}</div>
            <div v-else>{{ scope.row[column.prop] }}</div>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    datatable: {
      type: Array,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    nametable: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      search: '',
      downloadLoading: false,
      multipleSelection: [],
      filename: '',
      tableColumns: [{
        label: 'Producto',
        prop: 'label',
        width: '270',
        width_xs: ''
      },
      {
        label: 'Cantidad',
        prop: 'cantidad',
        width: '',
        width_xs: ''
      },
      {
        label: 'Total',
        prop: 'total',
        width: '',
        width_xs: ''
      },
      {
        label: 'Promedio',
        prop: 'precio',
        width: '',
        width_xs: ''
      }],
      x: '',
      currentDate: moment(new Date()).format('DDMMYYYY')
    }
  },
  watch: {
    datatable: {
      deep: true,
      handler(val) {
        // console.log(`Cambia datatable -> ${this.nametable}`, val)
      }
    }
  },
  created() {
    this.x = window.matchMedia('(max-width: 800px)')
  },
  methods: {
    handleSelectionChange(val) {
      // console.log('handleSelectionChange -> ', val)
      if (val.length) {
        this.multipleSelection = val
      }
    },
    handleDownload() {
      // console.log(this.multipleSelection)
      if (this.multipleSelection.length) {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['Producto', 'Cantidad', 'Total', 'Promedio']
          const filterVal = ['label', 'cantidad', 'total', 'precio']
          const list = this.multipleSelection
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: `${this.nametable} - ${this.currentDate}`
          })
          this.$refs.tableComponent.clearSelection()
          this.downloadLoading = false
          this.multipleSelection = []
        })
      } else {
        this.$message({
          message: 'Seleccione al menos una fila',
          type: 'warning'
        })
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      if (data) {
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '='
            return
          }
          if (column.property !== 'precio') {
            const values = data.map(item => Number(item[column.property]))
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr)
                if (!isNaN(value)) {
                  return prev + curr
                } else {
                  return prev
                }
              }, 0)
              if (column.property === 'total') {
                sums[index] = '$ ' + new Intl.NumberFormat('de-DE').format(sums[index])
              } else {
                sums[index] = new Intl.NumberFormat('de-DE').format(sums[index])
              }
            } else {
              sums[index] = 'N/A'
            }
          } else {
            sums[index] = 'N/A'
          }
        })
      }
      return sums
    }
  }
}
</script>

<style scoped>
  .pane-container-text {
    padding: 4px;
    border: 0px solid #4CAF50;
    text-align: center;
    background: #E1835F;
    color: white;
    display: flex;
    align-items: center;
  }

  .table-class {
    z-index: 0;
    width: 100%;
    border: 1px solid #d8ebff;
  }

  /* width */
  .table-class ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  .table-class ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  .table-class ::-webkit-scrollbar-thumb {
    background: #C0C4CC;
  }

  /* Handle on hover */
  .table-class ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
</style>
