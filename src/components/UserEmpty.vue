<template>
    <div class="w-full shadow-2xl sm:rounded-lg mt-7 bg-gray-900">
        <p class="px-8 py-8 text-white">
           <slot></slot>
        </p>
    </div>   
</template>

<script>

export default {
  name: 'UserEmpty',
}
</script>