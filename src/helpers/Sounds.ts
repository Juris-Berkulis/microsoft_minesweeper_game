import bomb from '@/assets/sounds/bomb.mp3';
import cell from '@/assets/sounds/cell.mp3';
import flag from '@/assets/sounds/flag.mp3';

type Action = 'bomb' | 'cell' | 'flag';

type ActionObj<K extends string> = {
    [key in K]: string;
};

const actionObj: ActionObj<Action> = {
    bomb,
    cell,
    flag,
};

export class Sound {
    static play (action: Action, power: boolean): void {
        if (power) {
            const audio: HTMLAudioElement = new Audio(actionObj[action]);
            audio.play();
        }
    }
};
