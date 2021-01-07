<template>
  <div>
    <el-collapse-transition>
      <div v-show="showElements" style="padding-bottom: 10px">
        <sticky class-name="sub-navbar">
          <div style="text-align: center; color: white">
            <el-row>
              <el-col :span="20" style="padding-left: 15%;">
                <label style="font-size: x-large">Factura N° {{ id }}</label>
              </el-col>
              <el-col :span="4">
                <!-- Div Botones -->
                <el-button
                  style="border: 2px solid #67c23a"
                  size="medium"
                  icon="el-icon-printer"
                  @click="fetchData()"
                >Imprimir</el-button>
                <el-button
                  style="border: 1px solid #67c23a"
                  type="warning"
                  size="medium"
                  @click="closeWindow()"
                >Cerrar</el-button>
              </el-col>
            </el-row>
          </div>
        </sticky>
      </div>
    </el-collapse-transition>
    <div
      v-loading.fullscreen.lock="fullscreenLoading"
      class="main-article"
      element-loading-text="Generando Factura..."
      :style="showElements ? {border: '1px solid #E4E7ED', marginTop: '2%'} : {}"
    >
      <div v-loading="loading" :style="showElements ? {padding: '3%'} : {}">
        <!-- encabezado -->
        <el-row>
          <el-col :span="7" style="padding-top: 2.8%;">
            <img :src="logo" class="logo">
          </el-col>
          <el-col :span="17">
            <el-row style="padding-top: 2.5%;">
              <el-col :span="24" style="font-size: 11px; padding-left: 2.5%; padding-bottom: 1%;"><b>UNIGRASAS COLOMBIA S.A.S</b></el-col>
              <div style="font-size: 10px; padding-left: 2.5%;">
                <el-col :span="24" style="padding-bottom: 0.5%;">NIT: 830090675-7</el-col>
                <!-- <el-col :span="24" style="padding-bottom: 0.5%;">Régimen: Responsable del impuesto sobre las ventas –IVA</el-col> -->
                <el-col :span="24" style="padding-bottom: 0.5%;">Persona Jurídica</el-col>
                <el-col :span="24" style="padding-bottom: 0.5%;">Carrera 97 # 24c-50.5, BOGOTÁ, D.C., Bogotá, Colombia</el-col>
                <el-col :span="24" style="padding-bottom: 0.5%;">Tel. 3507259492</el-col>
                <!-- <el-col :span="24" style="padding-bottom: 0.5%;">AUTORIZACIÓN FACTURA ELECTRÓNICA DE VENTA No. 0.58764002623347 VÁLIDA DESDE 2020-08-20</el-col>
                <el-col :span="24" style="padding-bottom: 0.5%;">HASTA 2021-08-20 RANGO DESDE FELE1 HASTA FELE1000</el-col> -->
              </div>
            </el-row>
          </el-col>
        </el-row>
        <!-- separador -->
        <div style="border-top: 1px solid #DCDFE6; margin-top: 2%;" />
        <!-- datos generales -->
        <el-row style="margin-top: 2.5%;">
          <el-col :span="12" style="border: 1px solid; border-radius: 5px; padding: 1.5%;">
            <el-row style="padding-bottom: 0.5%;">
              <el-col :span="5" style="font-size: 10.5px;"><b>Cliente: </b></el-col>
              <el-col :span="19" style="font-size: 10.5px;">{{ dataFactura.n_cliente }}</el-col>
            </el-row>
            <el-row style="padding-bottom: 0.5%;">
              <el-col :span="5" style="font-size: 10.5px;"><b>Nit: </b></el-col>
              <el-col :span="19" style="font-size: 10.5px;">{{ dataFactura.nit }}</el-col>
            </el-row>
            <el-row style="padding-bottom: 0.5%;">
              <el-col :span="5" style="font-size: 10.5px;"><b>Dirección: </b></el-col>
              <el-col :span="19" style="font-size: 10.5px;">{{ dataFactura.direccion }}</el-col>
            </el-row>
            <el-row style="padding-bottom: 0.5%;">
              <el-col :span="5" style="font-size: 10.5px;"><b>Teléfono: </b></el-col>
              <el-col :span="19" style="font-size: 10.5px;">{{ dataFactura.telefono }}</el-col>
            </el-row>
            <el-row style="padding-bottom: 0.5%;">
              <el-col :span="5" style="font-size: 10.5px;"><b>Email: </b></el-col>
              <el-col :span="19" style="font-size: 10.5px;">{{ dataFactura.email }}</el-col>
            </el-row>
            <div style="border-top: 1px solid #606266; margin-top: 1.5%; padding-bottom: 1.5%;" />
            <el-row style="padding-bottom: 0.5%;">
              <el-col :span="9" style="font-size: 10.5px;"><b>Tipo de negociación: </b></el-col>
              <el-col :span="15" style="font-size: 10.5px;">{{ dataFactura.negociacion }}</el-col>
            </el-row>
            <el-row style="padding-bottom: 0.5%;">
              <el-col :span="9" style="font-size: 10.5px;"><b>Medio de Pago: </b></el-col>
              <el-col :span="15" style="font-size: 10.5px;">{{ dataFactura.n_mediopago }}</el-col>
            </el-row>
            <el-row style="padding-bottom: 0.5%;">
              <el-col :span="9" style="font-size: 10.5px;"><b>Fecha de Pago: </b></el-col>
              <el-col :span="15" style="font-size: 10.5px;">{{ dataFactura.f_pago | formatDate }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="1">
            &nbsp;
          </el-col>
          <!-- datos facturacion -->
          <el-col :span="11" style="border: 1px solid; border-radius: 5px; padding: 1.5%;">
            <el-row style="padding-bottom: 0.5%; border-bottom: 1px solid #606266;">
              <el-col :span="10" style="font-size: 10.5px; color: #ff4603;"><b>FACTURA DE VENTA: </b></el-col>
              <el-col :span="14" style="font-size: 10.5px;"><b>{{ dataFactura.idfactura }}</b></el-col>
            </el-row>
            <el-row style="padding-top: 0.5%; border-bottom: 1px solid #606266;">
              <el-col :span="10" style="font-size: 10.5px; color: #ff4603;"><b>MONEDA: </b></el-col>
              <el-col :span="14" style="font-size: 10.5px;"><b>{{ dataFactura.divisa }}</b></el-col>
            </el-row>
            <el-row style="padding-top: 0.5%; border-bottom: 1px solid #606266;">
              <el-col :span="10" style="font-size: 10.5px; color: #ff4603;"><b>VENDEDOR: </b></el-col>
              <el-col :span="14" style="font-size: 10.5px;"><b>{{ dataFactura.vendedor }}</b></el-col>
            </el-row>
            <el-row style="padding-top: 0.5%; border-bottom: 1px solid #606266;">
              <el-col :span="10" style="font-size: 10.5px; color: #ff4603;"><b>HORA EMISIÓN: </b></el-col>
              <el-col :span="14" style="font-size: 10.5px;"><b>{{ dataFactura.f_emision | getHour }}</b></el-col>
            </el-row>
            <el-row :gutter="10" style="text-align: center;">
              <!-- fecha emision -->
              <el-col :span="12">
                <el-row>
                  <el-col :span="24" style="font-size: 11px; padding-top: 7%; padding-bottom: 7%;"><b>FECHA DE EMISIÓN</b></el-col>
                  <el-col :span="24" class="table-fechas">
                    <table>
                      <tr class="fecha-th">
                        <th>DIA</th>
                        <th>MES</th>
                        <th>AÑO</th>
                      </tr>
                      <tr class="fecha-td">
                        <td>{{ dataFactura.f_emision | getDay }}</td>
                        <td>{{ dataFactura.f_emision | getMonth }}</td>
                        <td>{{ dataFactura.f_emision | getYear }}</td>
                      </tr>
                    </table>
                  </el-col>
                </el-row>
              </el-col>
              <!-- fecha emision -->
              <el-col :span="12">
                <el-row>
                  <el-col :span="24" style="font-size: 11px; padding-top: 7%; padding-bottom: 7%;"><b>FECHA DE VENCIMIENTO</b></el-col>
                  <el-col :span="24" class="table-fechas">
                    <table>
                      <tr class="fecha-th">
                        <th>DIA</th>
                        <th>MES</th>
                        <th>AÑO</th>
                      </tr>
                      <tr class="fecha-td">
                        <td>{{ dataFactura.f_vencimiento | getDay }}</td>
                        <td>{{ dataFactura.f_vencimiento | getMonth }}</td>
                        <td>{{ dataFactura.f_vencimiento | getYear }}</td>
                      </tr>
                    </table>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- items -->
        <el-row style="margin-top: 2.5%;">
          <el-col :span="24" class="wrapper" style="height: 50vh;">
            <table class="table-items">
              <tr class="items-th">
                <th># </th>
                <th>CÓDIGO</th>
                <th>DESCRIPCIÓN</th>
                <th>CANTIDAD</th>
                <th>PRECIO U.</th>
                <th>TOTAL</th>
              </tr>
              <tr v-for="(item, index) in dataItems" :key="item.iditem" class="items-td">
                <td>{{ index + 1 }}</td>
                <td>{{ item.coditem }}</td>
                <td>{{ item.item }}</td>
                <td>{{ item.cantidad }}</td>
                <td>{{ item.precio }}</td>
                <td>$ {{ item.cantidad * item.precio | formatNumber }}</td>
              </tr>
              <tr class="items-td-null">
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>
            </table>
          </el-col>
        </el-row>
        <!-- total -->
        <el-row class="wrapper" style="margin-top: 2.5%;">
          <el-col :span="17">
            <el-row style="padding: 1%;">
              <!-- <el-col :span="24" style="font-size: 11px;"><b>Notas: </b></el-col> -->
              <el-col :span="24" style="border: 0px solid red; font-size: 11px; width: 52vh; height: 3.5vh;">
                <b>Notas:</b> {{ dataFactura.descripcion }}
              </el-col>
            </el-row>
            <el-row style="padding: 1%; border-top: 1px solid;">
              <el-col :span="1" style="font-size: 11px;"><b>Son: </b></el-col>
              <el-col :span="23" style="font-size: 11px; padding-left: 1.5%;">( {{ convertNumberToLetters(dataFactura.total) | uppercaseFirst }} )</el-col>
            </el-row>
          </el-col>
          <el-col :span="7" style="border-left: 1px solid;">
            <el-row>
              <el-col :span="24">
                <el-row>
                  <el-col :span="11" style="padding: 2%; border-right: 1px solid; border-bottom: 1px solid; font-size: 11px;"><b>Subtotal: </b></el-col>
                  <el-col :span="13" style="padding: 2%; text-align: right; border-bottom: 1px solid; font-size: 11px;">$ {{ dataFactura.total | formatNumber }}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="11" style="padding: 2%; border-right: 1px solid; border-bottom: 1px solid; font-size: 11px;"><b>Cargos: </b></el-col>
                  <el-col :span="13" style="padding: 2%; text-align: right; border-bottom: 1px solid; font-size: 11px;">$ 0</el-col>
                </el-row>
                <el-row>
                  <el-col :span="11" style="padding: 2%; border-right: 1px solid; border-bottom: 1px solid; font-size: 11px;"><b>Descuento: </b></el-col>
                  <el-col :span="13" style="padding: 2%; text-align: right; border-bottom: 1px solid; font-size: 11px;">$ 0</el-col>
                </el-row>
                <el-row>
                  <el-col :span="11" style="padding: 2%; border-right: 1px solid; font-size: 11px;"><b>Total: </b></el-col>
                  <el-col :span="13" style="padding: 2%; text-align: right; font-size: 11px;">$ {{ dataFactura.total | formatNumber }}</el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
    <div :style="showElements ? {display: 'block'} : {}">
      <br><br>
    </div>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky' // 粘性header组件
import logoEmpresa from '@/assets/unigrasas.jpg'
import { getFacturaInicial, getFactura } from '@/api/unigrasas/facturas'
import { getListFacturaItems } from '@/api/unigrasas/factura-has-item'
import { numeroALetras } from './scripts/numeroLetras'

export default {
  name: 'ViewPdf',
  components: { Sticky },
  data() {
    return {
      logo: logoEmpresa,
      article: '',
      fullscreenLoading: false,
      id: '',
      showElements: true,
      dataFactura: {},
      dataItems: [],
      loading: false
    }
  },
  async mounted() {
    this.loading = true
    this.id = this.$route.params.id
    await this.getDataFactura()
    await this.getDataItems()
    this.loading = false
    // console.log('Imprimir factura -> ', this.id)
  },
  methods: {
    convertNumberToLetters(val) {
      const letras = numeroALetras(val, {
        plural: 'PESOS',
        singular: 'PESO',
        centPlural: 'CENTAVOS',
        centSingular: 'CENTAVO'
      })
      console.log(letras)
      return letras
    },
    fetchData() {
      this.showElements = false
      this.fullscreenLoading = true
      import('./scripts/content.js').then((data) => {
        // console.log(data)
        const { title } = data.default
        document.title = title
        // console.log('document -> ', document)
        this.article = data.default
        setTimeout(() => {
          this.fullscreenLoading = false
          this.$nextTick(() => {
            window.print()
            this.showElements = true
          })
        }, 500)
      })
    },
    closeWindow() {
      // this.$router.push({ path: `/procesos/facturas` })
      this.$router.go(-1)
    },
    async getDataFactura() {
      // await getFactura(this.id).then((response) => {
      //   console.log('DATA_FACTURA -> ', response)
      //   this.dataFactura = response[0]
      // })
      await getFactura(this.id).then(async(response) => {
        if (response.length > 0) {
          // Se obtienen los datos del proceso si ya esta diligenciado en su totalidad
          // console.log('DATA_FACTURA -> ', response)
          this.dataFactura = response[0]
        } else {
          // Sino se cargan los datos del proceso completos (Esto pasa cuando se crea un proceso nuevo)
          await getFacturaInicial(this.id).then(async(response) => {
            this.$notify({
              title: 'Advertencia',
              message: 'No se puede generar factura',
              type: 'warning',
              duration: 2000
            })
          })
        }
      })
    },
    async getDataItems() {
      await getListFacturaItems(this.id).then((response) => {
        // console.log('ITEMS_FACTURA -> ', response)
        this.dataItems = response
      })
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
.logo {
  width: 93%;
}
.main-article {
  // padding: 20px;
  font-family: 'Roboto', sans-serif;
  margin: 0 auto;
  display: block;
  width: 740px;
  background: white;
}

.table-fechas table {
  border: 1px solid black;
  border-collapse: collapse;
  width: 100%;
}

.fecha-th th {
  padding: 1%;
  color: #C0C4CC;
  font-size: 10px;
  border: 1px solid black;
}

.fecha-td td {
  font-size: 11px;
  border: 1px solid black;
}

.wrapper {
  overflow: hidden;
  border-radius: 6px;
  border: 1px solid black;
}

.table-items {
  border-spacing: 0;
  border-collapse: collapse;
  border-style: hidden;
  width:100%;
  max-width: 100%;
  border-bottom: 1px solid black;
}

.items-th th {
  padding: 1%;
  font-size: 10px;
  border: 1px solid black;
}

.items-td td {
  padding-top: 1%;
  padding-bottom: 1%;
  font-size: 11px;
  border: 1px solid black;
  text-align: center;
}

.items-td-null td {
  border: 1px solid black;
  height: 50vh;
}
</style>
