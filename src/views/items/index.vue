<template>
  <div class="createPost-container" style="background: #f7fbff; height: 89vh;">
    <sticky class-name="sub-navbar">
      <div style="border: 0px solid red; text-align: center">
        <!-- Boton para agregar nuevo item al aplicativo -->
        <div>
          <transition name="el-zoom-in-bottom">
            <div v-show="!loading" class="transition-box">
              <el-button
                style="border: 1px solid #67c23a"
                size="medium"
                icon="el-icon-circle-plus"
                round
                @click="handleAgregar()"
              >Agregar item</el-button>
            </div>
          </transition>
        </div>
      </div>
    </sticky>
    <div class="app-container">
      <el-card class="box-card div-causas-header">
        <el-table
          ref="multipleTable"
          v-loading="loading"
          :data="listaItems.filter((data) =>!busquedaItem ||data.label.toLowerCase().includes(busquedaItem.toLowerCase()))"
          style="width: 100%; border: 1px solid #d8ebff"
          height="70vh"
          border
          fit
          highlight-current-row
        >
          <el-table-column
            v-for="column in tableColumnsItems"
            :key="column.label"
            :label="column.label"
            :prop="column.prop"
            align="center"
            :width="column.width"
            sortable
          >
            <template slot-scope="scope">
              <div v-if="column.prop === 'label'">
                <el-tag type="primary">{{ scope.row[column.prop] | uppercase }}</el-tag>
              </div>
              <div v-else-if="column.prop === 'precio'">
                <span>$ {{ scope.row[column.prop] }}</span>
              </div>
              <div v-else-if="column.prop === 'registro'">
                <span><i class="el-icon-time" /> {{ scope.row[column.prop] | formatDateHour }}</span>
              </div>
              <div v-else>{{ scope.row[column.prop] }}</div>
            </template>
          </el-table-column>
          <el-table-column align="center">
            <!-- eslint-disable-next-line -->
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="busquedaItem"
                size="mini"
                placeholder="Nombre item"
                clearable
              />
            </template>
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                icon="el-icon-edit"
                @click="handleEdit(scope.row)"
              ><b>Editar</b></el-button>
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete-solid"
                @click="handleDelete(scope.row)"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <!-- Modal de confirmacion para agregar / editar un item -->

    <modal-agregar
      :modaltitulo="tituloModalItem"
      :modalvisible="dialogVisibleItem"
      :modalform="formItem"
      :domcomponents="domItem"
      :rulesform="rulesFormItem"
      :datamodal="dataFormItem"
      :action="modalAction"
      @confirmar="submitAgregar"
    />

    <!-- Modal de confirmacion para borrar un item -->

    <modal-delete
      titulo="Advertencia"
      :mensaje="mensajeModalDelete"
      :modalvisible="deleteDialogVisible"
      @confirmar="submitDelete"
    />
  </div>
</template>

<script>
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
import ModalAgregar from '@/components/ModalAgregar'
import ModalDelete from '@/components/ModalConfirm'
import { CONSTANTS } from './constants/constants'
import {
  getListItems,
  createItem,
  updateItem,
  deleteItem
} from '@/api/unigrasas/items'
import Sticky from '@/components/Sticky' // 粘性header组件

export default {
  directives: { elDragDialog },
  components: {
    ModalAgregar,
    ModalDelete,
    Sticky
  },
  data() {
    return {
      loading: false,
      tableColumnsItems: CONSTANTS.tableColumnsItems,
      listaItems: [],
      dialogVisibleItem: false,
      deleteDialogVisible: false,
      mensajeModalDelete: '',
      tituloModalItem: '',
      formItem: CONSTANTS.formItem,
      domItem: CONSTANTS.domItem,
      rulesFormItem: CONSTANTS.rulesFormItem,
      dataFormItem: CONSTANTS.dataFormItem,
      modalAction: '',
      listaProductos: [],
      delItem: {},
      busquedaItem: ''
    }
  },
  async created() {
    this.loading = true
    await this.getItems()
  },
  async mounted() {
    this.formItem = {}
    // console.log('this.formItem -> ', this.formItem)
  },
  methods: {
    handleAgregar() {
      this.tituloModalItem = 'Agregar item'
      this.modalAction = 'Agregar'
      this.dialogVisibleItem = true
    },
    handleEdit(data) {
      // console.log('data -> ', data)
      this.formItem = data
      this.tituloModalItem = 'Editar item'
      this.modalAction = 'Editar'
      this.dialogVisibleItem = true
    },
    handleDelete(data) {
      this.delItem = data
      this.mensajeModalDelete = `¿Realmente desea eliminar <b>${data.label}</b>?`
      this.deleteDialogVisible = true
    },
    async submitAgregar(modal) {
      if (modal.response) {
        this.loading = true
        // console.log(modal)
        if (modal.action === 'Agregar') {
          modal.data.label = modal.data.label.toUpperCase()
          if (!modal.data.hasOwnProperty('descripcion')) {
            modal.data.descripcion = ''
          }
          await createItem(modal.data).then(async(response) => {
            this.$notify({
              title: 'Bien hecho!',
              message: 'Item agregado con éxito',
              position: 'bottom-right',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          modal.data.label = modal.data.label.toUpperCase()
          if (!modal.data.hasOwnProperty('descripcion')) {
            modal.data.descripcion = ''
          }
          await updateItem(modal.data).then(async(response) => {
            this.$notify({
              title: 'Bien hecho!',
              message: 'Item modificado con éxito',
              position: 'bottom-right',
              type: 'success',
              duration: 2000
            })
          })
        }
        this.formItem = {}
        this.dialogVisibleItem = false
        await this.getItems()
        this.loading = false
      } else {
        this.formItem = {}
        this.getItems()
        this.dialogVisibleItem = false
      }
    },
    async submitDelete(confirm) {
      if (confirm) {
        this.loading = true
        await deleteItem(this.delItem).then(async(response) => {
          this.$notify({
            title: 'Información',
            message: 'Se ha eliminado el item!',
            position: 'bottom-right',
            type: 'success',
            duration: 2000
          })
          this.deleteDialogVisible = false
          await this.getItems()
          this.loading = false
        }, (err) => {
          console.log(err)
          this.$notify({
            title: 'Advertencia',
            message: 'El item esta asociado a una factura!',
            position: 'top-right',
            type: 'error',
            duration: 2000
          })
          this.deleteDialogVisible = false
          this.loading = false
        })
      } else {
        this.deleteDialogVisible = false
      }
    },
    async getItems() {
      await getListItems(this.idproceso).then((response) => {
        // console.log('LISTA DE ITEMS -> ', response)
        this.listaItems = response
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

<style>
.div-causas .div-causas-header .el-card__header {
  padding-top: 4%;
  padding-left: 4%;
  height: 7vh;
}
</style>
