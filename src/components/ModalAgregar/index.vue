<template>
  <el-dialog
    v-el-drag-dialog
    :visible.sync="modalvisible"
    :before-close="handleCancel"
    width="40%"
    center
    custom-class="dialog-class"
    :show-close="false"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <sticky class-name="sub-navbar">
      <div style="border: 0px solid red; color: white; text-align: center">
        <h2>{{ modaltitulo }}</h2>
      </div>
    </sticky>
    <div
      class="createPost-container"
      style="padding-top: 35px; padding-bottom: 20px; padding-left: 13px"
    >
      <el-form
        ref="modalform"
        :model="model"
        :rules="rulesform"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item v-for="component in domcomponents" :key="component.prop" :label="component.label" :prop="component.prop">
          <span v-if="component.type === 'radiogroup'">
            <el-radio-group v-model="model[component.prop]">
              <el-radio-button
                v-for="item in datamodal[component.prop]"
                :key="item.id"
                :label="item.label"
              />
            </el-radio-group>
          </span>
          <span v-if="component.type === 'text'">
            <el-input
              v-model="model[component.prop]"
              autocomplete="off"
              :placeholder="component.placeholder"
              class="control-modal"
              @keyup.enter.native="handleForm('modalform')"
            />
          </span>
          <span v-if="component.type === 'number'">
            <el-input
              v-model.number="model[component.prop]"
              autocomplete="off"
              class="control-modal"
              :placeholder="component.placeholder"
              @keyup.enter.native="handleForm('modalform')"
            />
          </span>
          <span v-if="component.type === 'decimal'">
            <el-input-number
              v-model.number="model[component.prop]"
              :precision="2"
              :step="0.01"
              autocomplete="off"
              class="control-modal"
              :placeholder="component.placeholder"
              @keyup.enter.native="handleForm('modalform')"
            />
          </span>
          <span v-if="component.type === 'textarea'">
            <el-input
              v-model="model[component.prop]"
              type="textarea"
              class="control-modal"
              rows="4"
              :placeholder="component.placeholder"
            />
          </span>
          <span v-if="component.type === 'select'">
            <el-select
              v-model="model[component.prop]"
              filterable
              :placeholder="component.placeholder"
              class="control-modal"
              clearable
              :disabled="action === 'Editar' ? true : false"
            >
              <span v-if="action === 'Editar'">
                <el-option :label="model.item" :value="model.iditem" />
              </span>
              <span v-else> <!-- Opciones para cuando es agregar -->
                <el-option
                  v-for="item in datamodal[component.prop]"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value"
                />
              </span>
            </el-select>
          </span>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleCancel()">Cancelar</el-button>
          <el-button
            type="success"
            @click="handleForm('modalform')"
          >{{ action }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
import Sticky from '@/components/Sticky' // 粘性header组件

export default {
  name: 'ModalConfirm',
  directives: { elDragDialog },
  components: { Sticky },
  props: {
    modalvisible: {
      type: Boolean,
      default: false
    },
    modaltitulo: {
      type: String,
      default: ''
    },
    modalform: {
      type: Object,
      default: null
    },
    domcomponents: {
      type: Array,
      default: null
    },
    rulesform: {
      type: Object,
      default: null
    },
    datamodal: {
      type: Object,
      default: null
    },
    action: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      model: {}
    }
  },
  watch: {
    modalform: {
      deep: true,
      handler(val) {
        this.model = val
      }
    }
  },
  created() {
    this.model = {}
  },
  methods: {
    async handleForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // Devolvemos el object del form y cerramos el dialogo
          // console.log('MODELO -> ', this.modalform)
          this.$emit('confirmar', { response: true, action: this.action, data: this.modalform })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleCancel() {
      if (this.action === 'Agregar') {
        this.$refs['modalform'].resetFields()
      }
      this.$emit('confirmar', { response: false })
    }
  }
}
</script>

<style lang="scss" scoped>
.control-modal {
  width: 85%;
}
</style>

<style lang="scss">
.dialog-class {
  border-radius: 10px;
}

.dialog-class .el-dialog__body {
  padding-top: 0 !important;
}
</style>
