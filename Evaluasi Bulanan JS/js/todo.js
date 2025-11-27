const Todo = {
  list(username) {
    return DB.get("todos_" + username) || [];
  },

  add(username, text) {
    let todos = Todo.list(username);
    todos.push({
      id: "todo_" + Date.now(),
      text,
      done: false
    });
    DB.set("todos_" + username, todos);
  },

  toggle(username, id) {
    let todos = Todo.list(username);
    const t = todos.find(x => x.id === id);
    t.done = !t.done;
    DB.set("todos_" + username, todos);
  },

  remove(username, id) {
    let todos = Todo.list(username);
    todos = todos.filter(t => t.id !== id);
    DB.set("todos_" + username, todos);
  }
};
