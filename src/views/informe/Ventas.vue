<template>
  <div style="border: 0px solid green; background-color: #f7fbff">
    <sticky class-name="sub-navbar">
      <div style="border: 0px solid red; text-align: right">
        <el-button
          style="border: 1px solid #67c23a"
          size="medium"
          icon="el-icon-s-tools"
          circle
          @click="drawer = true"
        />
      </div>
    </sticky>
    <el-row style="border: 1px solid yellow; padding: 14px; background-color: #f7fbff">
      <el-col :xs="24" :sm="24" :md="24" class="cont-barchart-ventas">
        <el-card>
          <div slot="header" class="clearfix">
            <el-row>
              <el-col :sm="24" :md="12" style="padding: 4px;">
                <el-tag type="success" style="font-size: small;"><b>VENTAS TOTALES:</b></el-tag><span style="font-size: small; color: #606266;"><b> ${{ ventas | formatNumber }}</b></span>
              </el-col>
              <el-col :sm="24" :md="12" :style="{ textAlign: x.matches ? '' : 'right'}" style="padding: 4px;">
                <el-tag style="font-size: small;"><b>AÑOS:</b></el-tag><span style="font-size: small; color: #606266;"><b>{{ selectAnos }}</b></span>
                <el-tag style="font-size: small;"><b>MESES:</b></el-tag><span style="font-size: small; color: #606266;"><b>{{ selectMeses }}</b></span>
              </el-col>
            </el-row>
          </div>
          <div style="border: 0px solid red; text-align: center;" :style="{ paddingLeft: x.matches ? '' : '20%', paddingRight: x.matches ? '' : '20%' }">
            <bar-chart class="bar-chart" />
            <div class="msg-not-data">
              <el-image
                v-show="true"
                style="width: 40%; height: 40%"
                :src="imgNotFound"
                fit="contain"
              />
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="z-index: 2;" :style="{ height: x.matches ? '23em' : '56vh' }">
      <el-col :xs="24" :sm="24" :md="24" class="pane-container-text">
        <label>VENTAS X PRODUCTO</label>
      </el-col>
      <el-col
        :xs="24"
        :sm="12"
        :md="13"
        class="class-table-ventas"
      >
        <table-productos
          nametable="productos"
          :datatable="tableDataProductos"
          :tablecolumns="tableColumnProductos"
          :loading="loadTableProductos"
          heightxs="15em"
          @tableids="selectTableProducto"
        />
      </el-col>
      <el-col
        :xs="24"
        :sm="12"
        :md="11"
        class="class-pie-ventas"
      >
        <pie-chart-productos
          namepie="producto"
          title="Clientes X Producto"
          :piedata="pieChartProductos"
          :loadpiedata="loadPieProductos"
          @detallePie="showDialogPie"
        />
      </el-col>
    </el-row>
    <el-row style="z-index: 1;" :style="{ height: x.matches ? '23em' : '56vh' }">
      <el-col :xs="24" :sm="24" :md="24" class="pane-container-text">
        <label>VENTAS X CLIENTE</label>
      </el-col>
      <el-col
        :xs="24"
        :sm="12"
        :md="13"
        class="class-table-ventas"
      >
        <table-clientes
          nametable="clientes"
          :datatable="tableDataClientes"
          :tablecolumns="tableColumnClientes"
          :loading="loadTableClientes"
          heightxs="15em"
          @tableids="selectTableCliente"
        />
      </el-col>
      <el-col
        :xs="24"
        :sm="12"
        :md="11"
        class="class-pie-ventas"
      >
        <pie-chart-clientes
          namepie="cliente"
          :title="`Productos X Cliente`"
          :piedata="pieChartClientes"
          :loadpiedata="loadPieClientes"
          @detallePie="showDialogPie"
        />
      </el-col>
    </el-row>
    <el-row :style="{ height: x.matches ? '23em' : '56vh' }">
      <el-col :xs="24" :sm="24" :md="24" class="pane-container-text">
        <label>VENTAS X VENDEDOR</label>
      </el-col>
      <el-col
        :xs="24"
        :sm="12"
        :md="13"
        class="class-table-ventas"
      >
        <table-usuarios
          nametable="vendedores"
          :datatable="tableDataUsuarios"
          :tablecolumns="tableColumnUsuarios"
          :loading="loadTableUsuarios"
          heightxs="15em"
          @tableids="selectTableUsuario"
        />
      </el-col>
      <el-col
        :xs="24"
        :sm="12"
        :md="11"
        class="class-pie-ventas"
      >
        <pie-chart-usuarios
          namepie="vendedor"
          title="Clientes X Vendedores"
          :piedata="pieChartUsuarios"
          :loadpiedata="loadPieUsuarios"
          @detallePie="showDialogPie"
        />
      </el-col>
    </el-row>

    <!-- Drawer opciones -->

    <drawer-options
      :open="drawer"
      @statusDrawer="handleDrawer"
      @ventas="getVentas"
      @ano="selectTreeAno"
      @mes="selectTreeMes"
      @producto="selectTreeProducto"
      @cliente="selectTreeCliente"
      @loadingProducto="loadProducto"
      @loadingCliente="loadCliente"
      @loadingUsuario="loadUsuario"
      @vendedor="selectTreeUsuario"
    />

    <!-- Cuadro de dialogo para mostrar detalle del piechart -->

    <dialog-pie
      :visible="dialogPieVisible"
      :dialogdata="dataPieDialog"
      :dialogcolumns="columnsPieDialog"
      :title="pieSelectTitle"
      @closeDialogPie="handleDialogPie"
    />
  </div>
</template>

<script>
import imgNotFound from '@/assets/barchart_wait.png'
import Sticky from '@/components/Sticky' // 粘性header组件
import DrawerOptions from './components/MenuDrawer'
import BarChart from '@/components/Charts/BarChart'
import DialogPie from './components/DialogPie'
import tableProductos from '@/components/Table'
import tableClientes from '@/components/Table'
import tableUsuarios from '@/components/Table'
import PieChartProductos from '@/components/CardPieChart'
import PieChartClientes from '@/components/CardPieChart'
import pieChartUsuarios from '@/components/CardPieChart'
import { getListClienteProducto, getListProductoCliente, getListClienteVendedor } from '@/api/unigrasas/informes'

export default {
  name: 'Ventas',
  components: {
    Sticky,
    DrawerOptions,
    BarChart,
    tableProductos,
    tableClientes,
    tableUsuarios,
    PieChartProductos,
    PieChartClientes,
    pieChartUsuarios,
    DialogPie
  },
  data() {
    return {
      selectAnos: [],
      selectMeses: [],
      selectClientes: [],
      selectUsuarios: [],
      selectProductos: [],
      loadTableClientes: false,
      loadTableUsuarios: false,
      loadTableProductos: false,
      tableDataProductos: [],
      tableDataClientes: [],
      tableDataUsuarios: [],
      tableColumnProductos: [],
      tableColumnClientes: [],
      tableColumnUsuarios: [],
      pieChartProductos: {},
      loadPieProductos: false,
      pieChartClientes: {},
      loadPieClientes: false,
      pieChartUsuarios: {},
      loadPieUsuarios: false,
      ventas: 0,
      drawer: false,
      dialogPieVisible: false,
      pieSelect: '',
      pieSelectTitle: '',
      dataPieDialog: [],
      columnsPieDialog: [],
      imgNotFound: imgNotFound,
      x: ''
    }
  },
  created() {
    this.x = window.matchMedia('(max-width: 800px)')
  },
  methods: {
    showDialogPie(val) {
      this.pieSelect = val.pieSelect
      this.pieSelectTitle = val.pieTitle
      this.dialogPieVisible = val.showDialog
      let dataPie = []
      let columnsPie = []
      if (this.pieSelect === 'producto') {
        dataPie = this.pieChartProductos.data
        columnsPie = this.pieChartProductos.columns
      } else if (this.pieSelect === 'cliente') {
        dataPie = this.pieChartClientes.data
        columnsPie = this.pieChartClientes.columns
      } else if (this.pieSelect === 'vendedor') {
        dataPie = this.pieChartUsuarios.data
        columnsPie = this.pieChartUsuarios.columns
      }
      this.dataPieDialog = dataPie
      this.columnsPieDialog = columnsPie
    },
    handleDialogPie(val) {
      this.dialogPieVisible = val
    },
    handleDrawer(val) {
      this.drawer = val
    },
    selectTableProducto(producto) {
      if (producto.length) {
        this.loadPieProductos = true
        this.getDataClienteProducto(producto)
      } else {
        this.pieChartProductos = {}
      }
    },
    selectTableCliente(cliente) {
      if (cliente.length) {
        this.loadPieClientes = true
        this.getDataProductoCliente(cliente)
      } else {
        this.pieChartClientes = {}
      }
    },
    selectTableUsuario(vendedor) {
      if (vendedor.length) {
        this.loadPieUsuarios = true
        this.getDataClienteVendedor(vendedor)
      } else {
        this.pieChartUsuarios = {}
      }
    },
    async getDataClienteProducto(producto) {
      const data = {
        producto: producto,
        ano: this.selectAnos,
        mes: this.selectMeses
      }
      await getListClienteProducto(data).then((response) => {
        this.pieChartProductos = response
        this.loadPieProductos = false
      })
    },
    async getDataProductoCliente(cliente) {
      const data = {
        cliente: cliente,
        ano: this.selectAnos,
        mes: this.selectMeses
      }
      await getListProductoCliente(data).then((response) => {
        this.pieChartClientes = response
        this.loadPieClientes = false
      })
    },
    async getDataClienteVendedor(usuario) {
      const data = {
        usuario: usuario,
        ano: this.selectAnos,
        mes: this.selectMeses
      }
      await getListClienteVendedor(data).then((response) => {
        // console.log(response)
        this.pieChartUsuarios = response
        this.loadPieUsuarios = false
      })
    },
    getVentas(val) {
      this.ventas = val
    },
    selectTreeAno(dataTree) {
      this.selectAnos = dataTree
    },
    selectTreeMes(dataTree) {
      this.selectMeses = dataTree
    },
    loadProducto(val) {
      // console.log('loadProducto -> ', val)
      this.loadTableProductos = val
    },
    async selectTreeProducto(dataTree) {
      // console.log('dataTreeProductos -> ', dataTree)
      this.pieChartProductos = {}
      this.selectProductos = dataTree
      if (Object.entries(dataTree).length) {
        this.tableDataProductos = dataTree['children']
        this.tableColumnProductos = dataTree['tablecolumns']
      } else {
        this.tableDataProductos = []
        this.tableColumnProductos = []
      }
    },
    loadCliente(val) {
      this.loadTableClientes = val
    },
    selectTreeCliente(dataTree) {
      // console.log('dataTreeClientes -> ', dataTree)
      this.pieChartClientes = {}
      this.selectClientes = dataTree
      if (Object.entries(dataTree).length) {
        this.tableDataClientes = dataTree['children']
        this.tableColumnClientes = dataTree['tablecolumns']
      } else {
        this.tableDataClientes = []
        this.tableColumnClientes = []
      }
    },
    loadUsuario(val) {
      // console.log('loadUsuario -> ', val)
      this.loadTableUsuarios = val
    },
    selectTreeUsuario(dataTree) {
      // console.log('dataTreeUsuarios -> ', dataTree)
      this.pieChartUsuarios = {}
      this.selectUsuarios = dataTree
      if (Object.entries(dataTree).length) {
        this.tableDataUsuarios = dataTree['children']
        this.tableColumnUsuarios = dataTree['tablecolumns']
      } else {
        this.tableDataUsuarios = []
        this.tableColumnUsuarios = []
      }
    }
  }
}
</script>

<style lang="scss">
// Pantallas superiores a 800px (PC)
@media screen and (min-width: 800px) {
  .cont-barchart-ventas .el-card__body {
    padding: 0% 0% 1% 0% !important;
  }

  .cont-barchart-ventas .bar-chart {
    top: -10px;
  }
}

// Pantallas inferiores a 800px (mobile)
@media screen and (max-width: 800px) {
  .cont-barchart-ventas .el-card__body {
    padding: 1% 0% 0% 0% !important;
  }

  .cont-barchart-ventas .bar-chart {
    top: -30px;
  }
}
</style>

<style scoped>
.components-container {
  margin: 0%;
  width: 100%;
  height: 100%;
}

.pane-container-dashboard {
  background-color: #f7fbff;
  width: 100%;
  height: 100%;
}

.pane-container-text {
  padding: 10px 3px 3px 3px;
  border: 0px solid #4caf50;
  text-align: center;
  background: #e1835f;
  color: white;
  height: 2.3em;
}

.class-table-ventas {
  border: 0px solid red;
  padding: 14px;
  height: 100%;
  background-color: #f7fbff;
}

.class-pie-ventas {
  border: 0px solid yellow;
  height: 100%;
  padding: 14px;
  background-color: #f7fbff;
}

.msg-not-data {
  border: 0px solid red;
  background: white;
  color: #909399;
  justify-content: center;
  align-items: center;
  display: flex;
  font-size: small;
  pointer-events: none;
  user-select: none;
  /* width: 100%;
  height: 90%; */
}

</style>
