FROM gradle AS build
COPY ./api /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build

FROM openjdk
EXPOSE 4280
COPY --from=build /home/gradle/src/build/libs/DeXPortalAPI-0.0.1-SNAPSHOT.jar /app/

ENTRYPOINT ["java", "-XX:+UnlockExperimentalVMOptions", "-jar", "/app/DeXPortalAPI-0.0.1-SNAPSHOT.jar"]
