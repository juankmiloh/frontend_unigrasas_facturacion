<template>
  <div style="border: 0px solid green; background-color: purple">
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
    <el-row>
      <el-col
        :xs="24"
        :sm="24"
        :md="24"
        style="border: 1px solid yellow; background-color: #f7fbff"
      >
        <div>
          VENTAS TOTALES - ${{ ventas | formatNumber }}<br><br>
          Años - {{ selectAnos }} | Meses - {{ selectMeses }} <br><br>
          <!-- Clientes - {{ selectClientes }} <br><br>
          Usuarios - {{ selectUsuarios }} <br><br>
          Productos - {{ selectProductos }} <br><br> -->
        </div>
      </el-col>
    </el-row>
    <el-row :style="{ height: x.matches ? '23em' : '56vh' }">
      <el-col :xs="24" :sm="24" :md="24" class="pane-container-text">
        <label>VENTAS X PRODUCTO</label>
      </el-col>
      <el-col
        :xs="24"
        :sm="12"
        :md="13"
        style="
          border: 0px solid red;
          padding: 14px;
          height: 100%;
          background-color: #f7fbff;
        "
      >
        <table-productos
          nametable="producto"
          :datatable="tableDataProductos"
          :tablecolumns="tableColumnProductos"
          :loading="loadTableProductos"
          @tableids="selectTableProducto"
        />
      </el-col>
      <el-col
        :xs="24"
        :sm="12"
        :md="11"
        style="
          border: 0px solid yellow;
          height: 100%;
          padding: 14px;
          background-color: #f7fbff;
        "
      >
        <pie-chart-productos
          namepie="producto"
          :piedata="pieChartProductos"
          :loadpiedata="loadPieProductos"
          title="Productos"
        />
      </el-col>
    </el-row>
    <el-row :style="{ height: x.matches ? '23em' : '56vh' }">
      <el-col :xs="24" :sm="24" :md="24" class="pane-container-text">
        <label>VENTAS X CLIENTE</label>
      </el-col>
      <el-col
        :xs="24"
        :sm="12"
        :md="13"
        style="
          border: 0px solid red;
          padding: 14px;
          height: 100%;
          background-color: #f7fbff;
        "
      >
        <table-clientes
          nametable="cliente"
          :datatable="tableDataClientes"
          :tablecolumns="tableColumnClientes"
          :loading="loadTableClientes"
          @tableids="selectTableCliente"
        />
      </el-col>
      <el-col
        :xs="24"
        :sm="12"
        :md="11"
        style="
          border: 0px solid yellow;
          height: 100%;
          padding: 14px;
          background-color: #f7fbff;
        "
      >
        <pie-chart-clientes
          namepie="cliente"
          :piedata="pieChartClientes"
          :loadpiedata="loadPieClientes"
          :title="`Productos X Cliente`"
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
        style="
          border: 0px solid red;
          padding: 14px;
          height: 100%;
          background-color: #f7fbff;
        "
      >
        <table-usuarios
          nametable="usuario"
          :datatable="tableDataUsuarios"
          :tablecolumns="tableColumnUsuarios"
          :loading="loadTableUsuarios"
          @tableids="selectTableUsuario"
        />
      </el-col>
      <el-col
        :xs="24"
        :sm="12"
        :md="11"
        style="
          border: 0px solid yellow;
          height: 100%;
          padding: 14px;
          background-color: #f7fbff;
        "
      >
        <pie-chart-usuarios
          namepie="usuario"
          :piedata="pieChartUsuarios"
          :loadpiedata="loadPieUsuarios"
          title="Clientes X Vendedor"
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
  </div>
</template>

<script>
import Sticky from '@/components/Sticky' // 粘性header组件
import DrawerOptions from './components/MenuDrawer'
import tableProductos from '@/components/Table'
import tableClientes from '@/components/Table'
import tableUsuarios from '@/components/Table'
import PieChartProductos from '@/components/CardPieChart'
import PieChartClientes from '@/components/CardPieChart'
import pieChartUsuarios from '@/components/CardPieChart'
import { getListProductoCliente } from '@/api/unigrasas/informes'

export default {
  name: 'Ventas',
  components: {
    Sticky,
    DrawerOptions,
    tableProductos,
    tableClientes,
    tableUsuarios,
    PieChartProductos,
    PieChartClientes,
    pieChartUsuarios
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
      x: ''
    }
  },
  created() {
    this.x = window.matchMedia('(max-width: 800px)')
  },
  methods: {
    handleDrawer(val) {
      this.drawer = val
    },
    selectTableProducto(producto) {
      console.log(producto)
    },
    selectTableCliente(cliente) {
      console.log(cliente)
      if (cliente.length) {
        this.loadPieClientes = true
        this.getDataProductoCliente(cliente)
      } else {
        this.pieChartClientes = {}
      }
    },
    selectTableUsuario(vendedor) {
      console.log(vendedor)
    },
    async getDataProductoCliente(cliente) {
      const data = {
        cliente: cliente,
        ano: this.selectAnos,
        mes: this.selectMeses
      }
      await getListProductoCliente(data).then((response) => {
        this.pieChartClientes = response['pagado']
        this.loadPieClientes = false
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
      console.log('loadProducto -> ', val)
      this.loadTableProductos = val
    },
    async selectTreeProducto(dataTree) {
      // console.log('dataTreeProductos -> ', dataTree)
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
      console.log('loadUsuario -> ', val)
      this.loadTableUsuarios = val
    },
    selectTreeUsuario(dataTree) {
      // console.log('dataTreeUsuarios -> ', dataTree)
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
</style>
