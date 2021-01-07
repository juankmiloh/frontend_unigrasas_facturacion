<template>
  <div class="createPost-container" style="background: #f7fbff;">
    <sticky class-name="sub-navbar">
      <div style="border: 0px solid red">
        <span />
      </div>
    </sticky>

    <div class="app-container">
      <div>
        <el-row :gutter="20">

          <el-col :span="10" :xs="24">
            <lista-users :data="viewRefresh" @handleSetUser="handleSetUser" />
          </el-col>

          <el-col :span="14" :xs="24">
            <el-card>
              <div slot="header" class="clearfix">
                <span>Crear usuario</span>
              </div>
              <!-- Formulario donde se cargan los datos del usuario -->
              <el-form
                ref="formUsuario"
                :rules="rulesFormUser"
                :model="formUsuario"
                label-width="120px"
                :inline="false"
                class="form-user"
              >
                <div class="demo-basic--circle" style="text-align: center; padding-bottom: 2%;">
                  <div class="block" style="padding-bottom: 1%;"><el-avatar :size="120" :src="imageUrl" /></div>
                  <label class="file-upload">
                    <input type="file" @change="previewFiles">
                    <span style="font-size: small; color: gray;">Cambiar foto</span>
                  </label>
                </div>

                <el-row :gutter="10" style="border: 0px solid red; padding-left: 15%; padding-right: 15%;">
                  <el-col :span="24" :xs="24" style="border: 0px solid red; text-align: center;">
                    <el-form-item label="" prop="genero" class="item-genero">
                      <el-radio-group v-model="formUsuario.genero">
                        <el-radio-button
                          v-for="item in dataGenero"
                          :key="item.idgenero"
                          :label="item.nombre"
                        />
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :xs="24" style="border: 0px solid red;">
                    <el-form-item label="" prop="nombre">
                      <el-input
                        v-model="formUsuario.nombre"
                        autocomplete="off"
                        placeholder="Nombre"
                        clearable
                        class="control-modal"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :xs="24" style="border: 0px solid red;">
                    <el-form-item label="" prop="apellido">
                      <el-input
                        v-model="formUsuario.apellido"
                        autocomplete="off"
                        placeholder="Apellido"
                        clearable
                        class="control-modal"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :xs="24" style="border: 0px solid red;">
                    <el-form-item label="" prop="nickname">
                      <el-input
                        v-model="formUsuario.nickname"
                        autocomplete="off"
                        placeholder="Usuario"
                        clearable
                        class="control-modal"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :xs="24" style="border: 0px solid red;">
                    <el-form-item label="" prop="contrasena">
                      <el-input
                        v-model="formUsuario.contrasena"
                        type="password"
                        autocomplete="off"
                        placeholder="Contraseña"
                        clearable
                        class="control-modal"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24" :xs="24" style="border: 0px solid red;">
                    <el-form-item label="" prop="rol">
                      <el-select v-model="formUsuario.rol" placeholder="Tipo de usuario" class="control-modal">
                        <el-option
                          v-for="item in dataRoles"
                          :key="item.idrol"
                          :label="item.nombre"
                          :value="item.idrol"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24" :xs="24" style="border: 0px solid red;">
                    <el-form-item label="" prop="descripcion">
                      <el-input
                        v-model="formUsuario.descripcion"
                        type="textarea"
                        class="control-modal"
                        rows="3"
                        placeholder="Descripción"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :xs="24" style="border: 0px solid red; text-align: right;">
                    <el-form-item>
                      <el-button
                        style="width: 10em"
                        type="success"
                        @click="submitForm('formUsuario')"
                      >{{ textButton }}</el-button>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :xs="24" style="border: 0px solid red; text-align: left;">
                    <el-form-item>
                      <el-button style="width: 10em" @click="resetForm('formUsuario')">Limpiar</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { mapGetters } from 'vuex'
import { getListRol, createUser, updateUsuario } from '@/api/unigrasas/usuarios'
import Sticky from '@/components/Sticky' // 粘性header组件
import { CONSTANTS } from '@/constants/constants'
import { DATA } from '@/data/ImgUser'
import md5 from 'md5'
import ListaUsers from './components/user/ListaUsers'

export default {
  name: 'CreateUser',
  components: {
    Sticky,
    ListaUsers
  },
  data() {
    return {
      formUsuario: CONSTANTS.formUser,
      rulesFormUser: CONSTANTS.rulesFormUser,
      loading: false,
      dataRoles: [],
      imageUrl: DATA.imageURL,
      dataGenero: CONSTANTS.dataGenero,
      viewRefresh: { action: false },
      textButton: 'Guardar',
      updateUSer: false
    }
  },
  computed: {
    ...mapGetters(['name', 'roles'])
  },
  created() {
    this.initView()
  },
  methods: {
    handleSetUser(param) {
      // console.log('handleSetUser -> ', param)
      if (param.hasOwnProperty('updateView')) {
        this.rulesFormUser.contrasena[0].required = true
        this.updateUSer = false
        this.textButton = 'Guardar'
        this.viewRefresh.action = param.updateView
        this.$refs['formUsuario'].resetFields()
        this.formUsuario.avatar = DATA.imageURL
        this.imageUrl = DATA.imageURL
      } else {
        this.rulesFormUser.contrasena[0].required = false
        this.updateUSer = true
        this.textButton = 'Actualizar'
        this.formUsuario = param
        this.imageUrl = param.avatar
        window.localStorage.setItem('userUpdate', param.nickname)
      }
    },
    async previewFiles(event) {
      const file = event.target.files[0]
      if (file) {
        // console.log('file -> ', file)
        this.imageUrl = await this.imgToBase64(file)
        this.formUsuario.avatar = this.imageUrl
        // console.log(this.imageUrl)
      }
    },
    imgToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    },
    validateUsername(rule, value, callback) {
      const usernameLower = value.toLowerCase()
      if (validUsername(usernameLower)) {
        if (this.updateUSer) {
          if (usernameLower === window.localStorage.getItem('userUpdate')) {
            callback()
          } else {
            callback(new Error('Nombre de usuario ya esta en uso'))
          }
        } else {
          callback(new Error('Nombre de usuario ya esta en uso'))
        }
      } else if (this.formUsuario.nickname === '') {
        callback(new Error('Ingrese nombre de usuario'))
      } else {
        callback()
      }
    },
    validatePassword(rule, value, callback) {
      if (!this.updateUSer) { // Si no actualiza usuario
        if (value.length < 6) {
          callback(
            new Error('No puede ser menor a seis caracteres')
          )
        } else {
          callback()
        }
      } else { // Si se actualiza usuario
        if (this.formUsuario.contrasena !== '') {
          this.rulesFormUser.contrasena[0].required = true
          if (value.length < 6) {
            callback(
              new Error('No puede ser menor a seis caracteres')
            )
          } else {
            callback()
          }
        } else {
          this.rulesFormUser.contrasena[0].required = false
          callback()
        }
      }
    },
    async initView() {
      this.getDataRoles()
      this.formUsuario.avatar = DATA.imageURL
      this.rulesFormUser.nickname = [
        { required: true, trigger: 'blur', validator: this.validateUsername }
      ]
      this.rulesFormUser.contrasena = [
        { required: true, trigger: 'blur', validator: this.validatePassword }
      ]
    },
    async getDataRoles() {
      await getListRol().then((response) => {
        // console.log(response)
        this.dataRoles = response
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (!this.updateUSer) { // Si no actualiza usuario
          if (valid) {
            const modelUser = this.formUsuario
            modelUser.token = `${modelUser.nickname}-token`
            modelUser.rol = Number(modelUser.rol)
            // modelUser.contrasena = md5(modelUser.contrasena)
            modelUser.genero = this.dataGenero.find((genero) => genero.nombre === modelUser.genero).idgenero
            // console.log('Guardar modelUser -> ', modelUser)
            await createUser(modelUser).then(async(response) => {
              this.$notify({
                title: 'Bien hecho!',
                message: 'Usuario creado con éxito',
                position: 'top-right',
                type: 'success',
                duration: 2000
              })
              this.$refs[formName].resetFields()
              this.imageUrl = DATA.imageURL
              this.viewRefresh = { action: true }
            })
            // this.$refs[formName].resetFields()
            // this.imageUrl = DATA.imageURL
            // this.viewRefresh = { action: true }
          } else {
            // console.log('error submit!!')
            return false
          }
        } else { // Si se actualiza usuario
          const modelUser = this.formUsuario
          modelUser.token = `${modelUser.nickname}-token`
          modelUser.genero = this.dataGenero.find((genero) => genero.nombre === modelUser.genero).idgenero
          if (modelUser.contrasena !== '') {
            modelUser.contrasena = md5(modelUser.contrasena)
          }
          // console.log('actualizar modelUser -> ', modelUser)
          await updateUsuario(modelUser).then(async(response) => {
            this.$notify({
              title: 'Bien hecho!',
              message: 'Usuario actualizado con éxito',
              position: 'top-right',
              type: 'success',
              duration: 2000
            })
            this.$refs[formName].resetFields()
            this.viewRefresh = { idusuario: modelUser.idusuario, action: true }
          })
          // this.formUsuario = CONSTANTS.formUser
          // this.$refs[formName].resetFields()
          // this.imageUrl = DATA.imageURL
          // this.viewRefresh = { idusuario: modelUser.idusuario, action: true }
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.formUsuario = CONSTANTS.formUser
      this.formUsuario.avatar = DATA.imageURL
      this.imageUrl = DATA.imageURL
      this.viewRefresh = { action: true }
    }
  }
}
</script>

<style lang="scss" scoped>
.control-modal {
  width: 100%;
}
</style>

<style>
.file-upload {
  cursor: pointer;
  border: 0px solid gray;
  border-radius: 3px;
  padding: 3px;
}

.file-upload input {
  overflow: hidden;
  width: 0;
}
.form-user .el-form-item .el-form-item__content {
  margin-left: 0% !important;
}
.item-genero .el-form-item__error {
  padding-left: 12.5vw;
}
</style>

