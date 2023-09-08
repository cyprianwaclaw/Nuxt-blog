<template>
    <div class="w-[300px]">
      <!-- <div class="return place-items-center  gap-[6px] " @click="$emit('componentLogin')">
        <Icon name="ph-arrow-left" size="20" class="icon" />
        <p class="text-[16px]">Logowanie</p>
      </div> -->
      <h2>Przypomnij hasło</h2>
      <Form @submit="login" :validation-schema="schema" @click="click()">
        <!-- {{ user }} -->
        <InputBase name="mail" label="E-mail" id="mail" type="text" />
        <div class="relative">
          <InputBase
            class="mt-5"
            name="password"
            label="Hasło"
            id="password"
            :type="currentType"
          />
          <p @click="changePasswordType()" class="absolute right-[21px] top-[9px]">
            <Icon class="icon" v-if="currentType == 'password'" name="ph:eye" size="23" />
            <Icon class="icon" v-else name="ph:eye-slash" size="23" />
          </p>
        </div>
        <div class="grid grid-cols-2 item-center mt-7">
          <div class="return place-items-center gap-[6px]" @click="$emit('componentLogin')">
            <Icon name="ph-arrow-left" size="20" class="icon" />
            <p class="text-[16px]">Logowanie</p>
          </div>
          <button id="submit" type="submit" class="w-full">
            <button class="button-primary">Dalej</button>
          </button>
        </div>
        <!-- <button id="submit" type="submit" class="w-full mt-[21px]">
          <ButtonsLoading title="Zaloguj się" :loading="isLoading" />
        </button> -->
      </Form>
      <div v-if="errorLogin">
        <p class="red">{{ errorLogin }}</p>
      </div>
      <AuthLoginIcon />
      <!-- <p @click="logout()">logout</p> -->
    </div>
  </template>
  <script setup lang="ts">
  import * as Yup from "yup";
  import { Form } from "vee-validate";
  const emit = defineEmits(["componentLogin"]);
  const supabase = useSupabaseClient();
  const errorLogin = ref<any>(null);
  const currentType = ref("password");
  const isLoading = ref(false);
  
  const click = () => {
    errorLogin.value = null;
  };
  
  const changePasswordType = () => {
    if (currentType.value == "password") {
      currentType.value = "text";
      return "password";
    } else if (currentType.value == "text") {
      currentType.value = "password";
    }
  };
  
  const schema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]*$/, "Imię nie może zawiarać cyfr")
      .max(20, "Imię nie może być dłuższe niż 20 znaków"),
  });
  
  // const user = useSupabaseUser();
  
  const login = async (values: any) => {
    console.log(values);
    isLoading.value = true;
    setTimeout(async () => {
      let { error } = await supabase.auth.signInWithPassword({
        email: values.mail,
        password: values.password,
      });
  
      if (error) {
        errorLogin.value = "Błędny login lub hasło, spróbuj ponownie";
      }
      isLoading.value = false;
    }, 50);
  };
  
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    window.location.reload();
  };
  </script>
  <style lang="scss" scoped>
  @import "@/assets/style/variables.scss";
  
  .return {
    display: flex;
    color: $text-black;
    cursor: pointer;
  }
  
  .icon {
    fill: $text-black;
  }
  
  .return:hover {
    color: rgb(88, 88, 88);
  }
  .return:hover .icon {
    fill: rgb(88, 88, 88);
  }
  </style>