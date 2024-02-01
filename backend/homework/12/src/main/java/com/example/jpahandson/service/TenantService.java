package com.example.jpahandson.service;

import com.example.jpahandson.dao.TenantDao;
import com.example.jpahandson.model.Tenant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TenantService {

    TenantDao tenantDao;

    @Autowired
    public TenantService(TenantDao tenantDao){
        this.tenantDao=tenantDao;
    }

    public List<Tenant> getAllTenants(){
        return tenantDao.getAllTenants();
    }

    public Tenant addTenant(Tenant tenant){
        return  tenantDao.addTenant(tenant);
    }
}
