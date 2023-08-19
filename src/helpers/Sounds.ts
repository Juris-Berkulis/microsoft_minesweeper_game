import explosion from '@/assets/sounds/explosion.mp3';
import cell from '@/assets/sounds/cell.mp3';
import flag from '@/assets/sounds/flag.mp3';

type Action = 'explosion' | 'cell' | 'flag';

type ActionObj<K extends string> = {
    [key in K]: string;
};

const actionObj: ActionObj<Action> = {
    explosion,
    cell,
    flag,
};

export class Sound {
    static play (action: Action, isPower: boolean): void {
        if (isPower) {
            const audio: HTMLAudioElement = new Audio(actionObj[action]);
            audio.play();
        }
    }
};
