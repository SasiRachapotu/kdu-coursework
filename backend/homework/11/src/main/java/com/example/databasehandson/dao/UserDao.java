package com.example.databasehandson.dao;

import com.example.databasehandson.dto.request.UserRequestDto;
import com.example.databasehandson.entity.Tenant;
import com.example.databasehandson.entity.Users;
import com.example.databasehandson.util.UserRowMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Repository
@Slf4j
public class UserDao {
    JdbcTemplate jdbcTemplate;
    TenantDao tenantDao;

    @Autowired
    public UserDao(JdbcTemplate jdbcTemplate, TenantDao tenantDao){
        this.jdbcTemplate=jdbcTemplate;
        this.tenantDao = tenantDao;
    }

    public int addUser(UserRequestDto user, String tenantName){
        Tenant tenant = tenantDao.getTenant(tenantName);
        String sql = "INSERT INTO users(username,loggedin,created_by,updated_at,updated_by,time_zone,tenant_id) VALUES (?,?,?,?,?,?,?)";
        int res = jdbcTemplate.update(sql,user.getUsername(),0,user.getCreatedBy(), Timestamp.valueOf(LocalDateTime.now()),user.getUpdatedBy(),user.getTimeZone(),tenant.getTenantId());
        log.info("User added successful...");
        return res;
    }

    public Users getUser(String name){
        String sql = "SELECT * FROM users WHERE username = ?";
        return jdbcTemplate.queryForObject(sql,new UserRowMapper(),name);
    }

    public List<Users> getAllUsers(){
        String sql = "SELECT * FROM users";
        return jdbcTemplate.query(sql,new UserRowMapper());
    }

}
