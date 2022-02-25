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

    public void setCompleted(String id) {
        var foundTodo = todoRepo.getById(id);
            foundTodo.setCompleted(true);
            todoRepo.createTodo(foundTodo);
    }

    public Todo getId(String id) {
        return todoRepo.getById(id);
    }

        public void deleteTodoItem(String id) {
            todoRepo.deleteTodo(id);
    }

}
