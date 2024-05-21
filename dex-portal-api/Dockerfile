FROM gradle:7-jdk11 AS build
COPY ./ /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle buildFatJar --no-daemon

FROM openjdk:11
EXPOSE 8080:8080
RUN mkdir /app
COPY --from=build /home/gradle/src/build/libs/*.jar /app/dex-portal-api.jar
ENTRYPOINT ["java","-jar","/app/dex-portal-api.jar"]
