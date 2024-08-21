package com.example.jpahandson.repository;

import com.example.jpahandson.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    @Modifying
    @Query(nativeQuery = true, value = "UPDATE users SET username = :username WHERE id = :userId")
    int updateUserDetailsNativeQuery(
            @Param("userId") UUID userId,
            @Param("username") String username
    );
}
