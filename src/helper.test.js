import {expect, it} from '@jest/globals';
import {v4 as uuidv4} from 'uuid';

import {addTodo, removedTodo, updateTodo, findTodoItem} from './helper';

describe('todo', () => {
  const id1 = uuidv4();
  const id2 = uuidv4();
  const id3 = uuidv4();
  it('should add todo to the list', () => {
    const startTodos = [
      {id: id1, task: 'task-1'},
      {id: id2, task: 'task-2'},
    ];

    const newTodo = {id: id3, task: 'task-3'};
    const expected = [
      {id: id3, task: 'task-3'},
      {id: id1, task: 'task-1'},
      {id: id2, task: 'task-2'},
    ];

    const result = addTodo(startTodos, newTodo);
    expect(result).toEqual(expected);
  });

  it('removeTodo should remove todo from todos by id', () => {
    const startTodos = [
      {id: id1, task: 'task-1'},
      {id: id2, task: 'task-2'},
      {id: id3, task: 'task-3'},
    ];

    const expected = [
      {id: id1, task: 'task-1'},
      {id: id3, task: 'task-3'},
    ];

    const result = removedTodo(startTodos, id2);
    expect(result).toEqual(expected);
  });

  it('find item by id from todos list', () => {
    const startTodos = [
      {id: id1, task: 'task-1'},
      {id: id2, task: 'task-2'},
      {id: id3, task: 'task-3'},
    ];

    const expectedTodoItem = {id: id2, task: 'task-2'};

    const result = findTodoItem(startTodos, id2);

    expect(result).toEqual(expectedTodoItem);
  });

  it('update todo should update todo by id', () => {
    const startTodos = [
      {id: id1, task: 'task-1'},
      {id: id2, task: 'task-2'},
      {id: id3, task: 'task-3'},
    ];

    const updatedTodo = {id: id2, task: 'task-2-updated-successfully'};

    const expectedTodos = [
      {id: id1, task: 'task-1'},
      {id: id2, task: 'task-2-updated-successfully'},
      {id: id3, task: 'task-3'},
    ];

    const result = updateTodo(startTodos, updatedTodo);
    expect(result).toEqual(expectedTodos);
  });
});
