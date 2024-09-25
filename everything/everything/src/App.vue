<template>
  <header class="bg-blue-500 text-white p-4 shadow-md">
    <nav class="flex justify-between items-center space-x-4">
      <h1 class="text-lg font-bold">메인</h1>
      <router-link to="/roulette" class="text-lg font-semibold cursor-pointer hover:text-yellow-300">
        룰렛
      </router-link>
      <router-link to="/ladder" class="text-lg font-semibold cursor-pointer hover:text-yellow-300">
        사다리타기
      </router-link>
      <h1 class="text-lg font-semibold">메뉴3</h1>
      <h1 class="text-lg font-semibold">메뉴4</h1>
      <h1 class="text-lg font-semibold">메뉴5</h1>
    </nav>
  </header>
  <RouterView/>
</template>

<script setup>
</script>

<style lang="scss" scoped>
</style>
