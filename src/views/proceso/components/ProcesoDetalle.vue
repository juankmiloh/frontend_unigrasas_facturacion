<template>
  <div class="createPost-container" style="background: #f7fbff; height: 89vh">
    <sticky class-name="sub-navbar">
      <div style="border: 0px solid red">
        <!-- Boton para abrir modal de etapas -->
        <transition name="el-zoom-in-center">
          <el-button
            v-show="showButtons"
            :disabled="!generarFactura || total === 0"
            style="border: 2px solid #67c23a"
            size="medium"
            icon="el-icon-top-right"
            round
            @click="handlePDF()"
          >Ver factura</el-button>
        </transition>
      </div>
    </sticky>

    <!-- Formulario donde se cargan los datos del proceso -->

    <div v-loading="loading" class="app-container">
      <el-row :gutter="10">
        <!-- Card datos proceso -->
        <el-form
          ref="formProceso"
          :rules="rulesFormProceso"
          :model="formProceso"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-col :md="8" style="border: 0px solid blue">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>Datos generales</span>
              </div>

              <el-form-item label="Numeración" prop="idfactura">
                <el-input
                  v-model="formProceso.idfactura"
                  autocomplete="off"
                  placeholder="No. factura"
                  class="control-modal"
                  readonly
                />
              </el-form-item>
              <el-form-item label="Cliente" prop="cliente">
                <el-select
                  v-model="formProceso.cliente"
                  filterable
                  placeholder="Seleccione un cliente"
                  class="control-modal"
                  :disabled="!editarProceso"
                >
                  <el-option
                    v-for="item in datosClientes"
                    :key="item.idcliente"
                    :label="item.nombre"
                    :value="item.idcliente"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="Divisa" prop="divisa">
                <el-select
                  v-model="formProceso.divisa"
                  filterable
                  placeholder="Seleccione divisa"
                  class="control-modal"
                  :disabled="!editarProceso"
                >
                  <el-option
                    label="COP - Colombia, Pesos"
                    value="COP - Colombia, Pesos"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="Vendedor" prop="idusuario">
                <el-select
                  v-model="formProceso.idusuario"
                  filterable
                  placeholder="Seleccione un usuario"
                  class="control-modal"
                  :disabled="!editarProceso"
                >
                  <el-option
                    v-for="item in datosUsuarios"
                    :key="item.idusuario"
                    :label="item.nombre + ' ' + item.apellido"
                    :value="item.idusuario"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="Emisión" prop="f_emision">
                <el-date-picker
                  v-model="formProceso.f_emision"
                  type="datetime"
                  placeholder="Seleccione una fecha"
                  class="control-modal"
                  :disabled="!editarProceso"
                />
              </el-form-item>
              <el-form-item label="Vencimiento" prop="f_vencimiento">
                <el-date-picker
                  v-model="formProceso.f_vencimiento"
                  :disabled="!abogadoEditar"
                  type="date"
                  placeholder="Seleccione una fecha"
                  class="control-modal"
                />
              </el-form-item>
              <el-form-item label="Descripción" prop="descripcion">
                <el-input
                  v-model="formProceso.descripcion"
                  :disabled="!abogadoEditar"
                  type="textarea"
                  class="control-modal"
                  rows="5"
                  maxlength="140"
                  show-word-limit
                  placeholder="Ingrese una nota"
                />
              </el-form-item>
            </el-card>
          </el-col>

          <!-- Form datos medios de pago -->

          <el-col :md="16" style="border: 0px solid blue">
            <el-row>
              <el-col
                :md="24"
                class="input-etapas div-card"
                style="border: 0px solid blue;"
              >
                <el-card class="box-card div-card-header" style="padding: 0; margin: 0">
                  <!-- <div slot="header" class="clearfix">
                    <span>Medios de pago</span>
                  </div> -->
                  <el-row :gutter="20">
                    <el-col :span="8" style="border: 0px solid red">
                      <el-form-item label="" prop="metodopago">
                        <el-row>
                          <el-col :span="24">
                            <label style="color: #606266"><span style="color: red;">* </span>Método de pago</label>
                          </el-col>
                          <el-col :span="24">
                            <el-select
                              v-model="formProceso.metodopago"
                              :disabled="!abogadoEditar"
                              filterable
                              placeholder="Seleccione método de pago"
                              class="control-modal"
                              clearable
                            >
                              <el-option
                                v-for="item in datosMetodopago"
                                :key="item.idmetodopago"
                                :label="item.nombre"
                                :value="item.idmetodopago"
                              />
                            </el-select>
                          </el-col>
                        </el-row>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8" style="border: 0px solid">
                      <el-form-item label="" prop="mediopago">
                        <el-row>
                          <el-col :span="24">
                            <label style="color: #606266"><span style="color: red;">* </span>Medio de pago</label>
                          </el-col>
                          <el-col :span="24">
                            <el-select
                              v-model="formProceso.mediopago"
                              :disabled="!abogadoEditar"
                              filterable
                              placeholder="Seleccione medio de pago"
                              class="control-modal"
                              clearable
                            >
                              <el-option
                                v-for="item in datosMediopago"
                                :key="item.idmediopago"
                                :label="item.nombre"
                                :value="item.idmediopago"
                              />
                            </el-select>
                          </el-col>
                        </el-row>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8" style="border: 0px solid">
                      <el-form-item label="" prop="f_pago">
                        <el-row>
                          <el-col :span="24">
                            <label style="color: #606266"><span style="color: red;">* </span>Fecha de pago</label>
                          </el-col>
                          <el-col :span="24">
                            <el-date-picker
                              v-model="formProceso.f_pago"
                              :disabled="!abogadoEditar"
                              type="date"
                              placeholder="Seleccione una fecha"
                              class="control-modal"
                            />
                          </el-col>
                        </el-row>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-card>
              </el-col>

              <!-- Tabla de items -->

              <el-col :md="24" style="border: 0px solid blue; padding-top: 1%;">
                <!-- Tabla de causales -->
                <tabla-items v-if="id" :idproceso="id" :editar="abogadoEditar" @total="submitTotal" />
              </el-col>

              <el-col :md="24" style="padding-top: 1%;" class="div-card">
                <el-card class="box-card div-card-header">
                  <el-row>
                    <el-col style="border: 1px solid white;" :span="14">
                      <span />
                    </el-col>
                    <el-col :span="10" style="text-align: right;">
                      <el-form-item label="Total" prop="total">
                        <el-input
                          v-model="valueTotal"
                          autocomplete="off"
                          placeholder="Total factura"
                          clearable
                          style="width: 100%;"
                          readonly
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-card>
              </el-col>

              <!-- Boton  / editar / actualizar -->

              <el-col :md="24" style="border: 0px solid blue">
                <el-card
                  class="box-card"
                  shadow="never"
                  style="background: none; border: 0; text-align: center"
                >
                  <el-button
                    v-show="showOnlyAdmin"
                    style="border: 0px solid #67c23a; width: 9em"
                    :type="editarProceso ? 'danger' : 'primary'"
                    :icon="editarProceso ? 'el-icon-error' : 'el-icon-edit'"
                    @click="editarProceso = !editarProceso; editarForm();"
                  >{{ textEditarProceso }}</el-button>
                  <el-button
                    :disabled="!abogadoEditar"
                    style="width: 9em"
                    :type="editarProceso ? 'primary' : 'success'"
                    :icon="editarProceso ? 'el-icon-circle-check' : 'el-icon-check'"
                    @click="submitForm('formProceso')"
                  >{{ textActualizar }}</el-button>
                </el-card>
              </el-col>
            </el-row>
          </el-col>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getFactura, getFacturaInicial, updateFactura, updateFacturaTotal } from '@/api/unigrasas/facturas'
import { getListClientes } from '@/api/unigrasas/clientes'
import { getListUsuarios } from '@/api/unigrasas/usuarios'
import { getListMetodopago } from '@/api/unigrasas/metodopago'
import { getListMediopago } from '@/api/unigrasas/mediopago'
import Sticky from '@/components/Sticky' // 粘性header组件
import { CONSTANTS } from '@/constants/constants'
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
import moment from 'moment'
import TablaItems from './TablaItems'

export default {
  name: 'ProcesoDetalle',
  directives: { elDragDialog },
  components: { Sticky, TablaItems },
  props: {
    isDetail: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      id: '',
      datosUsuarios: [],
      datosClientes: [],
      datosMetodopago: [],
      datosMediopago: [],
      formProceso: CONSTANTS.formDetalleProceso,
      rulesFormProceso: CONSTANTS.rulesDetalleProceso,
      /* Si es o no para editar */
      editarProceso: false,
      textEditarProceso: 'Editar',
      textActualizar: 'Actualizar',
      loading: false,
      tempRoute: {},
      showButtons: false,
      showButtonsModal: false,
      showOnlyAdmin: false,
      abogadoEditar: false,
      total: 0,
      valueTotal: 0,
      generarFactura: false
    }
  },
  computed: {
    ...mapGetters(['name', 'roles', 'idusuario'])
  },
  watch: {
    total: {
      deep: true,
      handler(val) {
        // console.log(val);
        this.formProceso.total = val
        this.valueTotal = new Intl.NumberFormat('de-DE').format(val)
      }
    }
  },
  created() {
    if (this.isDetail) {
      this.loading = true
      // console.log('PARAMETROS URL -> ', this.$route.params)
      this.id = this.$route.params.id
      // this.getEtapasProceso(this.id) // Funcion para obtener las etapas del proceso
      this.initView()
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    handlePDF() {
      const routeData = this.$router.resolve({ path: `/pdf/factura/${this.id}` })
      window.open(routeData.href, '_self')
      // window.open(routeData.href, '_blank')
    },
    async submitTotal(total) {
      // console.log('TOTAL -> ', total)
      this.total = total
      await updateFacturaTotal({ idfactura: this.id, total: this.total })
    },
    async initView() {
      if (this.roles[0] === 'administrador') {
        this.showOnlyAdmin = true
        this.abogadoEditar = true
      }
      this.getUsuarios()
      this.getClientes()
      this.getMetodopago()
      this.getMediopago()
      await this.fetchData(this.id)
    },
    async getUsuarios() {
      await getListUsuarios().then((response) => {
        this.datosUsuarios = response
      })
    },
    async getClientes() {
      await getListClientes().then((response) => {
        this.datosClientes = response
      })
    },
    async getMetodopago() {
      await getListMetodopago().then((response) => {
        this.datosMetodopago = response
      })
    },
    async getMediopago() {
      await getListMediopago().then((response) => {
        this.datosMediopago = response
      })
    },
    async fetchData(id) {
      let modelProceso = {}
      await getFactura(id)
        .then(async(response) => {
          // console.log('RESPONSE PROCESO -> ', response)
          if (response.length > 0) {
            // Se obtienen los datos del proceso si ya esta diligenciado en su totalidad
            // console.log('RESPONSE proceso completo -> ', response)
            modelProceso = response[0]
            this.generarFactura = true
          } else {
            // Sino se cargan los datos del proceso completos (Esto pasa cuando se crea un proceso nuevo)
            await getFacturaInicial(id).then(async(response) => {
              // console.log('RESPONSE inicial -> ', response)
              modelProceso = response[0]
              modelProceso.descripcion = '' // Se agrega el atributo al modelo del proceso
              this.generarFactura = false
            })
          }
          this.loading = false
          this.showButtons = true
          this.formProceso = modelProceso
          // console.log('Model proceso -> ', this.formProceso)
          // set tagsview title
          this.setTagsViewTitle()
          // set page title
          this.setPageTitle()
          if (this.$refs['formProceso']) {
            this.$refs['formProceso'].resetFields()
          }
          // console.log('fetchData 3 -> ', this.$refs['formProceso'])
        })
        .catch((err) => {
          // console.log(err)
          return err
        })
    },
    setTagsViewTitle() {
      const title = 'Factura'
      const route = Object.assign({}, this.tempRoute, {
        title: `${title} ${this.formProceso.idfactura}`
      })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = 'Factura'
      document.title = `${title} - ${this.formProceso.idfactura}`
    },
    editarForm() {
      if (this.editarProceso) {
        // Si se activa el boton editar proceso
        this.$notify({
          title: 'Advertencia',
          message: 'Has activado el modo edición!',
          type: 'warning',
          duration: 2000
        })
        this.textEditarProceso = 'Cancelar'
        this.textActualizar = 'Guardar'
        window.localStorage.setItem(
          'form_save',
          JSON.stringify(this.formProceso)
        ) // Se envia una copia del proceso al localstorage
      } else {
        // Cuando Se desactiva el boton editar proceso (Se restablece el proceso a como estaba antes de darle editar)
        this.$notify({
          title: 'info',
          message: 'Has desactivado el modo edición!',
          type: 'info',
          duration: 2000
        })
        this.textEditarProceso = 'Editar'
        this.textActualizar = 'Actualizar'
        this.formProceso = JSON.parse(window.localStorage.getItem('form_save')) // Se carga la copia del proceso guardado en localstorage
        window.localStorage.removeItem('form_save')
      }
    },
    submitForm() {
      let modelProceso = this.formProceso
      // console.log('THISFORMPROCESO -> ', modelProceso)
      this.$refs.formProceso.validate(async(valid) => {
        if (valid) {
          this.loading = true
          this.showButtons = false
          modelProceso.f_emision = moment(modelProceso.f_emision).format('YYYY/MM/DD HH:mm:ss')
          modelProceso.f_vencimiento = moment(modelProceso.f_vencimiento).format('YYYY/MM/DD HH:mm:ss')
          modelProceso.f_pago = moment(modelProceso.f_pago).format('YYYY/MM/DD HH:mm:ss')
          modelProceso.total = parseInt(modelProceso.total)
          await updateFactura(modelProceso).then(async(response) => {
            if (this.editarProceso) {
              this.$notify({
                title: 'info',
                message: 'Se ha desactivado el modo edición!',
                type: 'info',
                duration: 2000
              })
            }
            await getFactura(this.id).then(async(response) => {
              // Se actulizan los datos del proceso
              // console.log('ACTUALIZAR PROCESO -> ', response)
              modelProceso = response[0]
              this.textEditarProceso = 'Editar'
              this.textActualizar = 'Actualizar'
              this.$notify({
                title: 'Bien hecho!',
                message: 'Factura actualizada con éxito',
                position: this.editarProceso ? 'top-right' : 'bottom-right',
                type: 'success',
                duration: 2000
              })
              this.editarProceso = false
              this.loading = false
              this.showButtons = true
              this.generarFactura = true
            })
          })
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.control-modal {
  width: 100%;
}
</style>

<style lang="scss" scoped>
.control-modal-agregar {
  width: 25em;
}

.dashboard-editor-container {
  // padding: 32px;
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
    // padding: 16px 16px 0;
    // margin-bottom: 32px;
  }
}
</style>

<style lang="scss">
.card-etapa .el-card__header {
  padding: 0;
}

.card-etapa .el-card__body {
  padding: 0;
}

.dialog-class-ldetalle .el-dialog__header {
  border-radius: 10px;
  display: none;
}

.dialog-class-ldetalle .el-dialog__body {
  margin: 0 !important;
  padding: 0 !important;
  height: 100%;
}

.dialog-color {
  background: #f7fbff;
}

.input-caducidad .el-form-item .el-form-item__content {
  margin-left: 0% !important;
}

.input-etapas .el-form-item .el-form-item__content {
  margin-left: 0% !important;
}

.div-card .div-card-header .el-card__body {
  border: 0px solid red;
  padding: 2% 2% 0% 2%;
}
</style>
