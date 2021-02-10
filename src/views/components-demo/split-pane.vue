<template>
  <div class="components-container">
    <split-pane split="vertical" :min-percent="80" :default-percent="80" @resize="resize">
      <template slot="paneL">
        <split-pane split="horizontal" :min-percent="30" :default-percent="30">
          <template slot="paneL">
            <div class="top-container">
              <div>
                VENTAS TOTALES
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
                    anos
                  </template>
                  <template slot="paneR">
                    meses
                  </template>
                </split-pane>
              </template>
              <template slot="paneR">
                <div class="bottom-container">
                  <div>
                    CLIENTES
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
                    PRODUCTOS
                  </div>
                </div>
              </template>
              <template slot="paneR">
                <div class="bottom-container">
                  <div>
                    VENDEDORES
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

export default {
  name: 'SplitpaneDemo',
  components: { splitPane },
  created() {
    this.initView()
  },
  methods: {
    resize() {
      console.log('resize')
    },
    initView() {
      this.getAnos()
      this.getMeses()
      this.getClientes()
      this.getUsuarios()
      this.getProductos()
      this.getVentas()
    },
    async getAnos() {
      await getListAnios().then((response) => {
        console.log('LISTA ANOS -> ', response)
      })
    },
    async getMeses() {
      await getListMeses(2021).then((response) => {
        console.log('LISTA MESES -> ', response)
      })
    },
    async getClientes() {
      const data = {
        ano: 2021,
        mes: 3
      }
      await getListClientes(data).then((response) => {
        console.log('LISTA CLIENTES -> ', response)
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
