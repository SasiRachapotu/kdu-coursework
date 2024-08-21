package com.example.databasehandson.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class TestRepository {

    JdbcTemplate jdbcTemplate;

    public TestRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate=jdbcTemplate;
    }

    public void test(){
        jdbcTemplate.queryForObject("SELECT COUNT(*) FROM tenants", Integer.class);
    }
}
