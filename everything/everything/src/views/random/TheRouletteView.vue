<template>
  <div id="roulette-container" class="flex mt-[4vw]">
    <div id="roulette" class="bg-green-300 w-1/2 flex justify-end items-center relative h-[38vw]">
      <div
        id="choose"
        class="w-0 h-0 border-l-[0.5vw] border-l-transparent border-r-[0.5vw] border-r-transparent border-t-[4vw] border-t-red-500 absolute"
        style="right: 14.5vw; top: 0vw"
      ></div>
      <div id="circle" class="w-[30vw] h-[30vw] bg-blue-500 rounded-full ml-auto"></div>
    </div>
    <div id="slices" class="bg-yellow-300 w-1/2 flex flex-col items-center">
      <div
        id="newInput"
        class="flex items-center rounded-lg hover:ring-2 hover:ring-blue-500 mt-[6vw] mb-[1vw]"
      >
        <div class="bg-blue-500 text-white rounded-l-lg py-2 px-4 w-[2vw]">&nbsp;</div>
        <input
          type="text"
          v-model="body"
          class="bg-white py-2 px-4 w-[17vw] focus:outline-none"
          ref="inputField"
          placeholder="텍스트를 입력하세요"
        />
        <div
          class="bg-blue-500 text-white rounded-r-lg py-2 px-4 hover:bg-blue-600 cursor-pointer"
          @click="putSlice"
        >
          ✔️
        </div>
      </div>
      <div v-for="item in arr" :key="item.idx">
        <div id="items" class="flex items-center rounded-lg hover:ring-2 hover:ring-blue-500">
          <div class="bg-blue-500 text-white rounded-l-lg py-2 px-4 w-[2vw]">{{ item.idx }}</div>
          <div class="bg-white py-2 px-4 w-[17vw]">{{ item.body }}</div>
          <div
            class="bg-blue-500 text-white rounded-r-lg py-2 px-4 hover:bg-blue-600 cursor-pointer"
            @click="deleteSlice(item.idx)"
          >
            ✖
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue';

const arr = ref([])
const body = ref('')
const inputField = ref(null)
var idx = 0

const putSlice = () => {
  if (body.value.trim().length > 0) {
    const data = {
      idx: idx + 1,
      body: body.value
    }
    idx++
    arr.value.push(data)
    body.value = ''
  }
  nextTick(() => {
    inputField.value.focus()
  })
}

const deleteSlice = (index) => {
  arr.value = arr.value.filter((item) => item.idx !== index)

  arr.value.forEach((item, newIndex) => {
    item.idx = newIndex + 1
    idx = item.idx
  })

  if (arr.value.length == 0) {
    idx = 0
  }
}
</script>

<style lang="scss" scoped></style>
