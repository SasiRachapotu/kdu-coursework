package com.example.databasehandson.dao;

import com.example.databasehandson.entity.Tenant;
import com.example.databasehandson.util.TenantRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TenantDao {
    JdbcTemplate jdbcTemplate;

    @Autowired
    public TenantDao(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate=jdbcTemplate;
    }

    public Tenant getTenant(String name){
        String sql = "SELECT * FROM tenants WHERE name = ?";
        return jdbcTemplate.queryForObject(sql,new TenantRowMapper(),name);
    }

    public List<Tenant> getAllTenants(){
        String sql ="SELECT * FROM tenants";
        return jdbcTemplate.query(sql,new TenantRowMapper());
    }

}
