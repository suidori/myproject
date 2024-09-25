<template>
  <div class="flex justify-center items-center min-h-[40vw]">
    <div id="container" class="flex bg-green-200 justify-center">
      <div v-show="isVisible" id="choose" class="flex flex-col items-center">
        <div>몇 개?</div>
        <input
          type="number"
          min="2"
          max="10"
          v-model="number"
          class="border border-gray-300 w-[5vw]"
          ref="inputField"
        />
        <button @click="setLadder">✔️</button>
      </div>
      <div class="flex flex-col">
        <div id="ladder-container" class="flex">
          <div v-for="items in numbers" :key="items" class="flex flex-col p-[1vw] items-center">
            <text>{{ items }}</text>
            <input type="text" class="border border-gray-300 w-[5vw]" />
            <div class="w-[0.1vw] h-[5vw] bg-black mt-[0.5vw]"></div>
            <input type="text" class="border border-gray-300 mt-[0.5vw] w-[5vw]" />
          </div>
        </div>
        <div v-show="showButton" class="flex justify-center">
          <button
          @click="goSelect"
            class="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300 mx-2"
          >
            돌아가기
          </button>
          <button
            class="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300 mx-2"
          >
            결정
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showButton = ref(false)
const isVisible = ref(true)
const numbers = ref(0)
const number = ref(2)
const inputField = ref(null)

const setLadder = () => {
  if (number.value > 1) {
    numbers.value = number.value
    isVisible.value = false
    showButton.value = true
  }
}

const goSelect = () => {
  numbers.value = 0
  isVisible.value = true
  showButton.value = false
  number.value = 2
}
</script>

<style lang="scss" scoped></style>
