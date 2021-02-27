<template>
  <el-drawer
    title="I am the title"
    :visible.sync="open"
    :with-header="false"
    :size="x.matches && !landscape.matches ? '90%' : '30em'"
    :before-close="handleClose"
  >
    <div
      style="
        border: 0px solid red;
        height: 100vh;
        overflow: auto;
        background: #f7d9cd;
      "
    >
      <el-row :style="{ height: x.matches ? '3em' : '6vh' }">
        <el-col :xs="24" :md="24" style="border: 1px solid green; height: 100%">
          <sticky class="sub-navbar">
            <div style="border: 0px solid red; text-align: right">
              <el-button
                style="border: 1px solid #67c23a"
                type="warning"
                size="mini"
                @click="statusDrawer(false)"
              ><b>X</b></el-button>
            </div>
          </sticky>
        </el-col>
      </el-row>
      <el-row :style="{ height: x.matches ? '10em' : '22vh' }">
        <el-col :xs="12" :md="12" style="height: 100%">
          <tree-anos
            :datatree="listaAnos"
            nametree="año"
            :loading="loadAnos"
            @selected="submitSelectAnos"
          />
        </el-col>
        <el-col :xs="12" :md="12" style="height: 100%">
          <tree-meses
            :datatree="listaMeses"
            nametree="mes"
            :loading="loadMeses"
            @selected="submitSelectMeses"
          />
        </el-col>
      </el-row>
      <el-row :style="{ height: x.matches ? '10em' : '24vh' }">
        <el-col :xs="24" :md="24" style="height: 100%">
          <tree-productos
            :datatree="listaProductos"
            nametree="productos"
            :loading="loadProductos"
            @selected="submitSelectProductos"
          />
        </el-col>
      </el-row>
      <el-row :style="{ height: x.matches ? '10em' : '24vh' }">
        <el-col :xs="24" :md="24" style="height: 100%">
          <tree-clientes
            :datatree="listaClientes"
            nametree="clientes"
            :loading="loadClientes"
            @selected="submitSelectClientes"
          />
        </el-col>
      </el-row>
      <el-row :style="{ height: x.matches ? '10em' : '24vh' }">
        <el-col :xs="24" :md="24" style="height: 100%">
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
</template>

<script>
import Sticky from '@/components/Sticky' // 粘性header组件
import {
  getListAnios,
  getListMeses,
  getListClientes,
  getListUsuarios,
  getListProductos,
  getListVentasAno,
  getListVentasAnoMes
} from '@/api/unigrasas/ventas'
import treeAnos from '@/components/TreeOptions'
import treeMeses from '@/components/TreeOptions'
import treeClientes from '@/components/TreeOptions'
import treeUsuarios from '@/components/TreeOptions'
import treeProductos from '@/components/TreeOptions'

export default {
  name: 'DrawerOptions',
  components: {
    Sticky,
    treeAnos,
    treeMeses,
    treeClientes,
    treeUsuarios,
    treeProductos
  },
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      listaAnos: [],
      listaMeses: [],
      listaClientes: [],
      listaUsuarios: [],
      listaProductos: [],
      loadAnos: true,
      loadMeses: false,
      loadClientes: false,
      loadUsuarios: false,
      loadProductos: false,
      selectAnos: [],
      selectMeses: [],
      landscape: false,
      x: ''
    }
  },
  created() {
    this.x = window.matchMedia('(max-width: 800px)')
    this.landscape = window.matchMedia('(orientation: landscape)')
    this.initView()
  },
  methods: {
    initView() {
      this.getAnos()
    },
    statusDrawer(val) {
      this.$emit('statusDrawer', val)
    },
    handleClose() {
      this.statusDrawer(false)
    },
    submitSelectAnos(dataTree) {
      // console.log('dataTreeAnos -> ', dataTree)
      this.selectAnos = dataTree
      let ano = []
      if (this.selectAnos.length) {
        ano = this.selectAnos
        this.loadMeses = true
        this.getMeses(this.selectAnos)
      } else {
        ano = []
        this.listaMeses = []
        this.selectMeses = []
        this.resetTrees()
      }
      this.$emit('ano', ano)
    },
    async submitSelectMeses(dataTree) {
      // console.log('dataTreeMeses -> ', dataTree)
      this.selectMeses = dataTree
      let mes = []
      if (this.selectMeses.length) {
        mes = this.selectMeses
        this.loadClientes = true
        this.loadProductos = true
        this.loadUsuarios = true
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
        mes = []
        this.resetTrees()
      }
      this.$emit('mes', mes)
    },
    async submitSelectProductos(dataTree) {
      if (dataTree.length) {
        this.$emit('loadingProducto', true)
        await this.getProductos([0], [0], dataTree).then((res) => {
          this.$emit('producto', res[0])
        })
      } else {
        this.$emit('producto', [])
      }
      this.$emit('loadingProducto', false)
    },
    async submitSelectClientes(dataTree) {
      if (dataTree.length) {
        this.$emit('loadingCliente', true)
        await this.getClientes(dataTree).then((res) => {
          this.$emit('cliente', res[0])
        })
      } else {
        this.$emit('cliente', [])
      }
      this.$emit('loadingCliente', false)
    },
    async submitSelectUsuarios(dataTree) {
      if (dataTree.length) {
        this.$emit('loadingUsuario', true)
        await this.getUsuarios(dataTree).then((res) => {
          this.$emit('vendedor', res[0])
        })
      } else {
        this.$emit('vendedor', [])
      }
      this.$emit('loadingUsuario', false)
    },
    resetTrees() {
      this.listaClientes = []
      this.listaUsuarios = []
      this.listaProductos = []
      this.$emit('ventas', 0)
      this.$emit('mes', [])
      this.$emit('producto', [])
      this.$emit('cliente', [])
      this.$emit('vendedor', [])
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
    async getProductos(clientes, usuarios, productos) {
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
    async getClientes(clientes) {
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
        console.log('LISTA VENTAS ANO -> ', response)
        if (response.length) {
          for (const iterator of response) {
            this.ventas = iterator.venta + this.ventas
            this.$emit('ventas', this.ventas)
          }
        } else {
          this.$emit('ventas', 0)
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
