<template>
    <br>
    <div class="p6 max-w-sm mx-auto items-center">
        <h1 class="text-orange-700 hover:text-zinc-800 text-2xl text-center">
            Mi Primer App {{ msg }}
        </h1>
    </div>

    <div v-for="device in devices">
        <div v-if="device.hostname">
            <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 justify-between">
                <div class="flex-shrink-0">
                    <img class="h-12 w-12" :src="iot_urlIcons[device['iotType']]" alt="IoT Device Logo">
                </div>
                <div class="flex-grow text-ellipsis whitespace-nowrap overflow-hidden">
                    <div class="text-xl font-medium text-black truncate"> {{ device["hostname"] }}</div>
                    <p class="text-gray-500">{{ device.timeLeft + " seg" }}</p>
                </div>

                <div class="flex-shrink-0">
                    <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" class="sr-only peer" v-model="device.ss">                        
                        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
                    </label>
                </div>

            </div>
            <br>
        </div>                
    </div>
</template>

<script setup>
import axios from 'axios';
import io from 'socket.io-client';
import { ref, onMounted } from 'vue'

const props = defineProps({
    msg: String,
})

const devices = ref([]);
const iot_urlIcons = ref({
    "ball_water_valve": new URL("../assets/img/valve.svg", import.meta.url).href,
    "legacy_light": new URL("../assets/img/bulb-eco.svg", import.meta.url).href,
    "water_level_sensor": new URL("../assets/img/levelsensor.svg", import.meta.url).href,
    "water_pump": new URL("../assets/img/waterpump.svg", import.meta.url).href,
});
const switch_state = ref({
    0: 'checked',
    1: ''
})

async function fetchItems() {

    try {
        const response = await axios.get('http://192.168.11.192:3000/api/devices');
        devices.value = response.data;
        console.log("fi")
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

function setupSocketConnection() {
    console.log("sc")
    const socket = io('http://192.168.11.192:3000');
    socket.on('itemsChanged', (dev) => {
        console.log("Algo llego via 'itemChanged'", dev)
        devices.value = dev;
    });
}

// Llamar a los métodos en hooks o eventos según sea necesario
onMounted(() => {
    fetchItems();
    setupSocketConnection();
})
</script>
