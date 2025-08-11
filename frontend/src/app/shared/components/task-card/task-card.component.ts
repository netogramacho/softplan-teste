import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Task } from "../../models/task.model";

@Component({
  selector: "app-task-card",
  templateUrl: "./task-card.component.html",
  styleUrls: ["./task-card.component.scss"],
  standalone: true
})
export class TaskCardComponent {

    @Input() todo = new Task({
        title: '',
        completed: false,
        id: ''
    });
   @Output() remove = new EventEmitter<string>();

   onRemove() {
       this.remove.emit(this.todo.id);
   }
}
