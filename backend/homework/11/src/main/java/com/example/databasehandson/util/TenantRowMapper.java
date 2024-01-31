package com.example.databasehandson.util;

import com.example.databasehandson.entity.Tenant;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;


public class TenantRowMapper implements RowMapper<Tenant> {

    @Override
    public Tenant mapRow(ResultSet rs, int rowNum) throws SQLException {
        Tenant tenant = new Tenant();
        tenant.setTenantId(UUID.fromString(rs.getString("id")));
        tenant.setName(rs.getString("name"));
        tenant.setCreatedBy(rs.getString("created_by"));
        tenant.setUpdateBy(rs.getString("updated_by"));
        tenant.setUpdatedAt(rs.getTime("updated_at"));
        tenant.setTimeZone(rs.getString("time_zone"));
        return tenant;
    }
}
