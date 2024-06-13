<template>
    <div class="hello">
        <NuxtLink :to = "{name: 'about'}">about</NuxtLink>
        <slot/>
    </div>
</template>