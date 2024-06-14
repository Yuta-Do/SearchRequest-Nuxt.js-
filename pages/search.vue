<script setup lang="ts">
import { ref } from 'vue'
import { useFetch } from '#app'
definePageMeta({
    layout: "another"
})

interface SearchResultItem {
    cacheId: string
    link: string
    title: string
    snippet: string
}

const query = ref<string>('')
const results = ref<SearchResultItem[] | null>(null)

const search = async (query: string) => {
    const { data } = await useFetch(`/api/search?q=${query}`)
    results.value = data.value?.items || []
}
</script>

<template>
    <div class="search-container">
        <h1>Google Search</h1>
        <form @submit.prevent="search(query)" class="search-form">
            <input v-model="query" type="text" placeholder="検索ワードを入力" class="search-input" />
            <button type="submit" class="search-button">検索</button>
        </form>
        <div class="template-buttons">
            <p>テンプレート</p>
            <button @click="search('大谷翔平')">大谷翔平</button>
            <button @click="search('ROCK IN JAPAN FESTIVAL 2024')">ROCK IN JAPAN FESTIVAL 2024</button>
            <button @click="search('浜崎順平')">浜崎順平</button>
            <button @click="search('加藤純一')">加藤純一</button>
            <button @click="search('馬場豊')">馬場豊</button>
            <button @click="search('野球速報')">野球速報</button>
        </div>
        <div v-if="results" class="search-results">
            <div v-for="item in results" :key="item.cacheId" class="result-item">
                <h3><a :href="item.link">{{ item.title }}</a></h3>
                <p>{{ item.snippet }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.search-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
}

h1 {
    font-size: 2em;
    margin-bottom: 20px;
}

.search-form {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.search-input {
    width: 300px;
    padding: 10px;
    font-size: 1em;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.search-button {
    padding: 10px 20px;
    margin-left: 10px;
    font-size: 1em;
    border: none;
    background-color: #007BFF;
    color: white;
    border-radius: 4px;
    cursor: pointer;
}

.search-button:hover {
    background-color: #0056b3;
}

.template-buttons p {
    margin-bottom: 10px;
    font-size: 1.2em;
}

.template-buttons button {
    margin: 5px;
    padding: 10px;
    font-size: 1em;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
}

.template-buttons button:hover {
    background-color: #f0f0f0;
}

.search-results {
    margin-top: 20px;
}

.result-item {
    margin-bottom: 20px;
    text-align: left;
}

.result-item h3 {
    margin: 0;
    font-size: 1.2em;
}

.result-item p {
    margin: 5px 0 0 0;
    font-size: 0.9em;
    color: #555;
}
</style>
