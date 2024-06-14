<template>
    <div class="default-layout">
        <slot />
        <div class="content-box">
            <NuxtLink :to="{ name: 'search' }" class="button-link">Google Search</NuxtLink>
        </div>
    </div>
</template>

<style scoped>
.default-layout {
    padding: 20px;
}

.button-link {
    display: inline-block;
    padding: 10px 20px;
    margin-bottom: 20px;
    font-size: 1.2em;
    text-decoration: none;
    color: white;
    background-color: #007BFF;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
}

.button-link:hover {
    background-color: #0056b3;
}

.content-box{
    text-align: center;
}
</style>
