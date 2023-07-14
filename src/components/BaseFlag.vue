<script setup lang="ts">

</script>

<template>
    <div class="flag">
        <div class="flagLever">
            <div class="flagCloth"></div>
        </div>
    </div>
</template>

<style scoped>
.flag {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.flagLever {
    position: relative;
    height: 60%;
    width: 10%;
    background-color: #000000;
}

.flagCloth {
    position: absolute;
    top: 0;
    left: 100%;
    height: 35%;
    width: 200%;
    background-color: #ff0000;
}
</style>
