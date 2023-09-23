<template>
    <div class="w-[300px]">
      <h2 class="mb-10">Logowanie</h2>
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
          <p @click="changePasswordType()" class="absolute right-[18px] top-[6px] cursor-pointer">
            <Icon class="icon" v-if="currentType == 'password'" name="ph:eye" size="23" />
            <Icon class="icon" v-else name="ph:eye-slash" size="23" />
          </p>
        </div>
        <button id="submit" type="submit" class="w-full mt-[21px]">
          <ButtonsLoading title="Zaloguj się" :loading="isLoading" />
        </button>
      </Form>
      <div class="relative flex justify-end pt-1">
        <p class="font-base text-[14px] text-open" @click="$emit('componentForgot')">Nie pamiętam hasła</p>
      </div>
      <div v-if="errorLogin" class="relative">
        <p class="text-[14px] red cursor-default  absolute"><Icon name="ph:warning-circle-light" size="18" color="#f23648" class="mt-[-3px]"/> {{ errorLogin }}</p>
      </div>
      <AuthIcon />
      <div class="flex gap-[6px] justify-center mt-6">
        <p class="font-base text-[14px] cursor-default">Nie masz konta?</p>
        <p class="font-medium text-[14px] text-open" @click="$emit('componentRegister1')">Zarejestruj się</p>
      </div>
    </div>
  </template>
  <script setup lang="ts">
  import * as Yup from "yup";
  import { Form } from "vee-validate";
  const emit = defineEmits(["close", "componentRegiser1", "componentForgot"]);
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
      if (!error) {
        // closeModal()
        emit('close')
      }
    }, 50);
  };
  
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    window.location.reload();
  };
  </script>
  <style lang="scss" scoped>
  @import "@/assets/style/variables.scss";
  .icon {
    color: $icon;
  }
  .icon:hover{
    color: $text-gray;
  }
  </style>