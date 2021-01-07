<template>
  <proceso-detalle :is-detail="true" />
</template>

<script>
import ProcesoDetalle from './components/ProcesoDetalle'

export default {
  name: 'DetalleForm',
  components: { ProcesoDetalle }
}
</script>
