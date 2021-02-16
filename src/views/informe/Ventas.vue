<template>
  <div class="components-container">
    <split-pane split="vertical" :min-percent="75" :default-percent="75" @resize="resize">
      <template slot="paneL">
        <div style="border: 2px solid #53a6ac; height: 100%; overflow: auto;">
          <split-pane split="horizontal" @resize="resize">
            <template slot="paneL">
              <split-pane split="horizontal">
                <template slot="paneL">
                  <div class="pane-container-dashboard">
                    VENTAS TOTALES - ${{ ventas | formatNumber }}<br><br>
                    Años - {{ selectAnos }} <br><br>
                    Meses - {{ selectMeses }} <br><br>
                    Clientes - {{ selectClientes }} <br><br>
                    Usuarios - {{ selectUsuarios }} <br><br>
                    Productos - {{ selectProductos }} <br><br>
                  </div>
                </template>
                <template slot="paneR">
                  <div class="pane-container-dashboard">
                    B
                  </div>
                </template>
              </split-pane>
            </template>
            <template slot="paneR">
              <split-pane split="horizontal">
                <template slot="paneL">
                  <div class="pane-container-dashboard">
                    C
                  </div>
                </template>
                <template slot="paneR">
                  <div class="pane-container-dashboard">
                    D
                  </div>
                </template>
              </split-pane>
            </template>
          </split-pane>
        </div>
      </template>
      <template slot="paneR">
        <split-pane split="horizontal">
          <template slot="paneL">
            <split-pane split="horizontal">
              <template slot="paneL">
                <split-pane split="vertical">
                  <template slot="paneL">
                    <div class="pane-container-tree">
                      <tree-anos
                        :datatree="listaAnos"
                        nametree="año"
                        :loading="loadAnos"
                        @selected="submitSelectAnos"
                      />
                    </div>
                  </template>
                  <template slot="paneR">
                    <div class="pane-container-tree">
                      <tree-meses
                        :datatree="listaMeses"
                        nametree="mes"
                        :loading="loadMeses"
                        @selected="submitSelectMeses"
                      />
                    </div>
                  </template>
                </split-pane>
              </template>
              <template slot="paneR">
                <div class="pane-container-tree">
                  <tree-clientes
                    :datatree="listaClientes"
                    nametree="clientes"
                    :loading="loadClientes"
                    @selected="submitSelectClientes"
                  />
                </div>
              </template>
            </split-pane>
          </template>
          <template slot="paneR">
            <split-pane split="horizontal" @resize="resize">
              <template slot="paneL">
                <div class="pane-container-tree">
                  <tree-productos
                    :datatree="listaProductos"
                    nametree="productos"
                    :loading="loadProductos"
                    @selected="submitSelectProductos"
                  />
                </div>
              </template>
              <template slot="paneR">
                <div class="pane-container-tree">
                  <tree-usuarios
                    :datatree="listaUsuarios"
                    nametree="vendedores"
                    :loading="loadUsuarios"
                    @selected="submitSelectUsuarios"
                  />
                </div>
              </template>
            </split-pane>
          </template>
        </split-pane>
      </template>
    </split-pane>
  </div>
</template>

<script>
import { getListAnios, getListMeses, getListClientes, getListUsuarios, getListProductos, getListVentasAno, getListVentasAnoMes } from '@/api/unigrasas/ventas'
import treeAnos from '@/components/TreeOptions'
import treeMeses from '@/components/TreeOptions'
import treeClientes from '@/components/TreeOptions'
import treeUsuarios from '@/components/TreeOptions'
import treeProductos from '@/components/TreeOptions'

export default {
  name: 'Ventas',
  components: {
    treeAnos,
    treeMeses,
    treeClientes,
    treeUsuarios,
    treeProductos
  },
  data() {
    return {
      listaAnos: [],
      listaMeses: [],
      listaClientes: [],
      listaUsuarios: [],
      listaProductos: [],
      selectAnos: [],
      selectMeses: [],
      selectClientes: [],
      selectUsuarios: [],
      selectProductos: [],
      loadAnos: true,
      loadMeses: false,
      loadClientes: false,
      loadUsuarios: false,
      loadProductos: false,
      ventas: 0
    }
  },
  created() {
    this.initView()
  },
  methods: {
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
        this.getClientes([0])
        this.getUsuarios([0])
        this.getProductos([0], [0], [0])
        this.getVentasAno([0], [0], [0])
      } else {
        this.resetTrees()
      }
    },
    submitSelectClientes(dataTree) {
      // console.log('dataTreeClientes -> ', dataTree)
      this.selectClientes = dataTree
    },
    submitSelectUsuarios(dataTree) {
      // console.log('dataTreeUsuarios -> ', dataTree)
      this.selectUsuarios = dataTree
    },
    submitSelectProductos(dataTree) {
      // console.log('dataTreeProductos -> ', dataTree)
      this.selectProductos = dataTree
    },
    resetTrees() {
      this.listaClientes = []
      this.selectClientes = []
      this.listaUsuarios = []
      this.selectUsuarios = []
      this.listaProductos = []
      this.selectProductos = []
      this.ventas = 0
    },
    resize() {
      console.log('resize')
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
    async getClientes(usuarios) {
      this.loadClientes = true
      const data = {
        usuario: usuarios,
        ano: this.selectAnos,
        mes: this.selectMeses
      }
      await getListClientes(data).then((response) => {
        // console.log('LISTA CLIENTES -> ', response)
        if (response[0]['children'].length) {
          this.listaClientes = response
        }
        this.loadClientes = false
      })
    },
    async getUsuarios(clientes) {
      this.loadUsuarios = true
      const data = {
        cliente: clientes,
        ano: this.selectAnos,
        mes: this.selectMeses
      }
      await getListUsuarios(data).then((response) => {
        // console.log('LISTA USUARIOS -> ', response)
        if (response[0]['children'].length) {
          this.listaUsuarios = response
        }
        this.loadUsuarios = false
      })
    },
    async getProductos(clientes, usuarios, productos) {
      this.loadProductos = true
      const data = {
        cliente: clientes,
        usuario: usuarios,
        ano: this.selectAnos,
        mes: this.selectMeses,
        producto: productos
      }
      await getListProductos(data).then((response) => {
        console.log('LISTA PRODUCTOS -> ', response)
        if (response[0]['children'].length) {
          this.listaProductos = response
        }
        this.loadProductos = false
      })
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
        console.log('LISTA VENTAS ANO MES -> ', response)
        this.ventas = response
      })
    }
  }
}
</script>

<style scoped>
  .components-container {
    position: relative;
    margin: 0%;
    width: 100%;
    height: 89vh;
    /* border: 1px solid red; */
  }

  .pane-container-dashboard {
    /* border: 1px solid red; */
    background-color: #f8f4f7;
    width: 100%;
    height: auto;
    overflow: auto;
    position: relative;
  }

  .pane-container-tree {
    border: 0px solid blue;
    height: 100%;
  }
</style>
