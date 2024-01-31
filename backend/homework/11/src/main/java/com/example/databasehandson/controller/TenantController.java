package com.example.databasehandson.controller;

import com.example.databasehandson.dto.request.AllCreateDto;
import com.example.databasehandson.entity.Tenant;
import com.example.databasehandson.service.TenantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TenantController {

    TenantService tenantService;

    public TenantController(TenantService tenantService){
        this.tenantService=tenantService;
    }
    @GetMapping("/test")
    public ResponseEntity<String> test(){
        return ResponseEntity.ok("Test api");
    }

    @PostMapping("/all")
    public ResponseEntity<String> createAll(@RequestBody AllCreateDto allCreateDto){
        tenantService.addAll(allCreateDto);
        return ResponseEntity.ok("All Tables modified successfully");
    }

    @GetMapping("tenants/all")
    public ResponseEntity<List<Tenant>> getAllTenants(){
        return ResponseEntity.ok(tenantService.getAllTenants());
    }

}
