import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../store';
import { Todo } from '../models/todo.model';
import { AlertController, IonItemSliding, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {
  todos$: Observable<Todo[]>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromStore.AppState>,
    public alertController: AlertController,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.todos$ = this.store.select(fromStore.getAllTodos);
    this.loading$ = this.store.select(fromStore.getTodosLoading);
    this.store.dispatch(new fromStore.LoadTodos());
  }

 validateInput(input: string): boolean {
    if (input === '') {
      return false;
    } else {
      return true;
    }
  };

 showToastError() {
    this.toastController.create({
      message: 'Error, input cannot be empty',
      duration: 3000,
      position: 'bottom'
    }).then(toastEl => {
      toastEl.present();
    });
  };

  addTodo() {
    this.alertController.create({
      header: 'Add todo',
      message: '',
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
            if (this.validateInput(data.newLabel)) {
              let todoLength: number = null;
              this.todos$.subscribe(data => {
                todoLength = data.length;
              });
              const newTodo: Todo = { id: todoLength, label: data.newLabel };
              this.store.dispatch(new fromStore.AddTodo(newTodo));
            } else {
              this.showToastError();
              return false;
            }
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
            if (this.validateInput(data.newLabel)) {
              this.store.dispatch(new fromStore.UpdateTodo({ todoId: todo.id, newLabel: data.newLabel }));
            } else {
              this.showToastError();
              return false;
            }
          }
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    });
  }
}
