<template>
    <div>
        <h1>Google Search</h1>
        <form @submit.prevent="search">
            <input v-model="query" type="text" placeholder="Search Google..." />
            <button type="submit">Search</button>
        </form>
        <div v-if="results">
            <div v-for="item in results" :key="item.cacheId">
                <h3><a :href="item.link">{{ item.title }}</a></h3>
                <p>{{ item.snippet }}</p>
            </div>
        </div>
    </div>
</template>

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

interface GoogleSearchResponse {
    items: SearchResultItem[]
}

const query = ref<string>('')
const results = ref<SearchResultItem[] | null>(null)

const search = async () => {
    const { data } = await useFetch<GoogleSearchResponse>(`/api/search?q=${query.value}`)
    results.value = data.value?.items || []
}
</script>