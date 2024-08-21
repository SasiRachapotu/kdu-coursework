package com.example.jpahandson.dao;

import com.example.jpahandson.model.Tenant;
import com.example.jpahandson.repository.TenantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class TenantDao {
    TenantRepository tenantRepository;

    @Autowired
    public TenantDao(TenantRepository tenantRepository){
        this.tenantRepository=tenantRepository;
    }

    public List<Tenant> getAllTenants(){
        return tenantRepository.findAll();
    }

    public Tenant addTenant(Tenant tenant){
        return tenantRepository.save(tenant);
    }

    public Tenant findById(UUID id){
        return tenantRepository.getReferenceById(id);
    }
}
