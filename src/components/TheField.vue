<script setup lang="ts">
import { computed, ref, type ComputedRef, type Ref } from 'vue';

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
};

const cellsList:Ref<Cell[]> = ref([]);

const mineTheFieldWithMines = (): void => {
  for (let i = 0; i < cellsCount.value; i++) {
    const cell: Cell = {
      id: i,
      isMine: Math.random() < minesCount.value / cellsCount.value,
      isOpen: false,
      numberOfMinesNearby: null,
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
  <div class="cell" v-for="cell of cellsList" :key="cell.id">{{ cell.isMine ? 'Мина' : cell.numberOfMinesNearby }}</div>
</div>
</template>

<style scoped>
.field {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
}

.cell {
  text-align: center;
}
</style>
