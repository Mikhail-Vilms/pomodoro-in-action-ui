import { Container } from '../model/container';

export class Board {
    id : number;
    displayName: string;
    description: string;
    sortOrder: number;
    isPublic: boolean;
    isArchived: boolean;

    containers: Container[];
}

