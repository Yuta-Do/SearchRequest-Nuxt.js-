<template>
    <div class="hello">
        <NuxtLink :to = "{name: 'search'}">Google Search</NuxtLink>
        <slot/>
    </div>
</template>