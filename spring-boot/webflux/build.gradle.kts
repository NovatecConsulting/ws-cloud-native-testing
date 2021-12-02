plugins {
    id("org.springframework.boot")
    id("org.asciidoctor.jvm.convert")
    id("io.spring.dependency-management")

    kotlin("jvm")
    kotlin("plugin.spring")
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-validation")
    implementation("org.springframework.boot:spring-boot-starter-webflux")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("io.projectreactor.kotlin:reactor-kotlin-extensions")

    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.springframework.restdocs:spring-restdocs-webtestclient")
    testImplementation("io.rest-assured:rest-assured")
    testImplementation("io.mockk:mockk")
}

tasks {
    asciidoctor {
        dependsOn("test")
        baseDirFollowsSourceDir()
        options(
            mapOf(
                "doctype" to "book",
                "backend" to "html5"
            )
        )
        attributes(
            mapOf(
                "snippets" to file("$buildDir/generated-snippets"),
                "source-highlighter" to "coderay",
                "toclevels" to "3",
                "sectlinks" to "true",
                "data-uri" to "true",
                "nofooter" to "true"
            )
        )

    }

    asciidoctorj {
        fatalWarnings("include file not found")
    }

    bootJar {
        dependsOn("asciidoctor")
        from(file("build/docs/asciidoc/index.html")) {
            into("BOOT-INF/classes/static/docs")
        }
    }
}
