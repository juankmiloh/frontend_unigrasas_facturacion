<template>
  <div>
    loading -> {{ loading }}
    <el-tree
      ref="tree"
      v-loading="loading"
      :data="datatree"
      show-checkbox
      node-key="id"
      :default-expanded-keys="[0]"
      :default-checked-keys="[0]"
      :props="defaultProps"
      check-on-click-node
      @check-change="handleCheckChange"
    />
  </div>
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
      default: ''
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
      count: 0
    }
  },
  watch: {
    datatree: {
      deep: true,
      handler(val) {
        this.nodoSelect = []
      }
    }
  },
  updated() {
    this.getCheckedNodes()
  },
  methods: {
    getCheckedNodes() {
      console.log(this.$refs.tree.getCheckedNodes())
    },
    handleCheckChange(data, checked, indeterminate) {
      // console.log(`${this.count}. data -> `, data)
      // console.log(`${this.count}. Nodo -> ${data.id} ---- checked -> ${checked} ---- indeterminate -> ${indeterminate}`)
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
          this.$emit('selected', [0])
        }
      } else if (!padreCheck && hijosChecked) { // Padre no seleccionado con hijos seleccionados
        // console.log('Seleccionar nodo')
        this.verifyNodo(data.id, checked)
        if (this.nodoSelect.length !== this.datatree[0].total && this.nodoSelect.length > 0) {
          this.$emit('selected', this.nodoSelect)
        } else {
          this.$emit('selected', '')
        }
      } else if (!padreCheck && !hijosChecked) { // Padre no seleccionado e hijos no seleccionados
        // console.log('No seleccionar nada')
        this.verifyNodo(data.id, checked)
        if (checked) { // Nodo !== 0 seleccionado
          this.$emit('selected', this.nodoSelect)
        } else {
          this.$emit('selected', '')
        }
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
