<template>
  <div class="Home">
    <SvgIcon name="home" class="SVG"></SvgIcon>
    <span>Home</span>
    <el-button type="primary">Primary</el-button>
    <van-button type="primary">主要按钮</van-button>
  </div>
</template>
<script lang="ts" setup>
import SvgIcon from "@/components/SvgIcon.vue";
import { useStore } from "@/store/user";
import {getToken} from '@/api/index' 
const user = useStore();
user.setUser({
  userId: "001",
  userName: "张三",
  phone: "15678349878",
});
console.log("user", user);
const getData = async ()=>{
  const res = await getToken({})
  console.log(res);
  

}
getData()
</script>
<style lang="scss">
.Home {
  height: 400px;
  width: 375px;
}
</style>
