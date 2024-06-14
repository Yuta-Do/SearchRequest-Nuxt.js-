<script lang="ts">
useHead({
    script: [
        {
            src: 'https://cse.google.com/cse.js?cx=302fbff48bfa8464b',
            async: true
        }
    ]
})

definePageMeta({
    layout: "about"
});
</script>

<template>
    <div>
        <h1>検索</h1>
        <div class="gcse-search"></div>
    </div>
</template>
