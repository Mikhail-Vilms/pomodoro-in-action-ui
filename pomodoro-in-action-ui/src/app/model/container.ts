import { Ticket } from '../model/ticket';

export class Container {
    id : number;
    displayName: string;
    description: string;
    sortOrder: number;
    
    boardId: number;

    tickets: Ticket[];
}