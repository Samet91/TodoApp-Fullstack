package de.uslu;

import java.util.UUID;

public class Todo {

    private String todoItem;
    private String id;
    private boolean completed;

    public Todo() {
        this.id = UUID.randomUUID().toString();
    }

    public Todo(String todoItem, boolean completed) {
        this.todoItem = todoItem;
        this.completed = completed;
        this.id = UUID.randomUUID().toString();
    }

    public String getTodoItem() {
        return todoItem;
    }

    public void setTodoItem(String todoItem) {
        this.todoItem = todoItem;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
