FROM maven:3.9.9-eclipse-temurin-22 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:22-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/*jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]