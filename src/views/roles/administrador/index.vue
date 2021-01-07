<template>
  <div>
    <component :is="currentView" />
  </div>
</template>

<script>
// ///////////////////////////////////////////////////////////////////////////////////////
/* Listado de importaciones de componentes */
// ///////////////////////////////////////////////////////////////////////////////////////
import viewProcesos from '../../proceso/Lista'
import viewEmpresas from './components/reporte_empresa'
import viewIndicadoresEmpresa from './components/indicadores_empresa'
import viewIndicadoresProcesosActivos from './components/indicadores_pactivos'
import viewIndicadoresProcesosTerminados from './components/indicadores_pterminados'

export default {
  name: 'MenuAdministrador',
  // ///////////////////////////////////////////////////////////////////////////////////////
  /* Listado del nombre de los componentes importados */
  // ///////////////////////////////////////////////////////////////////////////////////////
  components: {
    viewProcesos,
    viewEmpresas,
    viewIndicadoresEmpresa,
    viewIndicadoresProcesosActivos,
    viewIndicadoresProcesosTerminados
  },
  data() {
    return {
      // currentView: 'defaultDashboard'
    }
  },
  created() {
    const route = this.$route // obtenemos los parametros de la URL
    const tempRoute = Object.assign({}, route) // creamos un objeto de la URL
    const view = tempRoute.fullPath // obtenemos la URL de la vista
    console.log(view)
    // ///////////////////////////////////////////////////////////////////////////////////////
    /* Cargamos cada uno de los componentes con la ruta propuesta */
    // ///////////////////////////////////////////////////////////////////////////////////////
    // if (view === '/procesos/expedientes') {
    //   this.currentView = 'viewProcesos'
    // } else if (view === '/informe/pactivos') {
    //   this.currentView = 'viewIndicadoresProcesosActivos'
    // }
  }
}
</script>
