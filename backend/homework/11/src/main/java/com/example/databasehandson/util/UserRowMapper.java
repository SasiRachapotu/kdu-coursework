package com.example.databasehandson.util;

import com.example.databasehandson.entity.Users;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserRowMapper implements RowMapper<Users> {
    @Override
    public Users mapRow(ResultSet rs, int rowNum) throws SQLException {
        Users user = new Users();
        user.setId(rs.getString("id"));
        user.setUsername(rs.getString("username"));
        user.setLoggedIn(rs.getInt("loggedin"));
        user.setTenantId(rs.getString("tenant_id"));
        user.setTimeZone(rs.getString("time_zone"));
        return user;
    }
}
