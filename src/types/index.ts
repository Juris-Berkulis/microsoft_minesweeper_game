interface ClassNames {
    [key: string]: string
};

export interface Styles {
    [key: string]: ClassNames
};

export type GameResult = 'indefined' | 'won' | 'lost';

export interface FieldSettings {
    cellsCountInHeight: number,
    cellsCountInWidth: number,
    minesCountExpected: number,
};
