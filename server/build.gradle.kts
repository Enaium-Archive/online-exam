plugins {
    java
    id("org.springframework.boot") version "3.1.0"
    id("io.spring.dependency-management") version "1.1.0"
}

group = "com.example"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_17

repositories {
    mavenCentral()
}

val jimmer = "0.7.67"

dependencies {
    implementation("org.babyfish.jimmer:jimmer-spring-boot-starter:${jimmer}")
    annotationProcessor("org.babyfish.jimmer:jimmer-apt:${jimmer}")

    implementation("org.mapstruct:mapstruct:1.5.5.Final")
    annotationProcessor("org.mapstruct:mapstruct-processor:1.5.5.Final")

    implementation("cn.dev33:sa-token-spring-boot3-starter:1.34.0")
    implementation("cn.dev33:sa-token-dao-redis-jackson:1.34.0")
    implementation("org.apache.commons:commons-pool2")

    implementation("org.springframework.boot:spring-boot-starter-web")
    compileOnly("org.projectlombok:lombok")
    annotationProcessor("org.projectlombok:lombok")
    runtimeOnly("org.mariadb.jdbc:mariadb-java-client")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.withType<Test> {
    useJUnitPlatform()
}
