<script setup lang="ts">
interface Props {
    isWrongChoice: boolean,
};

defineProps<Props>();
</script>

<template>
<div class="flagWrapper">
    <div class="flag">
        <div class="flagLever">
            <div class="flagCloth"></div>
        </div>
    </div>
    <div class="cross" v-if="isWrongChoice">
        <div class="crossLine crossLine_1"></div>
        <div class="crossLine crossLine_2"></div>
    </div>
</div>
</template>

<style scoped>
.flagWrapper {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
}

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
    width: 7%;
    background-color: #696969;
}

.flagCloth {
    position: absolute;
    top: 0;
    left: 100%;
    height: 35%;
    width: 200%;
    background-color: #ff0000;
}

.cross {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.crossLine {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 5%;
    width: 100%;
    background-color: #a40000;
}

.crossLine_1 {
    transform: translate(-50%, -50%) rotateZ(45deg);
}

.crossLine_2 {
    transform: translate(-50%, -50%) rotateZ(-45deg);
}
</style>
