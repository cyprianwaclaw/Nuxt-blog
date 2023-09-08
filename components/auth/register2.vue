<template>
    <div class="w-[300px]">
      <h2 class="mb-10">Zarejestruj się2</h2>
      <Form @submit="login" :validation-schema="schema">
        <InputBase name="name" label="Imię" id="mail" type="text" />
        <InputBase name="mail" label="E-mail" id="mail" type="text" />
        <InputBase name="mail_confirmation" label="Powtórz e-mail" id="mail" type="text" />
        <!-- <div class="grid grid-cols-2 item-center mt-7">
          <div class="return place-items-center gap-[6px]" @click="$emit('componentLogin')">
            <Icon name="ph-arrow-left" size="20" class="icon" />
            <p class="text-[16px]">Logowanie</p>
          </div>
          <button id="submit" type="submit" class="w-full">
            <button class="button-primary">Dalej</button>
          </button>
        </div> -->
      </Form>
      <div class="grid grid-cols-2 item-center mt-7">
        <div class="return place-items-center gap-[6px]" @click="$emit('componentRegister1')">
          <Icon name="ph-arrow-left" size="20" class="icon" />
          <p class="text-[16px]">Wróć</p>
        </div>
        <div class="w-full"  @click="$emit('componentRegister3')">
          <button class="button-primary">Dalej</button>
        </div>
      </div>
    </div>
  </template>
  <script setup lang="ts">
  import * as Yup from "yup";
  import { Form } from "vee-validate";
  const emit = defineEmits(["componentRegister3", "componentRegister2"]);
  const supabase = useSupabaseClient();
  const errorLogin = ref<any>(null);
  const currentType = ref("password");
  const isLoading = ref(false);
  
  
  const schema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]*$/, "Imię nie może zawiarać cyfr")
      .max(20, "Imię nie może być dłuższe niż 20 znaków"),
  });
  
  // const user = useSupabaseUser();
  
  const login = async (values: any) => {
    emit('componentRegister2')
    // isLoading.value = true;
    // setTimeout(async () => {
    //   let { error } = await supabase.auth.signInWithPassword({
    //     email: values.mail,
    //     password: values.password,
    //   });
    //   isLoading.value = false;
    // }, 50);
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