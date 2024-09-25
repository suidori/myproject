<template>
  <div id="roulette-container" class="flex mt-[4vw]">
    <div id="roulette" class="w-1/2 flex justify-end items-center relative h-[38vw]">
      <div
        id="choose"
        class="w-0 h-0 border-l-[0.5vw] border-l-transparent border-r-[0.5vw] border-r-transparent border-t-[4vw] border-t-red-500 absolute"
        style="right: 14.5vw; top: 0vw"
      ></div>
      <div id="result" class="text-[7vw] font-bold text-center text-gray-800 mr-[3vw]">{{ result }}</div>
      <div id="app">
        <svg width="30vw" height="30vw" viewBox="-100 -100 200 200">
          <path
            v-for="(color, index) in fanPaths"
            :key="index"
            :d="color.path"
            :fill="color.color"
            :style="{ transform: `rotate(${rotation}deg)`, transition: 'transform 0.016s' }"
          />
          <text
            v-for="(item, index) in arr"
            :key="index"
            :x="calculateTextPosition(index).x"
            :y="calculateTextPosition(index).y"
            text-anchor="middle"
            alignment-baseline="middle"
            fill="black"
            stroke="white"
            stroke-width="0.5"
            font-size="13"
            :style="{ transform: `rotate(${rotation}deg)`, transition: 'transform 0.016s' }"
          >
            {{ item.body }}
          </text>
        </svg>
      </div>
      <button
        @click="startRotation"
        class="absolute bg-blue-500 w-[7vw] h-[2vw] rounded-lg hover:ring-2 text-[1vw]"
        style="bottom: 1vw; right: 11.5vw; font-weight: bold; cursor: pointer"
      >
        돌리기!
      </button>
    </div>
    <div id="slices" class="w-1/2 flex flex-col items-center">
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
import { nextTick, ref, computed, onUnmounted } from 'vue'

const colors = ['#FF5733', '#33FF57', '#3357FF', '#FFD700', '#FF69B4', '#00BFFF']
const segments = ref(0)
const arr = ref([])
const body = ref('')
const inputField = ref(null)
var idx = 0
const rotation = ref(0)
const isAnimating = ref(false)
let speed = 0.1
let interval
let stop = false
let running = false;
const result = ref('');

const determineResult = () => {
  let normalizedRotation = (rotation.value+90) % 360; 
  if (normalizedRotation < 0) {
    normalizedRotation += 360; 
  }
    const sectorAngle = 360 / segments.value; 
    const selectedSegment = (segments.value - 1) - Math.floor(normalizedRotation / sectorAngle); // 역순 선택
    console.log(`선택된 섹터는: ${arr.value[selectedSegment].body}`);
    result.value = arr.value[selectedSegment].body;
};


const fanPaths = computed(() => {
  const paths = []
  for (let i = 0; i < segments.value; i++) {
    paths.push({
      path: getFanPath(i, segments.value),
      color: colors[i % colors.length],
      body: body.value
    })
  }
  return paths
})

function getFanPath(index, totalSegments) {
  const angle = 360 / totalSegments
  const startAngle = index * angle
  const endAngle = startAngle + angle
  const largeArcFlag = angle > 180 ? 1 : 0

  const startX = Math.cos((startAngle * Math.PI) / 180) * 100
  const startY = Math.sin((startAngle * Math.PI) / 180) * 100
  const endX = Math.cos((endAngle * Math.PI) / 180) * 100
  const endY = Math.sin((endAngle * Math.PI) / 180) * 100

  return `M 0 0 L ${startX} ${startY} A 100 100 0 ${largeArcFlag} 1 ${endX} ${endY} Z`
}

const calculateTextPosition = (index) => {
  const angle = 360 / segments.value
  const middleAngle = (index + 0.5) * angle
  const x = Math.cos((middleAngle * Math.PI) / 180) * 50
  const y = Math.sin((middleAngle * Math.PI) / 180) * 50
  return { x, y }
}

const putSlice = () => {
  if ((body.value.trim().length > 0) & (running == false)) {
    const data = {
      idx: idx + 1,
      body: body.value
    }
    idx++
    arr.value.push(data)
    body.value = ''
    segments.value += 1
    rotation.value = 0
  }
  nextTick(() => {
    inputField.value.focus()
  })
}

const deleteSlice = (index) => {
  if (running == false) {
    arr.value = arr.value.filter((item) => item.idx !== index)
    segments.value -= 1

    arr.value.forEach((item, newIndex) => {
      item.idx = newIndex + 1
      idx = item.idx
    })

    if (arr.value.length == 0) {
      idx = 0
      segments.value = 0
    }
  }
}

const startRotation = () => {
  if (isAnimating.value) return
  if(segments.value==0) return

  isAnimating.value = true
  speed = 0.1 // 초기 속도
  running = true;

  interval = setInterval(() => {
    rotation.value += speed // 회전 각도 증가

    // 속도 조절
    if (!stop) {
      speed += 0.05
    } else {
      speed -= 0.03
    }

    if (speed >= 15) {
      const randomDelay = Math.floor(Math.random() * 2000) + 1000
      setTimeout(() => {
        stop = true
      }, randomDelay)
    }

    // 속도가 0 이하가 되면 애니메이션 종료
    if (speed <= 0) {
      speed = 0 // 속도가 0으로 고정
      clearInterval(interval)
      isAnimating.value = false
      stop = false
      running = false;
      determineResult(); // 결과 도출
    }
  }, 16) // 약 60fps
}

// 컴포넌트가 언마운트될 때 인터벌을 클리어
onUnmounted(() => {
  clearInterval(interval)
})

</script>

<style lang="scss" scoped></style>
