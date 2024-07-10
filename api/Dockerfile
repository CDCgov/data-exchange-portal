FROM docker.io/library/gradle:jdk21 AS build
COPY ./ /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle buildFatJar --no-daemon

FROM docker.io/library/openjdk:23-jdk-oraclelinux9
RUN groupadd -r appGroup && useradd -r -g appGroup -m -s /bin/bash appUser
RUN mkdir /app && chown appUser:appGroup /app
WORKDIR /app
COPY --from=build /home/gradle/src/build/libs/*.jar /app/dex-portal-api.jar
RUN chown appUser:appGroup /app/dex-portal-api.jar
USER appUser
EXPOSE 8080:8080
ENTRYPOINT ["java","-jar","/app/dex-portal-api.jar"]
