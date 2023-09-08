<template>
    <div
    class="base-input"
     :class="{ 'has-error': !!errorMessage, success: meta.valid }"
   >
    <div class="base-input label">
      <label :for="name">
      <input
        class="base-input"
        :name="name"
        :ErrorLogin="hasError"
        :hasError="hasError"
        :type="type"
        :value="inputValue"
        :placeholder="placeholder"
        @input="handleChange"
        @blur="handleBlur"
        required
      />
      <span class="text">{{ label }}</span>
  </label>
      <div class="help-message" v-if="errorMessage || meta.valid">
        <!-- <p class="red"> -->
          {{ errorMessage || successMessage }}
        <!-- </p> -->
      </div>
    </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { toRef } from "vue";
  import { useField } from "vee-validate";

type Input ={
    type?: any,
    value?: any,
    name: string,
    label?: string,
    successMessage?: string,
    hasError?: boolean,
    errorMessage?: string,
    placeholder?: any,
  }
  const props = defineProps<Input>()

 const detectAutofill = (element:any) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(window.getComputedStyle(element, null).getPropertyValue('appearance') === 'menulist-button')
    }, 600)
  })
}

  let ErrorLogin: any = props.hasError;
  
  const name = toRef(props, "name");
  const { value: inputValue, errorMessage, handleBlur, handleChange, meta } = useField(
    name,
    undefined,
    {
      initialValue: props.value,
    }
  );
//   </script><style scoped lang="scss">
@import "@/assets/style/variables.scss";

$primary: #0077FF;
$dark: #000;
  .success input {
    border: 2px solid $input-border;
    color:#212427;
    background: white;
    // transition: border-color 0.2s ease-in-out, color 0.2s ease-in-out, background-color 0.2s ease-in-out;
  }
  
  input {
    display: flex;
    border: 2px solid $input-border;
    font-size: 16px;
    width: 100%;
    height: 44px;
    overflow: hidden;
    border-radius: 10px;
  padding: 8px 14px;
  //padding-bottom: 10px;
  margin-top: 9px;
  font-weight: 400;
  }
  .help-message {
    position: absolute;
    margin-top: -3px;
    margin-bottom: 8px;
    font-size: 12px;
    width: 100vh;
  }
  
  label{
    margin-bottom:15px;
    position:relative;
  }
  .text{
    position:absolute;
    font-size:15px;
    top:10px;
    left:8px;
    padding: 0px 8px 0px 8px;
    font-size:15px;
    color: $input-border;
    transition: 0.3s ease;
    
  }
  input:focus + .text,
  input:active + .text,
  input:valid + .text,
  input:-internal-autofill-selected + .text{
    color: $primary !important;
    background-color: white;
    transform: translate(5px, -20px) scale(0.90);
  }
  input:focus,
  input:active,
  input:valid,
  input:-internal-autofill-selected{
    border: 2px solid $primary;
    outline: 1px solid #0033dd;    
    
  }
  
  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active{
    border: 2px solid $primary;
  //  border: 2px solid $input-border;
    color: $input-border;
    -webkit-box-shadow: 0 0 0 30px white inset !important;
}
  </style>