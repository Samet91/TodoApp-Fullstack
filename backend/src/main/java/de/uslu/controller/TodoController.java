package de.uslu.controller;

import de.uslu.todo.Todo;
import de.uslu.todo.TodoService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
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
    public Collection<Todo> createTodo(@RequestBody Todo todo, Principal principal) {
        todoService.createTodo(todo);
        return todoService.list(principal.getName());
    }

    @GetMapping
    public Collection<Todo> list(Principal principal) {
        return todoService.list(principal.getName());
    }

    @GetMapping("/{id}")
    public Todo getOneTodo(@PathVariable String id) {
         return todoService.getTodo(id);
    }

    @PutMapping("/{id}")
    public Collection<Todo> changeTodo(@PathVariable String id, @RequestBody Todo todo, Principal principal) {
        todoService.setCompleted(id, todo);
        return todoService.list(principal.getName());
    }

    @PutMapping("/complete/{id}")
    public Collection<Todo> completeTodo(@PathVariable String id, Principal principal) {
        todoService.setComplete(id);
        return todoService.list(principal.getName());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id, Principal principal) {
        todoService.deleteTodoItem(id, principal.getName());
    }

    @DeleteMapping()
    public Collection<Todo> deleteAllCompletedTodos(Principal principal) {
        todoService.deleteCompletedTodos(principal.getName());
        return todoService.list(principal.getName());
    }


}