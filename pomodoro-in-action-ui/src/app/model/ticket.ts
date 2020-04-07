import { Container } from './container';

export class Ticket {
    id : number;
    displayName: string;
    description: string;
    sortOrder: number;
    containerId: number;
    kanbanContainer: Container;
}
