<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :width="x.matches ? '' : '55em'"
    :fullscreen="x.matches ? true : false"
    custom-class="dialog-class-pie"
    center
    :show-close="true"
    :before-close="handleClose"
    destroy-on-close
  >
    <sticky class-name="sub-navbar">
      <div style="border: 0px solid red; color: white; text-align: center">
        <h2>Detalle</h2>
      </div>
    </sticky>
    <!-- Tabla donde se lista, ordena los datos de los pie chart´s -->
    <table-dialog
      :nametable="title"
      :datatable="dialogdata"
      :tablecolumns="dialogcolumns"
      :loading="loadingTable"
      heightxs="75vh"
      @tableids="selectTableDialog"
    />
  </el-dialog>
</template>

<script>
import Sticky from '@/components/Sticky' // 粘性header组件
import tableDialog from '@/components/Table'
export default {
  components: {
    Sticky,
    tableDialog
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    dialogdata: {
      type: Array,
      default: null
    },
    dialogcolumns: {
      type: Array,
      default: null
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false,
      x: '',
      loadingTable: false
    }
  },
  watch: {
    visible: {
      deep: true,
      handler(val) {
        // console.log('visible -> ', this.dialogcolumns)
        this.dialogVisible = val
      }
    }
  },
  created() {
    this.x = window.matchMedia('(max-width: 800px)')
  },
  methods: {
    handleClose() {
      this.$emit('closeDialogPie', false)
    },
    selectTableDialog(val) {
      // console.log('select table dialog -> ', val)
    }
  }
}
</script>

<style lang="scss">

// Pantallas superiores a 800px (PC)
@media screen and (min-width: 800px) {
  .dialog-class-pie {
    border-radius: 10px;
  }

  .dialog-class-pie .el-dialog__body {
    padding-top: 0 !important;
  }

  .control-modal-informe {
    width: 20em;
  }
}

// Pantallas inferiores a 800px (mobile)
@media screen and (max-width: 800px) {
  .control-modal-informe {
    width: 95%;
  }

  .dialog-class-pie .el-dialog__body {
    padding: 0 !important;
  }

  .dialog-class-pie .el-dialog__header {
    display: block;
  }
}
</style>
