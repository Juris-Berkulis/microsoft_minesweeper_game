<script setup lang="ts">
import { computed, ref, type ComputedRef, type Ref } from 'vue';
import BaseMine from './BaseMine.vue';
import BaseNumber from './BaseNumber.vue';

const cellsCountInHeight: number = 10;
const cellsCountInWidth: number = 10;

const cellsCount: ComputedRef<number> = computed(() => {
  return cellsCountInHeight * cellsCountInWidth
});

const minesCount: Ref<number> = ref(50);

interface Cell {
  id: number,
  isMine: boolean,
  isOpen: boolean,
  numberOfMinesNearby: null | number,
  isMineExploded: boolean,
};

const cellsList:Ref<Cell[]> = ref([]);

const mineTheFieldWithMines = (): void => {
  for (let i = 0; i < cellsCount.value; i++) {
    const cell: Cell = {
      id: i,
      isMine: Math.random() < minesCount.value / cellsCount.value,
      isOpen: false,
      numberOfMinesNearby: null,
      isMineExploded: false,
    };

    cellsList.value.push(cell);
  }
};

const getNumberOfMinesNearby = (indexCell: number): number => {
  let countMine: number = 0;

  const isRowOver: boolean = indexCell >= cellsCountInWidth; //* - Есть строка выше.
  const isRowUnder: boolean = indexCell < cellsCount.value - cellsCountInWidth; //* - Есть строка снизу.
  const isColumnRirgt: boolean = (indexCell + 1) % cellsCountInWidth !== 0; //* - Есть столбец справа.
  const isColumnLeft: boolean = indexCell % cellsCountInWidth !== 0; //* - Есть столбец слева.

  if (isRowOver && cellsList.value[indexCell - cellsCountInWidth].isMine) { //* - Есть мина наверху.
    countMine++;
  }

  if (isRowOver && isColumnRirgt && cellsList.value[indexCell - cellsCountInWidth + 1].isMine) { //* - Есть мина в правом-верхнем углу.
    countMine++;
  }

  if (isRowOver && isColumnLeft && cellsList.value[indexCell - cellsCountInWidth - 1].isMine) { //* - Есть мина в левом-верхнем углу.
    countMine++;
  }

  if (isRowUnder && cellsList.value[indexCell + cellsCountInWidth].isMine) { //* - Есть мина внизу.
    countMine++;
  }

  if (isRowUnder && isColumnRirgt && cellsList.value[indexCell + cellsCountInWidth + 1]?.isMine) { //* - Есть мина в правом-нижнем углу.
    countMine++;
  }

  if (isRowUnder && isColumnLeft && cellsList.value[indexCell + cellsCountInWidth - 1].isMine) { //* - Есть мина в левом-нижнем углу.
    countMine++;
  }

  if (isColumnRirgt && cellsList.value[indexCell + 1].isMine) { //* - Есть мина справа.
    countMine++;
  }

  if (isColumnLeft && cellsList.value[indexCell - 1].isMine) { //* - Есть мина слева.
    countMine++;
  }

  return countMine
};

const constPlaceCluesOnTheField = (): void => {
  for (let index = 0; index < cellsList.value.length; index++) {
    if (!cellsList.value[index].isMine) {
      cellsList.value[index].numberOfMinesNearby = getNumberOfMinesNearby(index);
    }
  }
};

mineTheFieldWithMines();
constPlaceCluesOnTheField();
</script>

<template>
<div class="field">
  <div class="cell" v-for="cell of cellsList" :key="cell.id">
    <BaseMine v-if="cell.isMine" :isMineExploded="cell.isMineExploded"></BaseMine>
    <BaseNumber v-else :numberOfMinesNearby="cell.numberOfMinesNearby"></BaseNumber>
  </div>
</div>
</template>

<style scoped>
.field {
  height: min(80vh, 80vw);
  width: min(80vh, 80vw);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  border: 0.5px solid #000000;
}

.cell {
  text-align: center;
  border: 0.5px solid #000000;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
