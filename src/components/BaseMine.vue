<script setup lang="ts">
import type { GameResult } from '../types/index';

interface Props {
    isMineExploded: boolean,
    gameResult: GameResult,
};

defineProps<Props>();
</script>

<template>
    <div 
        class="mine" 
        :class="[isMineExploded ? 'mine_exploded' : 'mine_notExploded', {mine_won: gameResult === 'won'}]"
    >
        <div class="mineCircle"></div>
        <div class="mineLever mineLever_1"></div>
        <div class="mineLever mineLever_2"></div>
        <div class="mineLever mineLever_3"></div>
    </div>
</template>

<style scoped>
.mine {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.mine_notExploded {
    color: #000000;
}

.mine_exploded {
    color: #ff0000;
}

.mine_notExploded.mine_won {
    color: #00dd00;
}

.mineCircle {
    height: 50%;
    width: 50%;
    border-radius: 50%;
    background-color: currentColor;
}

.mineLever {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 10%;
    width: 75%;
    border-radius: 50%;
    background-color: currentColor;
}

.mineLever_1 {
    transform: translate(-50%, -50%);
}

.mineLever_2 {
    transform: translate(-50%, -50%) rotateZ(60deg);
}

.mineLever_3 {
    transform: translate(-50%, -50%) rotateZ(-60deg);
}
</style>
