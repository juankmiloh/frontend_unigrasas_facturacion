<template>
  <el-card style="margin-bottom: 20px;">
    <div slot="header" class="clearfix">
      <span>Usuarios</span>
    </div>

    <div v-loading="loading" style="padding-left: 5%; padding-right: 5%;">
      <el-card v-for="user in datosUsuarios" :key="user.idusuario" style="margin-bottom: 3%;">
        <el-row style="border-bottom: 1px solid #DCDFE6; padding-bottom: 3%;">
          <el-col :span="6" :xs="24" style="border: 0px solid red; text-align: center;">
            <el-avatar :size="60">
              <img
                :src="user.avatar"
              >
            </el-avatar>
          </el-col>
          <el-col :span="12" :xs="24" style="padding-top: 3%; padding-left: 4%; border: 0px solid red;">
            <span style="color: #303133;"><b>{{ user.nombre + ' ' + user.apellido }}</b></span><br>
            <span style="font-size: small; color: #909399;"><b>{{ user.privilegio }}</b></span>
          </el-col>
          <el-col :span="3" :xs="24" style="padding-top: 5%; border: 0px solid red; text-align: center;">
            <el-button type="danger" plain size="mini" icon="el-icon-delete" @click="confirmDeleteUser(user)" />
          </el-col>
          <el-col :span="3" :xs="24" style="padding-top: 5%; border: 0px solid red; text-align: center;">
            <el-button style="border: 1px solid #67C23A;" type="success" plain size="mini" icon="el-icon-top-right" @click="returnUser(user)" />
          </el-col>
        </el-row>
      </el-card>
    </div>

    <!-- Dialogo que aparece cuando se va a eliminar un usuario -->

    <el-dialog
      title="Advertencia"
      :visible.sync="deleteDialogVisible"
      width="40%"
      center
      custom-class="dialog-class-lista"
    >
      <br>
      <center>
        <span>¿Realmente desea eliminar el usuario <b>{{ usuario }}</b>?</span>
      </center>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">Cancelar</el-button>
        <el-button
          type="primary"
          @click="borrarUsuario"
        >Confirmar</el-button>
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
      usuario: ''
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

<style>
.dialog-class-lista {
  border-radius: 10px;
}

.dialog-class-lista .el-dialog__body {
  padding-top: 0 !important;
}
</style>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
