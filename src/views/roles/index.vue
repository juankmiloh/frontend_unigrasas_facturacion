<template>
  <div>
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import viewAdmin from './administrador'
// import viewGestor from './gestor'
// import viewRevisor from './revisor'
// import viewAprobador from './aprobador'

export default {
  name: 'MenuRoles',
  components: {
    viewAdmin
    // viewGestor,
    // viewRevisor,
    // viewAprobador
  },
  data() {
    return {
      // currentRole: 'adminDashboard'
      // currentRole: 'defaultDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles' // obtiene el rol logueado
    ])
  },
  created() {
    console.log('ROL LOGUEADO -> ', this.roles)
    if (this.roles.includes('administrador')) {
      this.currentRole = 'viewAdmin'
    }
    // if (this.roles.includes('gestor')) {
    //   this.currentRole = 'viewGestor'
    // }
    // if (this.roles.includes('revisor')) {
    //   this.currentRole = 'viewRevisor'
    // }
    // if (this.roles.includes('aprobador')) {
    //   this.currentRole = 'viewAprobador'
    // }
  }
}
</script>
