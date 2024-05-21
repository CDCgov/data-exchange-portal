FROM docker.io/library/gradle:jdk21 AS build
COPY ./ /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build

FROM docker.io/library/openjdk:23-jdk-oraclelinux9
EXPOSE 8000
COPY --from=build /home/gradle/src/build/libs/api-all.jar /app/

ENTRYPOINT ["java", "-XX:+UnlockExperimentalVMOptions", "-jar", "/app/api-all.jar"]
