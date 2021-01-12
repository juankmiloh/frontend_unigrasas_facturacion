<template>
  <div class="dashboard-abogado-container">
    <el-row>
      <el-col :span="3" :xs="24" style="border: 0px solid red; text-align: center;">
        <pan-thumb :image="avatar">
          Usuario
          <span class="pan-info-roles">{{ name }}</span>
        </pan-thumb>
      </el-col>
      <el-col :span="21" :xs="24" class="info-container" style="border: 0px solid red;">
        <span class="display_name">{{ usuario }}</span>
        <span style="font-size:20px;padding-top:20px;display:inline-block;">{{ privilegio | uppercaseFirst }}</span>
      </el-col>
      <el-col class="info-container-xs">
        <el-row style="text-align: center; padding-top: 7%; padding-bottom: 10%;">
          <el-col :span="24" style="font-size: xx-large;"><span><b>{{ usuario }}</b></span></el-col>
          <el-col :span="24" style=""><span>{{ privilegio | uppercaseFirst }}</span></el-col>
        </el-row>
      </el-col>
    </el-row>
    <div>
      <img :src="emptyGif" class="emptyGif">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'

export default {
  name: 'DashboardAbogado',
  components: { PanThumb },
  data() {
    return {
      emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles',
      'usuario',
      'privilegio'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard-abogado-container {
  background-color: #e3e3e3;
  min-height: 89vh;
  padding: 50px 60px 0px;
  .pan-info-roles {
    font-size: 12px;
    font-weight: 700;
    color: #333;
    display: block;
  }
  .info-container {
    position: relative;
    padding-left: 40px;
    height: 150px;
    line-height: 200px;
    .display_name {
      font-size: 48px;
      line-height: 48px;
      color: #212121;
      position: absolute;
      top: 25px;
    }
  }
}

// Pantallas superiores a 800px (PC)
@media screen and (min-width: 800px) {
  .info-container-xs {
    display: none;
  }

  .emptyGif {
    display: block;
    width: 45%;
    margin: 0 auto;
  }
}

// Pantallas inferiores a 800px (mobile)
@media screen and (max-width: 800px) {
  .info-container {
    display: none;
  }

  .emptyGif {
    display: block;
    width: 100%;
    margin: 0 auto;
  }
}
</style>
