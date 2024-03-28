FROM alpine:3.19.1
ARG DOCKER_USER=default_user
RUN addgroup -S docker && adduser -S $DOCKER_USER -G docker
USER $DOCKER_USER

FROM docker.io/library/gradle:jdk21 AS build
COPY ./ /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build

FROM docker.io/library/openjdk:23-jdk-oraclelinux9
EXPOSE 8080
COPY --from=build /home/gradle/src/build/libs/DeXPortalAPI-0.0.1-SNAPSHOT.jar /app/

ENTRYPOINT ["java", "-XX:+UnlockExperimentalVMOptions", "-jar", "/app/DeXPortalAPI-0.0.1-SNAPSHOT.jar"]
