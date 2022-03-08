FROM openjdk:17
VOLUME /temp
ARG JAR_FILE

COPY backend/target/todo-app-backend-0.0.1-SNAPSHOT.jar todo-app-backend.jar

CMD [ "sh", "-c", "java -jar /todo-app-backend.jar" ]