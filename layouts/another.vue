<template>
    <div class="another-layout">
        <NuxtLink to="/">Home</NuxtLink>
        <slot />
    </div>
</template>

<style scoped>
.another-layout {
    padding: 20px;
}

.another-layout a {
    display: inline-block;
    margin-bottom: 20px;
    font-size: 1.2em;
    text-decoration: none;
    color: #007BFF;
}

.another-layout a:hover {
    text-decoration: underline;
}
</style>
