<template>
  <div style="border: 0px solid green; background-color: purple;">
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
      <el-col :xs="24" :sm="24" :md="24" style="border: 1px solid yellow; background-color: #f7fbff;">
        <div>
          VENTAS TOTALES - ${{ ventas | formatNumber }}<br><br>
          Años - {{ selectAnos }} | Meses - {{ selectMeses }} <br><br>
          Clientes - {{ selectClientes }} <br><br>
          Usuarios - {{ selectUsuarios }} <br><br>
          Productos - {{ selectProductos }} <br><br>
        </div>
      </el-col>
    </el-row>
    <!-- <el-row style="border: 0px solid; height: 56vh;">
      <el-col :xs="24" :sm="24" :md="24" class="pane-container-text">
        <label>VENTAS X PRODUCTO</label>
      </el-col>
      <el-col :xs="24" :sm="12" :md="13" style="border: 0px solid red; padding: 14px; height: 100%; background-color: #f7fbff;">
        <table-productos
          nametable="producto"
          :datatable="tableDataProductos"
          :tablecolumns="tableColumnProductos"
          :loading="loadProductos"
        />
      </el-col>
      <el-col :xs="24" :sm="12" :md="11" style="border: 0px solid yellow; height: 100%; padding: 14px; background-color: #f7fbff;">
        <el-card style="height: 100%;">
          <div slot="header" class="clearfix">
            <span>Detalle</span>
          </div>
          <div style="border: 0px solid; height: 100%;">
            <pie-chart-clientes :chart-data="pieChartClientes" />
          </div>
        </el-card>
      </el-col>
    </el-row> -->
    <el-row :style="{ height: x.matches ? '23em' : '56vh' }">
      <el-col :xs="24" :sm="24" :md="24" class="pane-container-text">
        <label>VENTAS X CLIENTE</label>
      </el-col>
      <el-col :xs="24" :sm="12" :md="13" style="border: 0px solid red; padding: 14px; height: 100%; background-color: #f7fbff;">
        <table-clientes
          nametable="cliente"
          :datatable="tableDataClientes"
          :tablecolumns="tableColumnClientes"
          :loading="loadClientes"
          @tableids="selectTableCliente"
        />
      </el-col>
      <el-col :xs="24" :sm="12" :md="11" style="border: 0px solid yellow; height: 100%; padding: 14px; background-color: #f7fbff;">
        <el-card style="height: 100%;">
          <div slot="header" class="clearfix">
            <span>Detalle productos cliente</span>
          </div>
          <div v-loading="loadPieClientes" style="border: 0px solid; height: 100%;">
            <pie-chart-clientes v-if="pieClientes" :chart-data="pieChartClientes" />
            <div v-else class="msg-not-data">Sin Datos</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- Drawer opciones -->
    <el-drawer
      title="I am the title"
      :visible.sync="drawer"
      :with-header="false"
      show-close
      :size="x.matches ? '90%' : '35%'"
    >
      <div style="border: 0px solid red; height: 100vh; overflow: auto; background: #f7d9cd;">
        <el-row :style="{ height: x.matches ? '3em' : '6vh' }">
          <el-col :xs="24" :md="24" style="border: 1px solid green; height: 100%;">
            <sticky class="sub-navbar">
              <div style="border: 0px solid red; text-align: right;">
                <el-button
                  style="border: 1px solid #67c23a"
                  type="warning"
                  size="mini"
                  @click="drawer = false"
                ><b>X</b></el-button>
              </div>
            </sticky>
          </el-col>
        </el-row>
        <el-row :style="{ height: x.matches ? '10em' : '22vh' }">
          <el-col :xs="12" :md="12" style="height: 100%;">
            <tree-anos
              :datatree="listaAnos"
              nametree="año"
              :loading="loadAnos"
              @selected="submitSelectAnos"
            />
          </el-col>
          <el-col :xs="12" :md="12" style="height: 100%;">
            <tree-meses
              :datatree="listaMeses"
              nametree="mes"
              :loading="loadMeses"
              @selected="submitSelectMeses"
            />
          </el-col>
        </el-row>
        <el-row :style="{ height: x.matches ? '10em' : '24vh' }">
          <el-col :xs="24" :md="24" style="height: 100%;">
            <tree-productos
              :datatree="listaProductos"
              nametree="productos"
              :loading="loadProductos"
              @selected="submitSelectProductos"
            />
          </el-col>
        </el-row>
        <el-row :style="{ height: x.matches ? '10em' : '24vh' }">
          <el-col :xs="24" :md="24" style="height: 100%;">
            <tree-clientes
              :datatree="listaClientes"
              nametree="clientes"
              :loading="loadClientes"
              @selected="submitSelectClientes"
            />
          </el-col>
        </el-row>
        <el-row :style="{ height: x.matches ? '10em' : '24vh' }">
          <el-col :xs="24" :md="24" style="height: 100%;">
            <tree-usuarios
              :datatree="listaUsuarios"
              nametree="vendedores"
              :loading="loadUsuarios"
              @selected="submitSelectUsuarios"
            />
          </el-col>
        </el-row>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky' // 粘性header组件
import { getListAnios, getListMeses, getListClientes, getListUsuarios, getListProductos, getListVentasAno, getListVentasAnoMes } from '@/api/unigrasas/ventas'
import treeAnos from '@/components/TreeOptions'
import treeMeses from '@/components/TreeOptions'
import treeClientes from '@/components/TreeOptions'
import treeUsuarios from '@/components/TreeOptions'
import treeProductos from '@/components/TreeOptions'
// import tableProductos from '@/components/Table'
import tableClientes from '@/components/Table'
// import tableUsuarios from '@/components/Table'
import PieChartClientes from '@/components/Charts/PieChart'
import { getListProductoCliente } from '@/api/unigrasas/informes'

export default {
  name: 'Ventas',
  components: {
    Sticky, treeAnos, treeMeses, treeClientes, treeUsuarios, treeProductos,
    tableClientes, PieChartClientes
  },
  data() {
    return {
      listaAnos: [], listaMeses: [], listaClientes: [], listaUsuarios: [], listaProductos: [],
      selectAnos: [], selectMeses: [], selectClientes: [], selectUsuarios: [], selectProductos: [],
      loadAnos: true, loadMeses: false, loadClientes: false, loadUsuarios: false, loadProductos: false,
      tableDataProductos: [], tableDataClientes: [], tableDataUsuarios: [],
      tableColumnProductos: [], tableColumnClientes: [], tableColumnUsuarios: [],
      ventas: 0,
      pieChartClientes: {},
      dataPieClientes: {},
      pieClientes: false,
      loadPieClientes: false,
      drawer: false,
      x: ''
    }
  },
  created() {
    this.x = window.matchMedia('(max-width: 800px)')
    this.initView()
  },
  methods: {
    selectTableCliente(cliente) {
      console.log(cliente)
      if (cliente.length) {
        this.loadPieClientes = true
        this.getDataProductoCliente(cliente)
      } else {
        this.pieClientes = false
        this.pieChartClientes = {}
      }
    },
    async getDataProductoCliente(cliente) {
      const data = {
        cliente: cliente,
        ano: this.selectAnos,
        mes: this.selectMeses
      }
      await getListProductoCliente(data).then((response) => {
        console.log('PIECHART_CLIENTES -> ', response)
        this.dataPieClientes = response
        this.pieChartClientes = this.dataPieClientes['pagado']
        this.pieClientes = true
        this.loadPieClientes = false
      })
    },
    submitSelectAnos(dataTree) {
      // console.log('dataTreeAnos -> ', dataTree)
      this.selectAnos = dataTree
      if (this.selectAnos.length) {
        this.loadMeses = true
        this.getMeses(this.selectAnos)
      } else {
        this.listaMeses = []
        this.selectMeses = []
        this.resetTrees()
      }
    },
    async submitSelectMeses(dataTree) {
      // console.log('dataTreeMeses -> ', dataTree)
      this.selectMeses = dataTree
      if (this.selectMeses.length) {
        this.getVentasAno([0], [0], [0])
        this.getProductos([0], [0], [0]).then((res) => {
          this.listaProductos = res
        })
        this.getClientes([0]).then((res) => {
          this.listaClientes = res
        })
        this.getUsuarios([0]).then((res) => {
          this.listaUsuarios = res
        })
      } else {
        this.resetTrees()
      }
    },
    submitSelectClientes(dataTree) {
      // console.log('dataTreeClientes -> ', dataTree)
      this.selectClientes = dataTree
      if (this.selectClientes.length) {
        this.getClientes(this.selectClientes).then((res) => {
          this.tableDataClientes = res[0]['children']
          this.tableColumnClientes = res[0]['tablecolumns']
        })
      } else {
        this.tableDataClientes = []
        this.tableColumnClientes = []
      }
    },
    submitSelectUsuarios(dataTree) {
      // console.log('dataTreeUsuarios -> ', dataTree)
      this.selectUsuarios = dataTree
      if (this.selectUsuarios.length) {
        this.getUsuarios(this.selectUsuarios).then((res) => {
          this.tableDataUsuarios = res[0]['children']
          this.tableColumnUsuarios = res[0]['tablecolumns']
        })
      } else {
        this.tableDataUsuarios = []
        // this.tableColumnUsuarios = []
      }
    },
    submitSelectProductos(dataTree) {
      // console.log('dataTreeProductos -> ', dataTree)
      this.selectProductos = dataTree
      if (this.selectProductos.length) {
        this.getProductos([0], [0], this.selectProductos).then((res) => {
          // console.log('submitSelectProductos -> ', res)
          this.tableDataProductos = res[0]['children']
          this.tableColumnProductos = res[0]['tablecolumns']
        })
      } else {
        this.tableDataProductos = []
        this.tableColumnProductos = []
      }
    },
    resetTrees() {
      this.listaClientes = []
      this.selectClientes = []
      this.listaUsuarios = []
      this.selectUsuarios = []
      this.listaProductos = []
      this.selectProductos = []
      this.ventas = 0
      this.tableDataProductos = []
      this.tableDataClientes = []
      this.tableDataUsuarios = []
    },
    resize() {
      console.log('resize')
      this.changeSize = true
    },
    initView() {
      this.getAnos()
    },
    async getAnos() {
      await getListAnios().then((response) => {
        // console.log('LISTA ANOS -> ', response)
        if (response[0]['children'].length) {
          this.listaAnos = response
        }
        this.loadAnos = false
      })
    },
    async getMeses(anos) {
      await getListMeses(anos).then((response) => {
        // console.log('LISTA MESES -> ', response)
        if (response[0]['children'].length) {
          this.listaMeses = response
        }
        this.loadMeses = false
      })
    },
    async getClientes(clientes) {
      this.loadClientes = true
      let resp = []
      const data = {
        cliente: clientes,
        ano: this.selectAnos,
        mes: this.selectMeses
      }
      await getListClientes(data).then((response) => {
        // console.log('LISTA CLIENTES -> ', response)
        if (response[0]['children'].length) {
          resp = response
        }
      })
      this.loadClientes = false
      return resp
    },
    async getUsuarios(usuarios) {
      this.loadUsuarios = true
      let resp = []
      const data = {
        usuario: usuarios,
        ano: this.selectAnos,
        mes: this.selectMeses
      }
      await getListUsuarios(data).then((response) => {
        // console.log('LISTA USUARIOS -> ', response)
        if (response[0]['children'].length) {
          resp = response
        }
      })
      this.loadUsuarios = false
      return resp
    },
    async getProductos(clientes, usuarios, productos) {
      this.loadProductos = true
      let resp = []
      const data = {
        cliente: clientes,
        usuario: usuarios,
        ano: this.selectAnos,
        mes: this.selectMeses,
        producto: productos
      }
      await getListProductos(data).then((response) => {
        // console.log('LISTA PRODUCTOS -> ', response)
        if (response[0]['children'].length) {
          resp = response
        }
      })
      this.loadProductos = false
      return resp
    },
    async getVentasAno(clientes, usuarios, productos) {
      this.ventas = 0
      const data = {
        cliente: clientes,
        usuario: usuarios,
        ano: this.selectAnos,
        mes: this.selectMeses,
        producto: productos
      }
      await getListVentasAno(data).then((response) => {
        // console.log('LISTA VENTAS ANO -> ', response)
        for (const iterator of response) {
          this.ventas = iterator.venta + this.ventas
        }
      })
    },
    async getVentasAnoMes(clientes, usuarios, productos) {
      const data = {
        cliente: clientes,
        usuario: usuarios,
        ano: this.selectAnos,
        mes: this.selectMeses,
        producto: productos
      }
      await getListVentasAnoMes(data).then((response) => {
        // console.log('LISTA VENTAS ANO MES -> ', response)
        this.ventas = response
      })
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
    border: 0px solid #4CAF50;
    text-align: center;
    background: #E1835F;
    color: white;
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
    height: 40vh;
  }

  /* width */
  ::-webkit-scrollbar {
    width: 1px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
</style>
