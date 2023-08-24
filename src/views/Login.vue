<template>
  <main class="h-screen w-full bg-center bg-no-repeat bg-cover" :style="{ backgroundImage: 'url(' + bgImage + ')' }">

    <div class="absolute flex flex-col gap-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10 rounded-md shadow-lg bg-gradient-to-tr from-green-700 via-green-800 to-green-800 border border-green-800 z-[200] backdrop-filter backdrop-blur-sm shadow drop-shadow-lg">
      <img  class="max-w-lg" src="@/assets/logo.png" alt="">
      <p class="text-gray-400 text-lg py-3">Login to Your Account</p>
      <form action="">
        <div class="mb-3">
          <span class="text-normal block font-medium text-gray-900 dark:text-gray-300 mb-2">Email</span>
          <input type="text" id="bank" class="input bg-green-600 border border-green-500 flex-none w-full" v-model="formData.email" >
        </div>
        <div class="mb-10">
          <span class="text-normal block font-medium text-gray-900 dark:text-gray-300 mb-2">Password</span>
          <input type="password" id="bank" class="input bg-green-600 border border-green-500 flex-none w-full" v-model="formData.password" >
        </div>
        <button
            type="button"
            @click.prevent="submitForm"
            class="play w-full items-center px-3 py-4 border border-transparent shadow-sm text-lg leading-4 font-medium rounded-md text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-grey-700">
          Login
        </button>
      </form>
      <p class="text-gray-300 text-sm">Don't have an account? <router-link class="text-blue-500" to="register">Create an account</router-link></p>
    </div>
  </main>
  <div class="bg-image bg-gradient-to-tr from-black via-green-800 to-black">
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import BaseInput from "@/components/ui/Base/BaseInput.vue";
import bgImg from '@/assets/login-bg.png'
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import { auth } from "@/api";
import {storeToken} from "@/lib/storage/auth/TokenStorage";

export default defineComponent({
  components: { BaseInput },
  setup() {
    const store = useStore()
    const router = useRouter()
    const bgImage = bgImg // Adjust the path
    const formData = ref({
      email: '',
      password: ''
    })

    const submitForm = async () => {
      const { status, data: { error, userId, token } } = await auth.login(formData.value)
      if (status === 200 && !error) storeToken(token)
      await store.dispatch('user/setUser', userId)
      await store.dispatch('user/authenticate')
      router.push({ name: 'home' })
    }

    return {
      bgImage,
      formData,
      submitForm
    }
  }
})
</script>
<style>
.bg-image {
  position: absolute;
  top: 0;
  left:0;
  /*background-color: #071c0f;*/
  opacity: 90%;
  z-index: 10;
  width: 100%;
  height: 100%;
  -webkit-box-shadow: inset 0px 0px 118px 16px rgba(0,0,0,0.74);
  -moz-box-shadow: inset 0px 0px 118px 16px rgba(0,0,0,0.74);
  box-shadow: inset 0px 0px 118px 16px rgba(0,0,0,0.74);
}
</style>