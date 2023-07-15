<script setup lang="ts">
import IconNumber from '@/components/IconNumber.vue'

interface Props {
    numberOfMinesNearby: null | number,
};

defineProps<Props>();

interface NumberColor {
    0: string,
    1: string,
    2: string,
    3: string,
    4: string,
    5: string,
    6: string,
    7: string,
    8: string,
};

const numberColor: NumberColor = {
    0: '#cccccc',
    1: '#000099',
    2: '#009900',
    3: '#999900',
    4: '#cc7722',
    5: '#990000',
    6: '#000055',
    7: '#009999',
    8: '#990099',
};
</script>

<template>
    <div class="number">
        <IconNumber :numberOfMinesNearby="numberOfMinesNearby" :color="numberColor[numberOfMinesNearby as keyof NumberColor]"></IconNumber>
    </div>
</template>

<style scoped>
.number {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
