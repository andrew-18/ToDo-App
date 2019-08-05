import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../store';
import { Todo } from '../models/todo.model';
import { AlertController, IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {
  todos$: Observable<Todo[]>;

  constructor(
    private store: Store<fromStore.AppState>,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.todos$ = this.store.select(fromStore.getAllTodos);
    this.store.dispatch(new fromStore.LoadTodos());
  }

  addTodo() {
    this.alertController.create({
      header: 'Add todo',
      inputs: [
        {
          type: 'text',
          name: 'newLabel'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          role: 'add',
          handler: data => {
            let todoLength: number = null;
            this.todos$.subscribe(data => {
              todoLength = data.length;
            });
            const newTodo: Todo = { id: todoLength, label: data.newLabel };
            this.store.dispatch(new fromStore.AddTodo(newTodo));
          }
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    });
  }

  removeTodo(todo: Todo, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.alertController.create({
      header: 'Are you sure you want to delete this to-do?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Yes, delete',
          handler: () => {
            this.store.dispatch(new fromStore.RemoveTodo(todo));
          }
        }
      ]
    }).then(alertEL => {
      alertEL.present();
    });
  }

  updateTodo(todo: Todo, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.alertController.create({
      header: 'Update to-do',
      inputs: [
        {
          type: 'text',
          name: 'newLabel',
          value: todo.label
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Update',
          handler: data => {
            this.store.dispatch(new fromStore.UpdateTodo({ todoId: todo.id, newLabel: data.newLabel }));
          }
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    });
  }
}
