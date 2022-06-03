import { Position } from '../models/types';

export const numToAlpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export const cellToPostion = (name: string): Position => {
    return {
        x: numToAlpha.indexOf(name.substring(0, 1)),
        y: parseInt(name.substring(1, 2)) - 1,
    };
};
