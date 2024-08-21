package com.example.jpahandson.controller;

import com.example.jpahandson.model.Tenant;
import com.example.jpahandson.service.TenantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tenants")
public class TenantController {
    TenantService tenantService;

    @Autowired
    public TenantController(TenantService tenantService){
        this.tenantService=tenantService;
    }

    @GetMapping("")
    public ResponseEntity<List<Tenant>> getAll(){
        return ResponseEntity.ok(tenantService.getAllTenants());
    }

    @PostMapping("")
    public ResponseEntity<String > addTenant(@RequestBody Tenant tenant){
        tenantService.addTenant(tenant);
        return new ResponseEntity<>("Tenant added successfully..", HttpStatus.ACCEPTED);
    }
}
