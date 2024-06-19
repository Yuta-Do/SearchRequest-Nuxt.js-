<script setup lang="ts">
import { ref } from 'vue';
import { useNuxtApp } from '#app';

definePageMeta({
    layout: "another"
});

const origin = ref<string>('');
const destination = ref<string>('');

const routeInfo = ref<any>({
    duration: '',
    fare: '',
    pass: ''
});

const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');

const isLoading = ref(false);
const ticketType = ref<string>('oneWay');
const searchSelector = ref<string>('1');
const errorMessage = ref<string>('');

const { $axios } = useNuxtApp();

const routeSearch = async (origin?: string, destination?: string, searchSelector?: string) => {
    try {
        isLoading.value = true;
        errorMessage.value = '';
        const response = await $axios.get(`/api2/route?origin=${origin}&destination=${destination}&s=${searchSelector}`);
        routeInfo.value = response.data;

        if(routeInfo.value.duration && routeInfo.value.fare){
            routeInfo.value.duration = cutDuration(routeInfo.value.duration);
            routeInfo.value.fare = yenToNumber(routeInfo.value.fare);
            routeInfo.value.pass = routeInfo.value.pass ? yenToNumber(routeInfo.value.pass) : '';
        }else{
            errorMessage.value = 'データが見つかりませんでした。';
        }

        console.log(routeInfo.value);
        isLoading.value = false;
    } catch (error) {
        console.error('Error fetching route info:', error);
        errorMessage.value = 'データの取得中にエラーが発生しました。'
        isLoading.value = false;
    }
};

const yenToNumber = (number: string) => {
    return parseInt(((number.match(/\d{1,3}(,\d{3})*円/) || [''])[0].replace(/,/g,'')).replace(/円/,''));
};

const cutDuration = (duration: string) => {
    return (duration.match(/着\d+分|着\d+時間\d+分/) || [''])[0].replace(/着/, '');
}

</script>

<template>
    <div class="container">
        <h1>Route Calculator</h1>
        <div class="inputs">
            <input v-model="origin" type="text" placeholder="出発地" class="input-field smaller-input" @keyup.enter="routeSearch(origin, destination, searchSelector)" />
            <input v-model="destination" type="text" placeholder="到着地" class="input-field smaller-input" @keyup.enter="routeSearch(origin, destination, searchSelector)" />
        </div>
        <div class="selector-container">
            <input type="radio" id="1" v-model="searchSelector" value="1">
            <label for="1">安い</label>

            <input type="radio" id="0" v-model="searchSelector" value="0">
            <label for="0">早い</label>

            <input type="radio" id="2" v-model="searchSelector" value="2">
            <label for="2">乗換少ない</label>
        </div>
        <button @click="routeSearch(origin, destination, searchSelector)" class="calculate-button larger-button">計算</button>
        <div v-if="isLoading" class="loading result-box">読み込み中...</div>
        <div v-else class="result-box">
            <p v-if="routeInfo && routeInfo.duration">所要時間(片道):{{ routeInfo.duration }}</p>
            <div v-if="routeInfo && routeInfo.fare">
                <div class="way-selector">
                    <input type="radio" id="oneWay" v-model="ticketType" value="oneWay">
                    <label for="oneWay">片道</label>

                    <input type="radio" id="roundTrip" v-model="ticketType" value="roundTrip">
                    <label for="roundTrip">往復</label>
                </div>
                <div>
                    <div v-if="ticketType === 'oneWay'">{{ routeInfo.fare }}円</div>
                    <div v-else>{{ routeInfo.fare * 2 }}円</div>
                </div>
            </div>
            <p v-if="routeInfo && routeInfo.pass">定期券(1ヵ月):{{ routeInfo.pass }}円</p>
            <p v-if="errorMessage">{{ errorMessage }}</p>
            <a v-if="routeInfo && routeInfo.duration && routeInfo.fare" :href="`https://transit.yahoo.co.jp/search/print?from=${encodeURIComponent(origin)}&to=${encodeURIComponent(destination)}&y=${year}&m=${month}&d=${day}&hh=08&m1=3&m2=0&type=4&s=${searchSelector}`" target = "_blank">詳細</a>
        </div>
        <p class="prerequisites">※到着時間(~8:30)</p>
    </div>
</template>

<style scoped>
.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
    font-family: Arial, sans-serif;
}

h1 {
    font-size: 2em;
    margin-bottom: 20px;
    color: #333;
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

.selector-container ,
.way-selector{
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
}

.selector-container label,
.way-selector label {
    font-size: 1em;
    padding-left: 10px;
    padding-right: 10px;
}

.calculate-button {
    padding: 10px 20px;
    font-size: 1em;
    border: none;
    background-color: #007BFF;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 10px;
}

.calculate-button:hover {
    background-color: #0056b3;
}

.loading {
    margin-top: 20px;
    font-size: 1.2em;
    color: #666;
}

.result-box{
    margin-bottom: 20px;
}

.error-message {
    color: red;
    margin-top: 20px;
    font-size: 1.2em;
}

p {
    margin: 10px 0;
    font-size: 1em;
    color: #333;
}

a {
    display: inline-block;
    margin-top: 10px;
    color: #007BFF;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
</style>
