export interface Todo {
    id: string;
    label: string;
}

export class Todo {
    constructor(
        public id: string,
        public label: string
    ) {}
}
