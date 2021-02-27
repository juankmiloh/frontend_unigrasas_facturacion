<template>
  <el-card class="container-table">
    <div slot="header" class="clearfix">
      <span>Listado de {{ nametable }}</span>
      <transition name="el-zoom-in-center">
        <el-button v-show="show || datatable.length" :loading="downloadLoading" style="float: right; padding: 3px 0;" size="small" type="text" icon="el-icon-download" @click="handleDownload">
          <span><b>Exportar a Excel</b></span>
        </el-button>
      </transition>
    </div>
    <div v-loading="loading" style="border: 0px solid red; width: 100%; z-index: 0;" :style="{ height: x.matches ? heightxs : '40vh' }">
      <transition v-if="!loading && tablecolumns.length" name="el-fade-in-linear">
        <el-table
          v-show="!loading && tablecolumns.length"
          ref="tableComponent"
          :data="datatable"
          height="100%"
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
            v-for="column in tablecolumns"
            :key="column.label"
            :label="column.label"
            :prop="column.prop"
            :width="x.matches && !landscape.matches ? column.width_xs : column.width"
            align="center"
            sortable
          >
            <template slot-scope="scope">
              <div v-if="column.prop === 'label'"><el-tag type="primary" size="mini">{{ scope.row[column.prop] | uppercaseFirst }}</el-tag></div>
              <div v-else-if="column.prop === 'precio' || column.prop === 'total'">$ {{ scope.row[column.prop] | formatNumber }}</div>
              <div v-else-if="column.prop === 'cantidad'">{{ scope.row[column.prop] | formatNumber }}</div>
              <div v-else>{{ scope.row[column.prop] }}</div>
            </template>
          </el-table-column>
        </el-table>
      </transition>
      <div v-else class="msg-not-data">
        <el-image
          v-show="true"
          style="width: 100%; height: 100%"
          :src="imgNotFound"
          fit="contain"
        />
      </div>
    </div>
  </el-card>
</template>

<script>
import moment from 'moment'
import imgNotFound from '@/assets/not_found.png'
export default {
  props: {
    datatable: {
      type: Array,
      default: null
    },
    tablecolumns: {
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
    },
    heightxs: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      search: '',
      downloadLoading: false,
      multipleSelection: [],
      filename: '',
      show: false,
      currentDate: moment(new Date()).format('DDMMYYYY'),
      x: '',
      landscape: false,
      imgNotFound: imgNotFound
    }
  },
  watch: {
    datatable: {
      deep: true,
      handler(val) {
        // console.log(`Cambia datatable -> ${this.nametable}`, val)
        if (val.length) {
          this.show = true
        } else {
          this.show = false
        }
      }
    }
  },
  created() {
    this.x = window.matchMedia('(max-width: 800px)')
    this.landscape = window.matchMedia('(orientation: landscape)')
  },
  methods: {
    handleSelectionChange(val) {
      // console.log('handleSelectionChange -> ', val)
      const arrayIds = []
      for (const iterator of val) {
        arrayIds.push(iterator.id)
      }
      if (val.length) {
        this.multipleSelection = val
        this.$emit('tableids', arrayIds)
      } else {
        this.multipleSelection = []
        this.$emit('tableids', [])
      }
    },
    async handleDownload() {
      // console.log(this.multipleSelection)
      if (this.multipleSelection.length) {
        this.downloadLoading = true
        await import('@/vendor/Export2Excel').then(async excel => {
          const tHeader = []
          const filterVal = []
          for (const iterator of this.tablecolumns) {
            tHeader.push(iterator.label)
            filterVal.push(iterator.prop)
          }
          const list = this.multipleSelection
          const data = this.formatJson(filterVal, list)
          await excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: `${this.nametable} - ${this.currentDate}`
          })
        })
        // this.$refs.tableComponent.clearSelection()
        // this.multipleSelection = []
        this.downloadLoading = false
      } else {
        this.$message({
          message: `Seleccione al menos un ${this.nametable}`,
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
            if (column.property !== 'id') {
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
  .container-table {
    /* z-index: 0; */
    width: 100%;
    height: 100%;
    /* box-shadow: 1px 1px 4px 1px #DCDFE6; */
    border: 0px solid blue;
    /* border-radius: 4px; */
  }

  .pane-container-text {
    padding: 3px 3px 3px 23px;
    border: 0px solid #4CAF50;
    /* text-align: justify; */
    background: #E1835F;
    color: white;
    display: flex;
    align-items: center;
    border-radius: 4px 4px 0px 0px;
    height: 2.3em;
  }

  .msg-not-data {
    border: 0px solid red;
    background: white;
    color: #909399;
    justify-content: center;
    align-items: center;
    display: flex;
    font-size: small;
    width: 100%;
    height: 90%;
    pointer-events: none;
    user-select: none;
  }

  .table-class {
    /* border: 10px solid blue; */
    /* z-index: 0; */
    width: 100%;
    border: 1px solid #F2F6FC;
    border-radius: 0px 0px 4px 4px;
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
