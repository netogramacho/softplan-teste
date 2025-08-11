import { Component, OnInit } from "@angular/core";
import { Task } from "../../shared/models/task.model";
import { TaskService } from "../../core/services/task.service";
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from "@angular/forms";
import { TaskCardComponent } from "../../shared/components/task-card/task-card.component";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-tasks",
    templateUrl: "./tasks.component.html",
    styleUrls: ["./tasks.component.scss"],
    imports: [CommonModule, FormsModule, TaskCardComponent, ReactiveFormsModule],
    standalone: true
})
export class TasksComponent implements OnInit {
    todos = this.taskService.tasks();
    newTodo: Task = { id: '', title: '', completed: false };
    alert = {
        message: "",
        type: null as null | "success" | "error"
    };
    timeOutId: any = null;
    form = this.formBuilder.group({
        title: ['', [Validators.required, Validators.minLength(3)]]
    });

    constructor(private taskService: TaskService, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.taskService.fetchTasks().subscribe({
            error: (err) => {
                console.error('Erro ao buscar tarefas', err);
                // Exibição de mensagem de erro para o usuário (toaster ou snackbar em caso de uso de bibliotecas)
                this.showAlert('Erro ao buscar tarefas. Tente novamente mais tarde.', 'error');
            }
        });
    }

    addTodo() {
        if (this.form.invalid) return;

        this.taskService.addTask(this.form.value.title!).subscribe({
            next: () => {
                this.form.reset();
                this.showAlert('Tarefa adicionada com sucesso.', 'success');
            },
            error: (err) => {
                console.error('Erro ao adicionar tarefa', err);
                // Exibição de mensagem de erro para o usuário (toaster ou snackbar em caso de uso de bibliotecas)
                this.showAlert('Erro ao adicionar tarefa. Tente novamente mais tarde.', 'error');
            }
        });
    }

    removeTodo(id: string) {
        this.taskService.removeTask(id).subscribe({
            next: () => {
                this.showAlert('Tarefa removida com sucesso.', 'success');
            },
            error: (err) => {
                console.error('Erro ao remover tarefa:', err);
                // Exibição de mensagem de erro para o usuário (toaster ou snackbar em caso de uso de bibliotecas)
                this.showAlert('Erro ao remover tarefa. Tente novamente mais tarde.', 'error');
            }
        });
    }

    showAlert(message: string, type: "success" | "error") {
        this.alert = { message, type };

        if (this.timeOutId) {
            clearTimeout(this.timeOutId);
        }
        this.timeOutId = setTimeout(() => {
            this.alert = { message: "", type: null };
        }, 3000);
    }
}