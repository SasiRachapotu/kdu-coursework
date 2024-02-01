package com.example.jpahandson;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("com.example.jpahandson.repository")
@EntityScan("com.example.jpahandson.model")
public class JpaHandsonApplication {
	public static void main(String[] args) {
		SpringApplication.run(JpaHandsonApplication.class, args);
	}

}
