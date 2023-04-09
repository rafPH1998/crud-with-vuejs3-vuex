<template>
    <div
      class="mt-5 w-5/6 p-4 mb-4 text-sm
      text-green-700 rounded-md
      bg-green-100 dark:bg-green-200 
      dark:text-green-800" role="alert">
      <span class="font-medium">Sucesso!</span> <slot></slot>
    </div>
</template>

<script>

export default {
  name: 'AlertSuccess',
}
</script>