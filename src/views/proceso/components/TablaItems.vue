<template>
  <el-row>
    <el-col :md="24">
      <el-card class="box-card div-causas-header">
        <!-- <div slot="header" class="clearfix">
          <span>Card name</span>
          <el-button style="float: right; padding: 3px 0" type="text">Operation button</el-button>
        </div> -->
        <el-table
          ref="multipleTable"
          v-loading="loading"
          :data="listaItems"
          style="width: 100%; border: 1px solid #d8ebff;"
          height="37vh"
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
              <div v-if="column.prop === 'item'"><el-tag type="primary" style="font-size: 10px;">{{ scope.row[column.prop] }}</el-tag></div>
              <div v-else-if="column.prop === 'precio'" style="font-size: 13px;">$ {{ new Intl.NumberFormat("de-DE").format(scope.row[column.prop]) }}</div>
              <div v-else-if="column.prop === 'total'" style="font-size: 13px;">$ {{ getTotal(scope.row) }}</div>
              <div v-else style="font-size: 13px;">{{ scope.row[column.prop] }}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" width="125">
            <!-- eslint-disable-next-line -->
            <template slot="header" slot-scope="scope">
              <el-button
                :disabled="!vendedorEditar"
                style="border: 1px solid #67c23a"
                size="mini"
                icon="el-icon-circle-plus"
                round
                @click="handleAgregar()"
              >Agregar</el-button>
            </template>
            <template slot-scope="scope">
              <el-button
                :disabled="!vendedorEditar"
                size="mini"
                type="success"
                icon="el-icon-edit"
                @click="handleEdit(scope.row)"
              />
              <el-button
                :disabled="!vendedorEditar"
                size="mini"
                type="danger"
                icon="el-icon-delete-solid"
                @click="handleDelete(scope.row)"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>

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
  </el-row>
</template>

<script>
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
import ModalAgregar from '@/components/ModalAgregar'
import ModalDelete from '@/components/ModalConfirm'
import { CONSTANTS } from '../constants/constants'
import { getListFacturaItems, createFacturaItems, updateFacturaItems, deleteFacturaItems } from '@/api/unigrasas/factura-has-item'
import { getListItems } from '@/api/unigrasas/items'

export default {
  directives: { elDragDialog },
  components: {
    ModalAgregar,
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
      loading: false,
      tableColumnsItems: CONSTANTS.tableColumnsItems,
      listaItems: [],
      vendedorEditar: this.editar,
      dialogVisibleItem: false,
      deleteDialogVisible: false,
      mensajeModalDelete: '',
      tituloModalItem: '',
      formItem: CONSTANTS.formItem,
      domItem: CONSTANTS.domItem,
      rulesFormItem: CONSTANTS.rulesFormItem,
      dataFormItem: {},
      modalAction: '',
      listaProductos: [],
      delItem: {}
    }
  },
  watch: {
    editar: {
      deep: true,
      handler(val) {
        console.log('antes !abogadoEditar" -> ', this.editar)
        this.abogadoEditar = val
        console.log('despues !abogadoEditar" -> ', this.editar)
      }
    }
  },
  async created() {
    await this.getFacturaItems()
    this.getItems()
  },
  async mounted() {
    this.formItem = {}
    // console.log('this.formItem -> ', this.formItem)
  },
  methods: {
    handleAgregar() {
      this.formItem.idfactura = this.idproceso
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
      this.mensajeModalDelete = `¿Realmente desea quitar <b>${data.item}</b>?`
      this.deleteDialogVisible = true
    },
    async submitAgregar(modal) {
      if (modal.response) {
        this.loading = true
        // console.log(modal)
        if (modal.action === 'Agregar') {
          await createFacturaItems(modal.data).then(async(response) => {
            this.$notify({
              title: 'Bien hecho!',
              message: 'Item agregado con éxito',
              position: 'bottom-right',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          await updateFacturaItems(modal.data).then(async(response) => {
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
        await this.getFacturaItems()
        this.getItems()
        this.loading = false
      } else {
        this.formItem = {}
        await this.getFacturaItems()
        this.getItems()
        this.dialogVisibleItem = false
      }
    },
    async submitDelete(confirm) {
      if (confirm) {
        this.loading = true
        await deleteFacturaItems(this.delItem).then(async(response) => {
          this.$notify({
            title: 'Información',
            message: 'Se ha eliminado el item!',
            position: 'bottom-right',
            type: 'success',
            duration: 2000
          })
          this.deleteDialogVisible = false
          await this.getFacturaItems()
          this.getItems()
          this.loading = false
        })
      } else {
        this.deleteDialogVisible = false
      }
    },
    async getFacturaItems() {
      await getListFacturaItems(this.idproceso).then((response) => {
        // console.log('LISTA DE ITEMS -> ', response)
        this.listaItems = response
        let total = 0
        this.listaItems.forEach(element => {
          total = total + element.cantidad * element.precio
        })
        this.$emit('total', total)
      })
    },
    async getItems() {
      await getListItems().then((response) => {
        // console.log('LISTA DE PRODCUTOS -> ', response)
        this.dataFormItem.iditem = response
        for (const iterator of this.listaItems) {
          this.dataFormItem.iditem.filter((item) => {
            if (item.value === iterator.iditem) { // Verifica si el item ya esta en la factura y se elimina del arreglo de items que se muestra en el select de items
              const posItem = this.dataFormItem.iditem.indexOf(item)
              this.dataFormItem.iditem.splice(posItem, 1)
            }
          })
        }
      })
    },
    getTotal(data) {
      const total = data.cantidad * data.precio
      return new Intl.NumberFormat('de-DE').format(total)
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
