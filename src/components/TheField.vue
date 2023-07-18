<script setup lang="ts">
import { computed, ref, type ComputedRef, type Ref } from 'vue';
import BaseMine from './BaseMine.vue';
import BaseNumber from './BaseNumber.vue';
import BaseFlag from './BaseFlag.vue';
import type { GameResult } from '../types/index';
import { type FieldSettings, type Styles } from '../types/index';

const pressTouchScreenId: Ref<number> = ref(0);

const cellsCountInHeight: number = (JSON.parse(localStorage.getItem('fieldSettings') || '{}') as FieldSettings).cellsCountInHeight || 10;
const cellsCountInWidth: number = (JSON.parse(localStorage.getItem('fieldSettings') || '{}') as FieldSettings).cellsCountInWidth || 10;
const minesSpawnPercentage: number = (JSON.parse(localStorage.getItem('fieldSettings') || '{}') as FieldSettings).minesCountExpected || 25;

const cellsCount: ComputedRef<number> = computed(() => {
  return cellsCountInHeight * cellsCountInWidth
});

const countOfCellsWithZero: Ref<number> = ref(0);
const minesCountReal: Ref<number> = ref(0);

const correctMovesCount: Ref<number> = ref(0);
const flagsCount: Ref<number> = ref(0);

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

const cellsList: Ref<Cell[]> = ref([]);

const mineTheFieldWithMines = (): void => {
  for (let i = 0; i < cellsCount.value; i++) {
    const cell: Cell = {
      id: i,
      isMine: Math.random() < minesSpawnPercentage / 100,
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

interface IsColumnsAndRowsNearby {
  isRowOver: boolean,
  isRowUnder: boolean,
  isColumnRirgt: boolean,
  isColumnLeft: boolean,
};

const isColumnsAndRowsNearby = (indexCell: number): IsColumnsAndRowsNearby => {
  const isRowOver: boolean = indexCell >= cellsCountInWidth; //* - Есть строка выше.
  const isRowUnder: boolean = indexCell < cellsCount.value - cellsCountInWidth; //* - Есть строка снизу.
  const isColumnRirgt: boolean = (indexCell + 1) % cellsCountInWidth !== 0; //* - Есть столбец справа.
  const isColumnLeft: boolean = indexCell % cellsCountInWidth !== 0; //* - Есть столбец слева.

  return {
    isRowOver,
    isRowUnder,
    isColumnRirgt,
    isColumnLeft,
  }
};

const getNumberOfMinesNearby = (indexCell: number): number => {
  let countMine: number = 0;

  const {
    isRowOver,
    isRowUnder,
    isColumnRirgt,
    isColumnLeft,
  }: IsColumnsAndRowsNearby = isColumnsAndRowsNearby(indexCell);

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

  if (isRowUnder && isColumnRirgt && cellsList.value[indexCell + cellsCountInWidth + 1].isMine) { //* - Есть мина в правом-нижнем углу.
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

const openCellsNearZero = (indexCell: number): void => {
  const {
    isRowOver,
    isRowUnder,
    isColumnRirgt,
    isColumnLeft,
  }: IsColumnsAndRowsNearby = isColumnsAndRowsNearby(indexCell);

  if (isRowOver && !cellsList.value[indexCell - cellsCountInWidth].isOpen) { //* - Открыть наверху.
    cellsList.value[indexCell - cellsCountInWidth].isClicked = true;
    cellsList.value[indexCell - cellsCountInWidth].isOpen = true;
    correctMovesCount.value++;
  }

  if (isRowOver && isColumnRirgt && !cellsList.value[indexCell - cellsCountInWidth + 1].isOpen) { //* - Открыть в правом-верхнем углу.
    cellsList.value[indexCell - cellsCountInWidth + 1].isClicked = true;
    cellsList.value[indexCell - cellsCountInWidth + 1].isOpen = true;
    correctMovesCount.value++;
  }

  if (isRowOver && isColumnLeft && !cellsList.value[indexCell - cellsCountInWidth - 1].isOpen) { //* - Открыть в левом-верхнем углу.
    cellsList.value[indexCell - cellsCountInWidth - 1].isClicked = true;
    cellsList.value[indexCell - cellsCountInWidth - 1].isOpen = true;
    correctMovesCount.value++;
  }

  if (isRowUnder && !cellsList.value[indexCell + cellsCountInWidth].isOpen) { //* - Открыть внизу.
    cellsList.value[indexCell + cellsCountInWidth].isClicked = true;
    cellsList.value[indexCell + cellsCountInWidth].isOpen = true;
    correctMovesCount.value++;
  }

  if (isRowUnder && isColumnRirgt && !cellsList.value[indexCell + cellsCountInWidth + 1].isOpen) { //* - Открыть в правом-нижнем углу.
    cellsList.value[indexCell + cellsCountInWidth + 1].isClicked = true;
    cellsList.value[indexCell + cellsCountInWidth + 1].isOpen = true;
    correctMovesCount.value++;
  }

  if (isRowUnder && isColumnLeft && !cellsList.value[indexCell + cellsCountInWidth - 1].isOpen) { //* - Открыть в левом-нижнем углу.
    cellsList.value[indexCell + cellsCountInWidth - 1].isClicked = true;
    cellsList.value[indexCell + cellsCountInWidth - 1].isOpen = true;
    correctMovesCount.value++;
  }

  if (isColumnRirgt && !cellsList.value[indexCell + 1].isOpen) { //* - Открыть справа.
    cellsList.value[indexCell + 1].isClicked = true;
    cellsList.value[indexCell + 1].isOpen = true;
    correctMovesCount.value++;
  }

  if (isColumnLeft && !cellsList.value[indexCell - 1].isOpen) { //* - Открыть слева.
    cellsList.value[indexCell - 1].isClicked = true;
    cellsList.value[indexCell - 1].isOpen = true;
    correctMovesCount.value++;
  }
};

const placeCluesOnTheField = (): void => {
  for (let index = 0; index < cellsList.value.length; index++) {
    if (!cellsList.value[index].isMine) {
      cellsList.value[index].numberOfMinesNearby = getNumberOfMinesNearby(index);
      if (cellsList.value[index].numberOfMinesNearby === 0) {
        if (!cellsList.value[index].isOpen) {
          cellsList.value[index].isClicked = true;
          cellsList.value[index].isOpen = true;
          correctMovesCount.value++;
        }
        openCellsNearZero(index);

        countOfCellsWithZero.value++;

        if (countOfCellsWithZero.value === correctMovesCount.value) {
          gameResult.value = 'won';
        }
      }
    }
  }
};

const restartGame = (): void => {
  minesCountReal.value = 0;
  countOfCellsWithZero.value = 0;
  correctMovesCount.value = 0;
  flagsCount.value = 0;
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

const toggleFlag = (clickedCell: Cell): void => {
  if (!clickedCell.isOpen && gameResult.value === 'indefined') {
    clickedCell.isFlag = !clickedCell.isFlag;

    if (clickedCell.isFlag) {
      flagsCount.value++;
    } else {
      flagsCount.value--;
    }

    if (flagsCount.value === minesCountReal.value && minesCountReal.value + correctMovesCount.value === cellsCount.value) {
      gameResult.value = 'won';
    }
  }
};

const openCell = (event: MouseEvent, cellIndex: number): void => {
  if (gameResult.value === 'indefined') {
    const clickedCell: Cell = cellsList.value[cellIndex];

    if (!clickedCell.isOpen) {
      if (event.altKey || event.ctrlKey) {
        toggleFlag(clickedCell);
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
  } else {
    startGame();
  }
};

const resetTimerForPressTouchScreen = (): void => {
  clearTimeout(pressTouchScreenId.value);
};

const toggleFlagByTouchScreen = (clickedCell: Cell) => {
  pressTouchScreenId.value = setTimeout(() => {
    toggleFlag(clickedCell);
  }, 700);
};

const styles: Styles = {
  field: {
    'grid-template-columns': `repeat(${cellsCountInWidth}, 1fr)`
  },
  cellStyle: {
    height: `min(calc(90vh / ${cellsCountInHeight}), calc(90vw / ${cellsCountInWidth}))`,
  },
};
</script>

<template>
<div class="field" :style="styles.field">
  <div class="cell" :style="styles.cellStyle" v-for="cell of cellsList" :key="cell.id" @click="(event) => openCell(event, cell.id)" @mousedown.right="() => toggleFlag(cell)" @contextmenu.prevent="" @touchstart="() => toggleFlagByTouchScreen(cell)" @touchend="resetTimerForPressTouchScreen">
    <div class="cellIcon" :class="{cellIcon_clicked: cell.isClicked}" v-if="cell.isOpen || gameResult !== 'indefined'">
      <BaseMine v-if="cell.isMine" :isMineExploded="cell.isMineExploded" :gameResult="gameResult"></BaseMine>
      <BaseNumber v-if="!cell.isMine" :numberOfMinesNearby="cell.numberOfMinesNearby"></BaseNumber>
    </div>
    <BaseFlag v-if="cell.isFlag" :isWrongChoice="gameResult === 'lost' && cell.isFlag && !cell.isMine"></BaseFlag>
  </div>
</div>
</template>

<style scoped>
.field {
  height: fit-content;
  width: fit-content;
  margin: 0 auto;
  display: grid;
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
