<script setup lang="ts">
import { ref } from 'vue';
import { useNuxtApp } from '#app';

definePageMeta({
    layout: "another"
});

const origin = ref<string>('');
const destination = ref<string>('');

const routeInfo = ref<any>(null);
const isLoading = ref(false);

const { $axios } = useNuxtApp();

const routeSearch = async (origin?: string, destination?: string) => {
    try {
        isLoading.value = true;
        const response = await $axios.get(`/api2/route?origin=${origin}&destination=${destination}`);
        routeInfo.value = response.data;
        routeInfo.value.duration = routeInfo.value.duration.replace(/着/, "着\n");
        routeInfo.value.fare = routeInfo.value.fare.replace(/優先/, "料金");
        routeInfo.value.pass = routeInfo.value.pass.replace(/定期券 通勤/, "定期代");
        isLoading.value = false;
    } catch (error) {
        console.error('Error fetching route info:', error);
    }
};

</script>

<template>
    <div class="container">
        <h1>Route Calculator</h1>
        <div class="inputs">
            <input v-model="origin" type="text" placeholder="出発地" class="input-field smaller-input" @keyup.enter="routeSearch(origin, destination)" />
            <input v-model="destination" type="text" placeholder="到着地" class="input-field smaller-input" @keyup.enter="routeSearch(origin, destination)" />
        </div>
        <button @click="routeSearch(origin, destination)" class="calculate-button larger-button">計算</button>
        <div v-if="isLoading" class="loading">読み込み中...</div>
        <div v-else>
            <p v-if="routeInfo && routeInfo.duration">所要時間：{{ routeInfo.duration }}</p>
            <p v-if="routeInfo && routeInfo.fare">{{ routeInfo.fare }}</p>
            <p v-if="routeInfo && routeInfo.pass">{{ routeInfo.pass }}</p>
        </div>
        <p>※到着時間(~8:50)</p>
        <p>※最安値ルート</p>
    </div>
</template>

<style scoped>
.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
}

h1 {
    font-size: 2em;
    margin-bottom: 20px;
}

.inputs {
    margin-bottom: 20px;
}

.smaller-input {
    width: 250px;
    padding: 10px;
    font-size: 1em;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
}

.calculate-button {
    padding: 10px 20px;
    font-size: 1em;
    border: none;
    background-color: #007BFF;
    color: white;
    border-radius: 4px;
    cursor: pointer;
}

.calculate-button:hover {
    background-color: #0056b3;
}

.loading {
    margin-top: 20px;
    font-size: 1.2em;
}
</style>
