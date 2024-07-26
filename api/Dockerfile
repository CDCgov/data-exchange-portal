FROM docker.io/library/gradle:jdk21 AS build
COPY ./ /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle buildFatJar --no-daemon

FROM docker.io/library/ibm-semeru-runtimes:open-21.0.3_9-jre-jammy
RUN useradd -r app
RUN mkdir /app && chown app:app /app
WORKDIR /app
COPY --from=build /home/gradle/src/build/libs/*.jar /app/dex-portal-api.jar
RUN chown app:app /app/dex-portal-api.jar
USER app
EXPOSE 8080:8080
ENTRYPOINT ["java","-jar","/app/dex-portal-api.jar"]
