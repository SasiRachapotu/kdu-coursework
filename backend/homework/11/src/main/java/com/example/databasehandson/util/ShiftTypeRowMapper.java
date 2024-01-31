package com.example.databasehandson.util;

import com.example.databasehandson.entity.ShiftType;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ShiftTypeRowMapper implements RowMapper<ShiftType> {
    @Override
    public ShiftType mapRow(ResultSet rs, int rowNum) throws SQLException {
        ShiftType shiftType = new ShiftType();
        shiftType.setId(rs.getString("id"));
        shiftType.setName(rs.getString("uq_name"));
        shiftType.setActive(rs.getBoolean("active"));
        shiftType.setDescription(rs.getString("description"));
        shiftType.setTenantId(rs.getString("tenant_id"));
        shiftType.setCreatedBy(rs.getString("created_by"));
        shiftType.setTimeZone(rs.getString("time_zone"));
        shiftType.setUpdatedAt(rs.getTimestamp("updated_at"));

        return shiftType;
    }
}
