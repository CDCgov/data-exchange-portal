FROM docker.io/library/gradle AS build

COPY ./ /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build

FROM docker.io/library/openjdk
EXPOSE 8080
COPY --from=build /home/gradle/src/build/libs/DeXPortalAPI-0.0.1-SNAPSHOT.jar /app/

ENTRYPOINT ["java", "-XX:+UnlockExperimentalVMOptions", "-jar", "/app/DeXPortalAPI-0.0.1-SNAPSHOT.jar"]
