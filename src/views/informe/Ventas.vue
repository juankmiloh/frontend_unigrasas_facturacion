<template>
  <div class="components-container">
    <split-pane split="vertical" :min-percent="75" :default-percent="75" @resize="resize">
      <template slot="paneL">
        <split-pane split="horizontal" :min-percent="30" :default-percent="30">
          <template slot="paneL">
            <div class="top-container">
              <div>
                VENTAS TOTALES <br><br>
                Años - {{ selectAnos }} <br><br>
                Meses - {{ selectMeses }} <br><br>
                Clientes - {{ selectClientes }} <br><br>
                Usuarios - {{ selectUsuarios }} <br><br>
                Productos - {{ selectProductos }} <br><br>
              </div>
            </div>
          </template>
          <template slot="paneR">
            <div class="bottom-container">
              <div>
                VENTAS DISCRIMINADAS
              </div>
            </div>
          </template>
        </split-pane>
      </template>
      <template slot="paneR">
        <split-pane split="horizontal">
          <template slot="paneL">
            <split-pane split="horizontal">
              <template slot="paneL">
                <split-pane split="vertical">
                  <template slot="paneL">
                    Años
                    <tree-anos
                      :datatree="listaAnos"
                      nametree="anos"
                      :loading="loadAnos"
                      @selected="submitSelectAnos"
                    />
                  </template>
                  <template slot="paneR">
                    Meses
                    <tree-meses
                      :datatree="listaMeses"
                      nametree="meses"
                      :loading="loadMeses"
                      @selected="submitSelectMeses"
                    />
                  </template>
                </split-pane>
              </template>
              <template slot="paneR">
                <div class="bottom-container">
                  <div>
                    CLIENTES
                    <tree-clientes
                      :datatree="listaClientes"
                      nametree="clientes"
                      :loading="loadClientes"
                      @selected="submitSelectClientes"
                    />
                  </div>
                </div>
              </template>
            </split-pane>
          </template>
          <template slot="paneR">
            <split-pane split="horizontal">
              <template slot="paneL">
                <div class="top-container">
                  <div>
                    VENDEDORES
                  </div>
                </div>
              </template>
              <template slot="paneR">
                <div class="bottom-container">
                  <div>
                    PRODUCTOS
                  </div>
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
import splitPane from 'vue-splitpane'
import { getListAnios, getListMeses, getListClientes, getListUsuarios, getListProductos, getListVentas } from '@/api/unigrasas/ventas'
import treeAnos from '@/components/TreeOptions'
import treeMeses from '@/components/TreeOptions'
import treeClientes from '@/components/TreeOptions'

export default {
  name: 'Ventas',
  components: {
    splitPane,
    treeAnos,
    treeMeses,
    treeClientes
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
      loadMeses: true,
      loadClientes: true,
      loadUsuarios: true
    }
  },
  created() {
    this.initView()
  },
  methods: {
    submitSelectAnos(dataTree) {
      // console.log('dataTreeAnos -> ', dataTree)
      this.selectAnos = dataTree
      if (this.selectAnos !== '') {
        this.loadMeses = true
        this.getMeses(this.selectAnos)
      } else {
        this.listaMeses = []
        // this.listaClientes = []
        this.loadMeses = true
        // this.loadClientes = true
      }
    },
    submitSelectMeses(dataTree) {
      // console.log('dataTreeMeses -> ', dataTree)
      this.selectMeses = dataTree
      if (this.selectMeses !== '') {
        this.loadClientes = true
        this.getClientes()
      } else {
        // this.listaClientes = []
        // this.loadClientes = true
      }
    },
    submitSelectClientes(dataTree) {
      console.log('dataTreeClientes -> ', dataTree)
      this.selectClientes = dataTree
      if (this.selectClientes !== '') {
        this.loadUsuarios = true
        // this.getUsuarios()
      } else {
        this.listaUsuarios = []
        this.loadUsuarios = true
      }
    },
    resize() {
      console.log('resize')
    },
    initView() {
      this.getAnos()
      // this.getUsuarios()
      // this.getProductos()
      // this.getVentas()
    },
    async getAnos() {
      await getListAnios().then((response) => {
        // console.log('LISTA ANOS -> ', response)
        this.listaAnos = response
        this.loadAnos = false
      })
    },
    async getMeses(anos) {
      await getListMeses(anos).then((response) => {
        // console.log('LISTA MESES -> ', response)
        this.listaMeses = response
        this.loadMeses = false
      })
    },
    async getClientes() {
      const data = {
        ano: this.selectAnos,
        mes: this.selectMeses
      }
      await getListClientes(data).then((response) => {
        console.log('LISTA CLIENTES -> ', response)
        this.listaClientes = response
        this.loadClientes = false
      })
    },
    async getUsuarios() {
      const data = {
        cliente: 0,
        ano: 2021,
        mes: 0
      }
      await getListUsuarios(data).then((response) => {
        console.log('LISTA USUARIOS -> ', response)
        this.listaUsuarios = response
      })
    },
    async getProductos() {
      const data = {
        cliente: 5,
        usuario: 3,
        ano: 2021,
        mes: 0,
        producto: 0
      }
      await getListProductos(data).then((response) => {
        console.log('LISTA PRODUCTOS -> ', response)
        this.listaProductos = response
      })
    },
    async getVentas() {
      const data = {
        cliente: 0,
        usuario: 0,
        ano: 0,
        mes: 0,
        producto: 0
      }
      await getListVentas(data).then((response) => {
        console.log('LISTA VENTAS -> ', response)
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

  .top-container {
    background-color: #FCE38A;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .bottom-container {
    background-color: #95E1D3;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .right-container {
    background-color: #F38181;
    width: 100%;
    height: 100%;
  }
</style>
