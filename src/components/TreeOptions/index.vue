<template>
  <el-row style="height: 100%; overflow: auto; background: #f7d9cd;" :style="{ borderRight: nametree === 'año' ? '1px solid #606266' : '' }">
    <el-col :span="24" class="pane-fixed-options">
      <div class="pane-text-options">
        <label>{{ nametree | uppercase }}</label>
      </div>
      <el-input
        v-if="datatree.length"
        v-model="filterText"
        size="mini"
        placeholder="Buscar"
        prefix-icon="el-icon-search"
      />
    </el-col>
    <el-col v-loading="loading" :span="24" style="border: 0px solid; height: 100%;">
      <el-tree
        ref="tree"
        :data="datatree"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[0]"
        :props="defaultProps"
        check-on-click-node
        :filter-node-method="filterNode"
        class="tree-class"
        @check-change="handleCheckChange"
      />
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    datatree: {
      type: Array,
      default: null
    },
    nametree: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      nodoSelect: [],
      count: 0,
      filterText: ''
    }
  },
  watch: {
    datatree: {
      deep: true,
      handler(val) {
        // console.log(`Cambia datatree ${this.nametree} -> `, val)
        this.nodoSelect = []
      }
    },
    filterText(val) {
      // console.log(val.toUpperCase())
      this.$refs.tree.filter(val.toUpperCase())
    }
  },
  updated() {
    this.getCheckedNodes()
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    getCheckedNodes() {
      // console.log(this.$refs.tree.getCheckedNodes())
    },
    handleCheckChange(data, checked, indeterminate) {
      // console.log(`${this.count}. data -> `, data)
      // console.log(`${this.count}. Nodo -> ${data.id} ---- checked -> ${checked} ---- hijos -> ${indeterminate}`)
      if (data.id === 0) {
        window.localStorage.setItem(`padre_checked_${this.nametree}`, JSON.stringify(checked))
        window.localStorage.setItem(`hijos_checked_${this.nametree}`, JSON.stringify(indeterminate))
      }
      const padreCheck = JSON.parse(window.localStorage.getItem(`padre_checked_${this.nametree}`))
      const hijosChecked = JSON.parse(window.localStorage.getItem(`hijos_checked_${this.nametree}`))
      // Padre seleccionado
      if (padreCheck && !hijosChecked) {
        // console.log('Seleccionar todo')
        this.verifyNodo(data.id, checked)
        if (this.nodoSelect.length === this.datatree[0].total) {
          this.$emit('selected', this.nodoSelect)
        }
      } else if (!padreCheck && hijosChecked) { // Padre no seleccionado con hijos seleccionados
        // console.log('Seleccionar nodo')
        this.verifyNodo(data.id, checked)
        if (this.nodoSelect.length !== this.datatree[0].total && this.nodoSelect.length > 0) {
          this.$emit('selected', this.nodoSelect)
        } else {
          // console.log('esta entrando aca -> ', this.nametree, ' nodo -> ', data.id)
          this.$emit('selected', [])
        }
      } else if (!padreCheck && !hijosChecked) { // Padre no seleccionado e hijos no seleccionados
        // console.log('No seleccionar nada')
        this.nodoSelect = []
        window.localStorage.setItem(`hijos_checked_${this.nametree}`, JSON.stringify(true))
      }
      this.count++
    },
    verifyNodo(nodo, checked) {
      if (Number(nodo) !== 0) {
        if (checked) {
          const index = this.nodoSelect.indexOf(Number(nodo))
          // Si el nodo no esta en el arreglo se agrega
          if (index === -1) {
            this.nodoSelect.push(Number(nodo))
          }
        } else if (!checked) {
          const index = this.nodoSelect.indexOf(Number(nodo))
          // Si el nodo esta en el arreglo se elimina
          if (index !== -1) {
            this.nodoSelect.splice(index, 1)
          }
        }
      }
    }
  }
}
</script>

<style scoped>
  .pane-fixed-options {
    background: #f7d9cd;
    z-index: 1;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }

  .pane-text-options {
    padding: 4px;
    border: 0px solid #4CAF50;
    text-align: center;
    background: #303133;
    color: white;
  }

  .tree-class {
    z-index: 0;
    background: #f7d9cd;
  }
</style>
