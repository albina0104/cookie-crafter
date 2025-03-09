FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine AS production
WORKDIR /app
COPY --from=build /app/target/*.jar cookie-crafter-backend.jar
EXPOSE 8080
CMD ["java", "-jar", "cookie-crafter-backend.jar"]
