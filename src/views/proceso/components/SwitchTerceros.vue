<template>
  <el-col :md="24" style="border: 0px solid blue; padding-top: 10px;">
    <el-card class="box-card" style="padding-bottom: 4px; padding-top: 9px;">
      <el-row>
        <el-col :md="19">
          <span>Terceros interesados</span>
          (<count-to :start-val="0" :end-val="countTerceros" :duration="5000" class="card-panel-num" />)
        </el-col>
        <el-col :md="countTerceros > 0 ? 4 : 5">
          <el-switch v-model="valSwitch" active-color="#13ce66" :disabled="switchDisable || !abogadoEditar" />
        </el-col>
        <el-col v-if="countTerceros > 0" :md="countTerceros > 0 ? 1 : 0">
          <div>
            <el-link icon="el-icon-user-solid" :underline="false" @click="dialogDrawer=true" />
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- Cuadro de dialogo para agregar / editar tercero -->

    <el-dialog
      v-el-drag-dialog
      :visible.sync="openModalTercero"
      :before-close="closeModalTercero"
      width="34em"
      custom-class="dialog-class-lista"
      :show-close="false"
    >
      <sticky class-name="sub-navbar">
        <div style="border: 0px solid red; color: white; text-align: center">
          <h2>{{ textActionTercero }} tercero</h2>
        </div>
      </sticky>
      <div
        class="createPost-container"
        style="padding-top: 35px; padding-bottom: 20px; padding-left: 13px"
      >
        <el-form
          ref="formTercero"
          :model="formTercero"
          :rules="rulesFormTercero"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="" prop="persona">
            <el-radio-group v-model="formTercero.persona">
              <el-radio-button
                v-for="item in dataPersona"
                :key="item.idpersona"
                :label="item.nombre"
              />
            </el-radio-group>
          </el-form-item>
          <transition name="el-zoom-in-center">
            <el-form-item v-show="formTercero.persona" :label="formTercero.persona === 'Persona natural' ? 'Documento' : 'NIT'" prop="documento">
              <el-input
                v-model.number="formTercero.documento"
                autocomplete="off"
                class="control-modal"
              />
            </el-form-item>
          </transition>
          <el-form-item label="Nombre" prop="nombre">
            <el-input
              v-model="formTercero.nombre"
              autocomplete="off"
              clearable
              class="control-modal"
            />
          </el-form-item>
          <el-form-item label="Dirección" prop="direccion">
            <el-input
              v-model="formTercero.direccion"
              autocomplete="off"
              clearable
              class="control-modal"
            />
          </el-form-item>
          <el-form-item label="E-mail" prop="email">
            <el-input
              v-model="formTercero.email"
              autocomplete="off"
              clearable
              class="control-modal"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              @click="closeModalTercero();"
            >Cancelar</el-button>
            <el-button
              type="success"
              @click="submitFormTercero('formTercero')"
            >{{ textActionTercero }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <el-drawer
      ref="drawer"
      :before-close="handleClose"
      :visible.sync="dialogDrawer"
      direction="rtl"
      custom-class="demo-drawer"
      size="30%"
    >
      <div style="background: #f7fbff; height: 100%;">
        <sticky class-name="sub-navbar">
          <el-row>
            <el-col :span="24" style="text-align: center;">
              <label style="font-size: x-large; color: white;">Terceros interesados</label>
            </el-col>
          </el-row>
        </sticky>

        <!-- Card donde se listan los terceros interesados -->

        <div class="app-container">
          <el-row>
            <transition name="el-fade-in-linear">
              <el-col v-show="countTerceros > 0" v-loading="loading" :span="24">
                <el-card class="box-card" style="overflow-y: scroll; height: 70vh;">
                  <el-card v-for="item in datosTerceros" :key="item.idtercero" style="width: 100%; margin-bottom: 3%;">
                    <div slot="header" class="clearfix">
                      <span><b>{{ item.nombre }}</b></span>
                      <div style="float: right;">
                        <el-button size="mini" type="danger" icon="el-icon-delete" :disabled="!abogadoEditar" @click="handleDelete(item)" />
                      </div>
                      <div style="float: right; padding-right: 2%;">
                        <el-button style="border: 1px solid #67C23A;" size="mini" type="success" icon="el-icon-edit" :disabled="!abogadoEditar" @click="handleEditTercero(item)"><b>Editar</b></el-button>
                      </div>
                    </div>
                    <div class="text item">
                      {{ item.persona }}
                    </div>
                    <div class="text item">
                      Documento: {{ item.documento }}
                    </div>
                    <div class="text item">
                      Dirección: {{ item.direccion }}
                    </div>
                    <div class="text item">
                      e-mail: {{ item.email }}
                    </div>
                  </el-card>
                </el-card>
              </el-col>
            </transition>
          </el-row>
          <el-row>
            <el-col :span="24" style="text-align: center; padding-top: 5%;">
              <el-button
                style="border: 1px solid #67c23a"
                type="primary"
                icon="el-icon-circle-plus"
                round
                :disabled="!abogadoEditar"
                @click="handleAgregarTercero()"
              >Agregar</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-drawer>
    <modal-delete titulo="Advertencia" :mensaje="mensajeModalConfirm" :modalvisible="deleteDialogVisible" @confirmar="submitDelete" />
  </el-col>
</template>

<script>
import CountTo from 'vue-count-to'
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
import Sticky from '@/components/Sticky' // 粘性header组件
import ModalDelete from '@/components/ModalConfirm'
import { CONSTANTS } from '../constants/constants'
import { getTercerosProceso } from '@/api/procesosDIEG/terceros'
import { createTercero } from '@/api/procesosDIEG/terceros'
import { updateTercero } from '@/api/procesosDIEG/terceros'
import { deleteTercero } from '@/api/procesosDIEG/terceros'

export default {
  directives: { elDragDialog },
  components: {
    CountTo,
    Sticky,
    ModalDelete
  },
  props: {
    idproceso: {
      type: String,
      required: true
    },
    editar: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      tableColumns: CONSTANTS.tableColumnsTerceros,
      valSwitch: false,
      switchDisable: false,
      formTercero: CONSTANTS.formTercero,
      rulesFormTercero: CONSTANTS.rulesFormTercero,
      openModalTercero: false,
      dialogDrawer: false,
      datosTerceros: [],
      countTerceros: 0,
      busquedaTercero: '',
      textActionTercero: 'Agregar',
      dataPersona: CONSTANTS.dataPersona,
      mensajeModalConfirm: '',
      deleteDialogVisible: false,
      terceroDel: '',
      loading: false,
      abogadoEditar: this.editar
    }
  },
  watch: {
    valSwitch: {
      deep: true,
      handler(val) {
        this.formTercero = {}
        this.resetForm()
        console.log(val)
        if (this.countTerceros > 0) {
          this.valSwitch = true
          this.switchDisable = true
        } else {
          this.switchDisable = false
          this.valSwitch = false
          if (!this.dialogDrawer) {
            this.openModalTercero = true
          }
        }
      }
    },
    editar: {
      deep: true,
      handler(val) {
        console.log('antes !abogadoEditar" -> ', this.editar)
        this.abogadoEditar = val
        console.log('despues !abogadoEditar" -> ', this.editar)
      }
    }
  },
  created() {
    this.getTerceros(this.idproceso)
  },
  methods: {
    handleDelete(data) {
      // console.log(data)
      this.terceroDel = data.idtercero
      this.mensajeModalConfirm = `¿Realmente desea eliminar a <b>${data.nombre}</b>?`
      this.deleteDialogVisible = true
    },
    async submitDelete(confirm) {
      if (confirm) {
        this.loading = true
        await deleteTercero(this.terceroDel).then(async(response) => {
          this.$notify({
            title: 'Información',
            message: 'Se ha eliminado el tercero!',
            position: 'bottom-right',
            type: 'success',
            duration: 2000
          })
          this.getTerceros(this.idproceso)
          this.deleteDialogVisible = false
        })
      } else {
        this.deleteDialogVisible = false
      }
    },
    resetForm() {
      if (this.$refs['formTercero']) {
        this.formTercero = {}
        this.$refs['formTercero'].resetFields()
      }
    },
    handleAgregarTercero() {
      this.resetForm()
      this.textActionTercero = 'Agregar'
      this.openModalTercero = true
    },
    handleEditTercero(data) {
      // console.log(data)
      this.resetForm()
      this.textActionTercero = 'Editar'
      this.openModalTercero = true
      const modelTercero = data
      this.formTercero = modelTercero
    },
    handleClose(done) {
      done()
    },
    closeModalTercero() {
      this.formTercero = {}
      this.openModalTercero = false
    },
    submitFormTercero(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.loading = true
          this.formTercero.idproceso = this.idproceso
          this.formTercero.persona = this.dataPersona.find((persona) => persona.nombre === this.formTercero.persona).idpersona
          // console.log(this.formTercero)
          if (this.textActionTercero === 'Agregar') {
            await createTercero(this.formTercero).then(async(response) => {
              this.resetForm()
              this.$notify({
                title: 'Buen trabajo!',
                message: 'Tercero agregado con éxito',
                position: 'bottom-right',
                type: 'success',
                duration: 2000
              })
            }, (err) => {
              console.log(err)
              this.$notify({
                title: 'Advertencia',
                message: 'Doumento de usuario ya registrado!',
                position: 'bottom-right',
                type: 'warning',
                duration: 2000
              })
            })
          } else {
            await updateTercero(this.formTercero).then(async(response) => {
              this.resetForm()
              this.$notify({
                title: 'Buen trabajo!',
                message: 'Tercero actualizado con éxito',
                position: 'bottom-right',
                type: 'success',
                duration: 2000
              })
            }, (err) => {
              console.log(err)
            })
          }
          this.openModalTercero = false
          this.getTerceros(this.idproceso)
        }
      })
    },
    async getTerceros(idproceso) {
      await getTercerosProceso(idproceso).then((response) => {
        // console.log('TERCEROS -> ', response.length)
        this.countTerceros = response.length
        this.datosTerceros = response
        if (this.countTerceros > 0) {
          this.valSwitch = true
        } else {
          this.valSwitch = false
        }
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.control-modal {
  width: 23em;
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

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 15px;
  }
</style>
