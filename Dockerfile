FROM gradle AS build
COPY --chown=gradle:gradle ./api /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build

FROM openjdk
EXPOSE 4280
COPY --from=build /home/gradle/src/build/libs/DeXPortalAPI-0.0.1-SNAPSHOT.jar /app/

ENTRYPOINT ["java", "-XX:+UnlockExperimentalVMOptions", "-XX:+UseCGroupMemoryLimitForHeap", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/app/DeXPortalAPI-0.0.1-SNAPSHOT.jar"]
