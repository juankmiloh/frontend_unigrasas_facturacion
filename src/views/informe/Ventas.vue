<template>
  <div class="components-container">
    <split-pane split="vertical" :min-percent="0" :default-percent="74" @resize="resize">
      <template slot="paneL">
        <div style="border: 2px solid #53a6ac; height: 100%;">
          <split-pane split="horizontal" :min-percent="5" :default-percent="50" @resize="resize">
            <template slot="paneL">
              <div style="height: 100%;">
                <split-pane split="horizontal" :min-percent="5" :default-percent="45">
                  <template slot="paneL">
                    <div class="pane-container-dashboard">
                      VENTAS TOTALES - ${{ ventas | formatNumber }}<br><br>
                      Años - {{ selectAnos }} | Meses - {{ selectMeses }} <br><br>
                      Clientes - {{ selectClientes }} <br><br>
                      Usuarios - {{ selectUsuarios }} <br><br>
                      Productos - {{ selectProductos }} <br><br>
                    </div>
                  </template>
                  <template slot="paneR">
                    <div class="pane-container-dashboard">
                      <div style="height: 100%;">
                        <split-pane split="vertical" :min-percent="0" :default-percent="65">
                          <template slot="paneL">
                            <div class="pane-container-dashboard" style="padding: 10px;">
                              <table-productos
                                nametable="producto"
                                :datatable="tableDataProductos"
                                :tablecolumns="tableColumnProductos"
                                :loading="loadProductos"
                              />
                            </div>
                          </template>
                          <template slot="paneR">
                            <div class="pane-container-dashboard">
                              <label>Gráfica</label>
                            </div>
                          </template>
                        </split-pane>
                      </div>
                    </div>
                  </template>
                </split-pane>
              </div>
            </template>
            <template slot="paneR">
              <div style="height: 100%;">
                <split-pane split="horizontal" :min-percent="5" :default-percent="50">
                  <template slot="paneL">
                    <div class="pane-container-dashboard">
                      <div style="height: 100%;">
                        <split-pane split="vertical" :min-percent="0" :default-percent="65">
                          <template slot="paneL">
                            <div class="pane-container-dashboard" style="padding: 10px;">
                              <table-clientes
                                nametable="cliente"
                                :datatable="tableDataClientes"
                                :tablecolumns="tableColumnClientes"
                                :loading="loadClientes"
                              />
                            </div>
                          </template>
                          <template slot="paneR">
                            <div class="pane-container-dashboard">
                              <label>Gráfica</label>
                            </div>
                          </template>
                        </split-pane>
                      </div>
                    </div>
                  </template>
                  <template slot="paneR">
                    <div class="pane-container-dashboard">
                      <div style="height: 100%;">
                        <split-pane split="vertical" :min-percent="0" :default-percent="65">
                          <template slot="paneL">
                            <div class="pane-container-dashboard" style="padding: 10px;">
                              <table-usuarios
                                nametable="vendedor"
                                :datatable="tableDataUsuarios"
                                :tablecolumns="tableColumnUsuarios"
                                :loading="loadUsuarios"
                              />
                            </div>
                          </template>
                          <template slot="paneR">
                            <div class="pane-container-dashboard">
                              <label>Gráfica</label>
                            </div>
                          </template>
                        </split-pane>
                      </div>
                    </div>
                  </template>
                </split-pane>
              </div>
            </template>
          </split-pane>
        </div>
      </template>
      <template slot="paneR">
        <div style="border: 0px solid #53a6ac; height: 100%;">
          <split-pane split="horizontal" @resize="resize">
            <template slot="paneL">
              <div style="height: 100%;">
                <split-pane split="horizontal">
                  <template slot="paneL">
                    <div style="height: 100%;">
                      <split-pane split="vertical" :min-percent="0" :default-percent="50">
                        <template slot="paneL">
                          <div class="pane-container-dashboard">
                            <tree-anos
                              :datatree="listaAnos"
                              nametree="año"
                              :loading="loadAnos"
                              @selected="submitSelectAnos"
                            />
                          </div>
                        </template>
                        <template slot="paneR">
                          <div class="pane-container-dashboard">
                            <tree-meses
                              :datatree="listaMeses"
                              nametree="mes"
                              :loading="loadMeses"
                              @selected="submitSelectMeses"
                            />
                          </div>
                        </template>
                      </split-pane>
                    </div>
                  </template>
                  <template slot="paneR">
                    <div class="pane-container-dashboard">
                      <tree-productos
                        :datatree="listaProductos"
                        nametree="productos"
                        :loading="loadProductos"
                        @selected="submitSelectProductos"
                      />
                    </div>
                  </template>
                </split-pane>
              </div>
            </template>
            <template slot="paneR">
              <div style="height: 100%;">
                <split-pane split="horizontal">
                  <template slot="paneL">
                    <div class="pane-container-dashboard">
                      <tree-clientes
                        :datatree="listaClientes"
                        nametree="clientes"
                        :loading="loadClientes"
                        @selected="submitSelectClientes"
                      />
                    </div>
                  </template>
                  <template slot="paneR">
                    <div class="pane-container-dashboard">
                      <tree-usuarios
                        :datatree="listaUsuarios"
                        nametree="vendedores"
                        :loading="loadUsuarios"
                        @selected="submitSelectUsuarios"
                      />
                    </div>
                  </template>
                </split-pane>
              </div>
            </template>
          </split-pane>
        </div>
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
import tableProductos from '@/components/Table'
import tableClientes from '@/components/Table'
import tableUsuarios from '@/components/Table'

export default {
  name: 'Ventas',
  components: {
    treeAnos,
    treeMeses,
    treeClientes,
    treeUsuarios,
    treeProductos,
    tableProductos,
    tableClientes,
    tableUsuarios
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
      ventas: 0,
      tableDataProductos: [],
      tableColumnProductos: [],
      tableDataClientes: [],
      tableColumnClientes: [],
      tableDataUsuarios: [],
      tableColumnUsuarios: []
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
        this.getVentasAno([0], [0], [0])
        this.getClientes([0]).then((res) => {
          this.listaClientes = res
        })
        this.getUsuarios([0]).then((res) => {
          this.listaUsuarios = res
        })
        this.getProductos([0], [0], [0]).then((res) => {
          this.listaProductos = res
        })
      } else {
        this.resetTrees()
      }
    },
    submitSelectClientes(dataTree) {
      console.log('dataTreeClientes -> ', dataTree)
      this.selectClientes = dataTree
      if (this.selectClientes.length) {
        this.getClientes(this.selectClientes).then((res) => {
          this.tableDataClientes = res[0]['children']
          this.tableColumnClientes = res[0]['tablecolumns']
        })
      } else {
        this.tableDataClientes = []
        // this.tableColumnClientes = []
      }
    },
    submitSelectUsuarios(dataTree) {
      console.log('dataTreeUsuarios -> ', dataTree)
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
        // this.tableColumnProductos = []
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
      // console.log('resize')
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
        console.log('LISTA CLIENTES -> ', response)
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
    height: 89vh;
  }

  .pane-container-dashboard {
    background-color: #f7fbff;
    width: 100%;
    height: 100%;
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
