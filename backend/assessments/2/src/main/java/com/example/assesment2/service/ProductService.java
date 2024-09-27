package com.example.assesment2.service;


import com.example.assesment2.entity.Product;
import com.example.assesment2.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository){
        this.productRepository = productRepository;
    }

    public Product addProduct(Product product){
        return productRepository.save(product);
    }

    public void updateProduct(Integer id,Product product){
        Product product1=productRepository.getReferenceById(id);
        product1.setName(product.getName());
        product1.setPrice(product.getPrice());
        product1.setStock(product.getStock());
        productRepository.save(product1);
    }

    public List<Product> getAll(){
        return productRepository.findAll();
    }

    public void deleteById(Integer id){
        productRepository.deleteById(id);
    }

}
