package de.uslu;

import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class TodoService {

    private final TodoRepo todoRepo;

    public TodoService(TodoRepo todoRepo) {
        this.todoRepo = todoRepo;
    }

    public Collection<Todo> list() {
        return todoRepo.list();
    }

    public void createTodo(Todo todo) {
        todoRepo.createTodo(todo);
    }

    public void setComplete(String id) {
        var foundTodo = todoRepo.getById(id);
        foundTodo.setCompleted(true);
    }

    public void setCompleted(String id, Todo changedTodo) {
        Todo foundTodo = todoRepo.getById(id);
            foundTodo.setTitle(changedTodo.getTitle());
            foundTodo.setDescription(changedTodo.getDescription());
            todoRepo.createTodo(foundTodo);
    }

    public Todo getId(String id) {
        return todoRepo.getById(id);
    }

        public void deleteTodoItem(String id) {
            todoRepo.deleteTodo(id);
    }

    public void deleteCompletedTodos() {
        var list = todoRepo.list().stream().filter(e -> e.isCompleted())
                .toList();
        for (Todo todo: list) {
            todoRepo.list().remove(todo);
        }
    }

}
