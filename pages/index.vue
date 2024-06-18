<template>
    <h1>Home</h1>
    <ul class="content-box">
        <li><NuxtLink :to="{ name: 'search' }" class="button-link">Google Search</NuxtLink></li>
        <li><NuxtLink :to="{ name: 'route' }" class="button-link">Route Calcurator</NuxtLink></li>
    </ul>
</template>
 
<style scoped>
h1 {
    font-size: 2em;
    text-align: center;
    margin-top: 100px;
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
    list-style-type : none;
    padding: 0;
}

</style>