/**
 * addTodo
 *
 * @param {Array} list
 * @param {Object} item
 */
export const addTodo = (list, item) => [item, ...list];

export const findTodoItem = (list, id) =>
  list.find(listItem => listItem.id === id);

export const updateTodo = (list, updatedListItem) => {
  const updatedList = list.map(listItem =>
    listItem.id === updatedListItem.id ? updatedListItem : listItem,
  );

  return updatedList;
};

export const removedTodo = (list, id) =>
  list.filter(listItem => listItem.id !== id);
