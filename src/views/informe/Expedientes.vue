<template>
  <div class="createPost-container">

    <div class="dashboard-editor-container" style="border: 0px solid red; padding-bottom: 0;">
      <panel-group-proceso :servicio="selectServicio" @handleSetPieChartData="handleSetPieChartData" />
    </div>

    <sticky class-name="sub-navbar">
      <div style="text-align: center; color: white;">
        <label style="font-size: x-large;">Procesos {{ selectPie }}</label>
      </div>
    </sticky>

    <div v-loading="loadingEstado" class="dashboard-editor-container">
      <el-row v-if="!loadingEstado && pieChartDataEstado.datos.length > 0" :gutter="32">
        <!-- <el-col v-if="!loadingCausas && pieChartDataCausas.datos.length > 0" :xs="24" :sm="24" :lg="12">
          <div v-loading="loadingCausas" class="chart-wrapper">
            <el-row>
              <el-col :md="23">
                <div style="text-align: center;"><label for="">Causa</label></div>
              </el-col>
              <el-col :md="1">
                <div style="cursor: pointer;" @click="handleDataPie(pieChartDataCausas, 'causa')">
                  <i class="el-icon-link" />
                </div>
              </el-col>
            </el-row>
            <pie-chart :chart-data="pieChartDataCausas" style="height: 45vh;" />
          </div>
        </el-col> -->
        <el-col :xs="24" :sm="24" :lg="12">
          <div v-loading="loadingEstado" class="chart-wrapper">
            <el-row>
              <el-col :md="23">
                <div style="text-align: center;"><label for="">Estado</label></div>
              </el-col>
              <el-col :md="1">
                <div style="cursor: pointer;" @click="handleDataPie(pieChartDataEstado, 'estado')">
                  <i class="el-icon-link" />
                </div>
              </el-col>
            </el-row>
            <pie-chart :chart-data="pieChartDataEstado" style="height: 45vh;" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12">
          <div v-loading="loadingUsuarios" class="chart-wrapper">
            <el-row>
              <el-col :md="23">
                <div style="text-align: center;"><label for="">Abogados</label></div>
              </el-col>
              <el-col :md="1">
                <div style="cursor: pointer;" @click="handleDataPie(pieChartDataUsuarios, 'abogados')">
                  <i class="el-icon-link" />
                </div>
              </el-col>
            </el-row>
            <pie-chart :chart-data="pieChartDataUsuarios" style="height: 45vh;" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="24">
          <div v-loading="loadingEmpresas" class="chart-wrapper">
            <el-row>
              <el-col :md="23">
                <div style="text-align: center;"><label for="">Empresas</label></div>
              </el-col>
              <el-col :md="1">
                <div style="cursor: pointer;" @click="handleDataPie(pieChartDataEmpresas, 'empresas')">
                  <i class="el-icon-link" />
                </div>
              </el-col>
            </el-row>
            <pie-chart :chart-data="pieChartDataEmpresas" style="height: 60vh;" />
          </div>
        </el-col>
      </el-row>
      <transition name="el-fade-in-linear">
        <el-row v-show="!loadingEmpresas" v-if="!loadingEmpresas && pieChartDataEmpresas.datos.length === 0">
          <el-col :xs="24" :sm="24" :lg="24" style="text-align: center; border: 0px solid red;">
            <img :src="imgNotFound" width="45%" height="auto">
          </el-col>
        </el-row>
      </transition>
    </div>

    <!-- Cuadro de dialogo para seleccionar servicio -->

    <el-dialog
      v-el-drag-dialog
      :visible.sync="servicioDialogVisible"
      width="35em"
      custom-class="dialog-class-lista"
      center
      :show-close="false"
    >
      <sticky class-name="sub-navbar">
        <div style="border: 0px solid red; color: white; text-align: center;">
          <h2>Seleccionar servicio</h2>
        </div>
      </sticky>
      <div class="createPost-container" style="padding-top: 35px; padding-bottom: 5px; padding-left: 20px;">
        <el-form :model="formServicio" label-width="120px" class="demo-ruleForm">
          <el-form-item label="Servicio" prop="servicio">
            <el-select v-model="formServicio.servicio" placeholder="Seleccione un servicio" class="control-modal">
              <el-option
                v-for="item in datosServicios"
                :key="item.idservicio"
                :label="item.servicio"
                :value="item.idservicio"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="servicioDialogVisible = false">Cancelar</el-button>
            <el-button
              type="success"
              @click="
                servicioDialogVisible = false;
                seleccionarServicio();
              "
            >Aceptar</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <!-- Cuadro de dialogo para mostrar detalle del 'proceso' piechart(grafica) -->

    <el-dialog
      :visible.sync="detalleDialogVisible"
      width="55em"
      custom-class="dialog-class-lista"
      center
      :show-close="false"
    >
      <sticky class-name="sub-navbar">
        <div style="border: 0px solid red; color: white; text-align: center;">
          <h2>Detalle {{ titleDialog }}</h2>
        </div>
      </sticky>
      <!-- Tabla donde se lista, ordena y realiza busqueda de los expedientes -->

      <div class="app-container">
        <el-card class="box-card">
          <el-table
            :z-index="0"
            :data="
              datosProcesos.filter(
                (data) =>
                  !busquedaExpediente ||
                  data.expediente
                    .toLowerCase()
                    .includes(busquedaExpediente.toLowerCase())
              )
            "
            style="width: 100%; border: 1px solid #d8ebff"
            border
          >
            <el-table-column
              v-for="column in tableColumns"
              :key="column.label"
              :label="column.label"
              :prop="column.prop"
              align="center"
              sortable
              :width="
                column.prop === 'expediente'
                  ? 180
                  : column.prop === 'idproceso'
                    ? 70
                    : column.prop === 'empresa'
                      ? 270
                      : column.prop === 'causa'
                        ? 300
                        : column.prop === 'fase' ? 100 : ''
              "
            />
            <el-table-column align="center">
              <!-- eslint-disable-next-line -->
              <template slot="header" slot-scope="scope">
                <el-input
                  v-model="busquedaExpediente"
                  size="mini"
                  placeholder="No. Expediente"
                />
              </template>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="success"
                  @click="handleProceso(scope.row)"
                ><b>Ver</b></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky' // 粘性header组件
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
import PanelGroupProceso from './components/PanelGroupProceso'
import PieChart from './components/PieChart'
import { getListProcesosEmpresa } from '@/api/procesosDIEG/informes'
import { getListProcesosCausal } from '@/api/procesosDIEG/informes'
import { getListProcesosEstado } from '@/api/procesosDIEG/informes'
import { getListProcesosUsuario } from '@/api/procesosDIEG/informes'
import imgNotFound from '@/assets/not_found.png'
import { getListServicios } from '@/api/procesosDIEG/servicios'

export default {
  name: 'Expedientes',
  directives: { elDragDialog },
  components: {
    PieChart,
    PanelGroupProceso,
    Sticky
  },
  data() {
    return {
      loadingEmpresas: true,
      dataEmpresas: {},
      pieChartDataEmpresas: {},
      loadingCausas: true,
      dataCausas: {},
      pieChartDataCausas: {},
      loadingEstado: true,
      dataEstado: {},
      pieChartDataEstado: {},
      loadingUsuarios: true,
      DataUsuarios: {},
      pieChartDataUsuarios: {},
      selectPie: 'activos',
      imgNotFound: imgNotFound,
      selectServicio: {
        idservicio: 0,
        nombre: 'Todos'
      },
      servicioDialogVisible: false,
      formServicio: {
        servicio: 0
      },
      datosServicios: [],
      detalleDialogVisible: false,
      tableColumns: [],
      datosProcesos: [],
      busquedaExpediente: '',
      titleDialog: ''
    }
  },
  created() {
    this.initView()
  },
  methods: {
    handleDataPie(datos, title) {
      this.busquedaExpediente = ''
      this.titleDialog = title
      this.detalleDialogVisible = true
      // console.log(datos)
      this.tableColumns = datos.columns
      this.datosProcesos = datos.data
    },
    handleProceso(proceso) {
      // console.log('DIALOG PROCESO -> ', proceso)
      this.detalleDialogVisible = false
      this.$router.push({
        path: `/procesos/detalle/${proceso.idproceso}`
      })
    },
    initView() {
      this.getData(this.formServicio.servicio) // 0: Indica todos los servicios / 1: Indica servicio de energía / 2: Gas / 3: GLP
    },
    async getData(idservicio) {
      this.getDataEmpresas(idservicio)
      // this.getDataCausas(idservicio)
      this.getDataEstado(idservicio)
      this.getServicios(idservicio)
      this.getDataUsuarios(idservicio)
    },
    handleSetPieChartData(type) {
      if (type.item === 'servicio') {
        this.servicioDialogVisible = true
      } else {
        this.selectPie = type.msg
        this.pieChartDataEmpresas = this.dataEmpresas[type.msg]
        this.pieChartDataCausas = this.dataCausas[type.msg]
        this.pieChartDataEstado = this.dataEstado[type.msg]
        this.pieChartDataUsuarios = this.DataUsuarios[type.msg]
      }
    },
    async getDataEmpresas(idservicio) {
      await getListProcesosEmpresa(idservicio).then((response) => {
        // console.log('PIECHART_EMPRESAS -> ', response)
        this.dataEmpresas = response
        this.pieChartDataEmpresas = this.dataEmpresas['activos']
        this.loadingEmpresas = false
      })
    },
    async getDataCausas(idservicio) {
      await getListProcesosCausal(idservicio).then((response) => {
        // console.log(response)
        this.dataCausas = response
        this.pieChartDataCausas = this.dataCausas['activos']
        this.loadingCausas = false
      })
    },
    async getDataEstado(idservicio) {
      await getListProcesosEstado(idservicio).then((response) => {
        // console.log(response)
        this.dataEstado = response
        this.pieChartDataEstado = this.dataEstado['activos']
        this.loadingEstado = false
      })
    },
    async getDataUsuarios(idservicio) {
      await getListProcesosUsuario(idservicio).then((response) => {
        // console.log(response)
        this.DataUsuarios = response
        this.pieChartDataUsuarios = this.DataUsuarios['activos']
        this.loadingUsuarios = false
      })
    },
    async getServicios() {
      await getListServicios().then((response) => {
        this.datosServicios = response
        this.datosServicios.unshift({
          'idservicio': 0,
          'servicio': 'Todos'
        })
      })
    },
    seleccionarServicio() {
      const nombreServicio = this.datosServicios.find((servicio) => servicio.idservicio === this.formServicio.servicio).servicio
      this.selectServicio = { idservicio: this.formServicio.servicio, nombre: nombreServicio }
      this.getData(this.formServicio.servicio)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
.control-modal {
  width: 20em;
}
@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>

<style lang="scss">
.dialog-class-lista {
  border-radius: 10px;
}

.dialog-class-lista .el-dialog__body {
  padding-top: 0 !important;
}
</style>
