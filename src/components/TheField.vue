<script setup lang="ts">
import { computed, ref, type ComputedRef, type Ref } from 'vue';
import BaseMine from './BaseMine.vue';
import BaseNumber from './BaseNumber.vue';
import BaseFlag from './BaseFlag.vue';
import type { GameResult } from '../types/index';

const cellsCountInHeight: number = 10;
const cellsCountInWidth: number = 10;

const cellsCount: ComputedRef<number> = computed(() => {
  return cellsCountInHeight * cellsCountInWidth
});

const minesCountExpected: Ref<number> = ref(25);
const minesCountReal: Ref<number> = ref(0);

const correctMovesCount: Ref<number> = ref(0);

const gameResult: Ref<GameResult> = ref('indefined');

interface Cell {
  id: number,
  isMine: boolean,
  isOpen: boolean,
  isClicked: boolean,
  numberOfMinesNearby: null | number,
  isMineExploded: boolean,
  isFlag: boolean,
};

const cellsList:Ref<Cell[]> = ref([]);

const mineTheFieldWithMines = (): void => {
  for (let i = 0; i < cellsCount.value; i++) {
    const cell: Cell = {
      id: i,
      isMine: Math.random() < minesCountExpected.value / cellsCount.value,
      isOpen: false,
      isClicked: false,
      numberOfMinesNearby: null,
      isMineExploded: false,
      isFlag: false,
    };

    if (cell.isMine) {
      minesCountReal.value++;
    }

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

const placeCluesOnTheField = (): void => {
  for (let index = 0; index < cellsList.value.length; index++) {
    if (!cellsList.value[index].isMine) {
      cellsList.value[index].numberOfMinesNearby = getNumberOfMinesNearby(index);
      if (cellsList.value[index].numberOfMinesNearby === 0) {
        cellsList.value[index].isOpen = true;
        cellsList.value[index].isClicked = true;
        correctMovesCount.value++;
      }
    }
  }
};

const restartGame = ():void => {
  minesCountReal.value = 0;
  correctMovesCount.value = 0;
  gameResult.value = 'indefined';
  cellsList.value = [];
};

const startGame = ():void => {
  restartGame();
  mineTheFieldWithMines();
  placeCluesOnTheField();
};

startGame();

defineExpose({
  startGame,
});

const openCell = (event: MouseEvent, cellIndex: number): void => {
  if (gameResult.value === 'indefined') {
    const clickedCell: Cell = cellsList.value[cellIndex];

    if (!clickedCell.isOpen) {
      if (event.altKey || event.ctrlKey) {
        clickedCell.isFlag = !clickedCell.isFlag;
      } else {
        clickedCell.isFlag = false;
        clickedCell.isOpen = true;
        clickedCell.isClicked = true;

        if (!clickedCell.isMine) {
          correctMovesCount.value++;

          if (cellsCount.value - correctMovesCount.value === minesCountReal.value) {
            gameResult.value = 'won';
          }
        } else {
          clickedCell.isMineExploded = true;
          gameResult.value = 'lost';
        }
      }
    }
  }
};
</script>

<template>
<div class="field">
  <div class="cell" v-for="cell of cellsList" :key="cell.id" @click="(event) => openCell(event, cell.id)">
    <div class="cellIcon" :class="{cellIcon_clicked: cell.isClicked}" v-if="cell.isOpen || gameResult !== 'indefined'">
      <BaseMine v-if="cell.isMine" :isMineExploded="cell.isMineExploded" :gameResult="gameResult"></BaseMine>
      <BaseNumber v-if="!cell.isMine" :numberOfMinesNearby="cell.numberOfMinesNearby"></BaseNumber>
    </div>
    <BaseFlag v-if="cell.isFlag"></BaseFlag>
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
  position: relative;
  aspect-ratio: 1;
  border: 0.5px solid #000000;
  background-color: #cccccc;
}

.cellIcon {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: transparent;
}

.cellIcon.cellIcon_clicked {
  background-color: #eeeeee;
}
</style>
