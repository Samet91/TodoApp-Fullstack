package de.uslu;

import java.util.UUID;

public class Todo {

    private String title;
    private boolean completed;
    private String description;
    private String id;

    public Todo() {
        this.id = UUID.randomUUID().toString();
    }

    public Todo(String title, boolean completed, String description) {
        this.title = title;
        this.completed = completed;
        this.id = UUID.randomUUID().toString();
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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
