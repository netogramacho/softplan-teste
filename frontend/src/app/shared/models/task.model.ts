export interface ITaskApiList {
    data: ITask[];
}

export interface ITaskApi {
    data: ITask;
}

export interface ITask {
    id: string,
    title: string,
    completed: boolean,
    createdAt?: string | null,
    updatedAt?: string | null
}

export class Task implements ITask {
    constructor(data: ITask) {
        this.id = data.id,
        this.title = data.title,
        this.completed = data.completed,
        this.createdAt = data.createdAt!,
        this.updatedAt = data.updatedAt!
    }

    id: string;
    title: string;
    completed: boolean;
    createdAt?: string | null;
    updatedAt?: string | null;

}