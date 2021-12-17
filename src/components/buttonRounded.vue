<template>  
    <div class="flex flex-col justify-center items-center mx-1">
      <button class="w-6 h-6 flex justify-center items-center rounded-full bg-base_gray_dark hover:bg-green-800">{{this.buttonName}}</button>
      <span class="text-xs text-black">{{this.buttonLabel}}</span>
    </div>        
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: ["buttonName", "buttonLabel"]
}
</script>