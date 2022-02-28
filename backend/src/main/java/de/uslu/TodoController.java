package de.uslu;

import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/todo")
@CrossOrigin
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @PostMapping
    public Collection<Todo> createTodo(@RequestBody Todo todo) {
        todoService.createTodo(todo);
        return list();
    }

    @GetMapping
    public Collection<Todo> list() {
        return todoService.list();
    }

    @PutMapping("/{id}")
    public void completed(@PathVariable String id) {
        todoService.setCompleted(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        todoService.deleteTodoItem(id);
    }

    @DeleteMapping()
    public Collection<Todo> deleteAllCompletedTodos() {
        todoService.deleteCompletedTodos();
        return todoService.list();
    }


}