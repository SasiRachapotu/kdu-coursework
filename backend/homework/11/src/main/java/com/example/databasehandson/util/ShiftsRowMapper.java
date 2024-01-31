package com.example.databasehandson.util;

import com.example.databasehandson.entity.Shift;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ShiftsRowMapper implements RowMapper<Shift> {
    @Override
    public Shift mapRow(ResultSet rs, int rowNum) throws SQLException {
        Shift shift = new Shift();
        shift.setId(rs.getString("id"));
        shift.setName(rs.getString("name"));
        return shift;
    }
}
