<template>
  <el-card style="margin-bottom: 20px;">
    <div slot="header" class="clearfix">
      <span>Usuarios</span>
    </div>

    <div v-loading="loading" class="div-list-user">
      <el-card v-for="user in datosUsuarios" :key="user.idusuario" style="margin-bottom: 3%;">
        <el-row class="border-card">
          <el-col :span="6" :xs="24" style="border: 0px solid red; text-align: center;">
            <el-avatar :size="60">
              <img
                :src="user.avatar"
              >
            </el-avatar>
          </el-col>
          <el-col :span="12" :xs="24" class="data-user">
            <span style="color: #303133;"><b>{{ user.nombre + ' ' + user.apellido }}</b></span><br>
            <span style="font-size: small; color: #909399;"><b>{{ user.privilegio }}</b></span>
          </el-col>
          <el-col :span="3" :xs="12" class="btn-user-success">
            <el-button style="border: 1px solid #67C23A;" type="success" plain size="mini" icon="el-icon-top-right" @click="returnUser(user)" />
          </el-col>
          <el-col :span="3" :xs="12" class="btn-user-delete">
            <el-button type="danger" plain size="mini" icon="el-icon-delete" @click="confirmDeleteUser(user)" />
          </el-col>
        </el-row>
      </el-card>
    </div>

    <!-- Dialogo que aparece cuando se va a eliminar un usuario -->

    <el-dialog
      title="Advertencia"
      :visible.sync="deleteDialogVisible"
      center
      :width="x.matches ? '80%' : '40%'"
    >
      <el-row>
        <el-col :xs="24">
          <center>
            <span>¿Realmente desea eliminar el usuario <b>{{ usuario }}</b>?</span>
          </center>
        </el-col>
      </el-row>
      <span slot="footer">
        <el-button @click="deleteDialogVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="borrarUsuario">Confirmar</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAllUsuarios, getListNicknames, deleteUsuario } from '@/api/unigrasas/usuarios'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      countActivos: 0,
      countTerminados: 0,
      countEliminados: 0,
      updateView: 'Todos',
      datosUsuarios: [],
      loading: true,
      deleteDialogVisible: false,
      idusuario: '',
      usuario: '',
      x: ''
    }
  },
  computed: {
    ...mapGetters(['name', 'roles'])
  },
  watch: {
    data: {
      deep: true,
      async handler(val) {
        if (val.action) {
          // console.log('val -> ', val)
          if (val.hasOwnProperty('idusuario')) {
            await this.getUsuarios()
            const user = await this.datosUsuarios.filter((user) => user.idusuario === val.idusuario)
            // console.log('user -> ', user)
            await this.$emit('handleSetUser', user[0])
          } else {
            this.getUsuarios()
            this.$emit('handleSetUser', { updateView: false })
          }
        }
      }
    }
  },
  async created() {
    await this.initView()
    this.x = window.matchMedia('(max-width: 800px)')
  },
  methods: {
    async getNicknames() {
      await getListNicknames().then((response) => {
        this.listUsers = response.users
        // console.log('NICkNAMES -> ', this.listUsers)
        const result = { data: response.nicknames }
        window.localStorage.setItem('usuarios', JSON.stringify(result))
      })
    },
    confirmDeleteUser(user) {
      // console.log(user.idusuario)
      this.idusuario = user.idusuario
      this.usuario = `${user.nombre} ${user.apellido}`
      this.deleteDialogVisible = true
    },
    async borrarUsuario() {
      const username = this.datosUsuarios.find((user) => user.idusuario === this.idusuario).nickname
      if (username === this.name) {
        this.deleteDialogVisible = false
        this.$notify({
          title: 'Advertencia',
          message: 'Acción no permitida!',
          type: 'warning',
          duration: 2000
        })
      } else {
        await deleteUsuario(this.idusuario).then(async(response) => {
          this.deleteDialogVisible = false
          this.$notify({
            title: 'Información',
            message: 'Se ha eliminado el usuario con éxito!',
            type: 'success',
            duration: 2000
          })
          await this.getUsuarios()
          this.$emit('handleSetUser', { updateView: false })
        }, (error) => {
          console.log(error)
          this.deleteDialogVisible = false
          this.$notify({
            title: 'Advertencia',
            message: 'El usuario tiene facturas asignadas',
            type: 'warning',
            duration: 2000
          })
        })
      }
    },
    async returnUser(user) {
      await this.$emit('handleSetUser', user)
    },
    initView() {
      this.getUsuarios()
    },
    async getUsuarios() {
      await getAllUsuarios().then((response) => {
        // console.log(response)
        this.datosUsuarios = response
        this.loading = false
        this.getNicknames()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// Pantallas superiores a 800px (PC)
@media screen and (min-width: 800px) {
  .data-user {
    padding-top: 3%; padding-left: 4%; border: 0px solid red;
  }

  .border-card {
    border-bottom: 1px solid #DCDFE6; padding-bottom: 3%;
  }

  .btn-user-success {
    padding-top: 5%; border: 0px solid red; text-align: center;
  }

  .btn-user-delete {
    padding-top: 5%; border: 0px solid red; text-align: center;
  }

  .div-list-user {
    padding-left: 5%; padding-right: 5%;
  }
}

// Pantallas inferiores a 800px (mobile)
@media screen and (max-width: 800px) {
  .data-user {
    text-align: center;
  }

  .btn-user-success {
    padding-top: 5%; text-align: right; padding-right: 2%;
  }

  .btn-user-delete {
    padding-top: 5%; text-align: left; padding-left: 2%;
  }
}
</style>
