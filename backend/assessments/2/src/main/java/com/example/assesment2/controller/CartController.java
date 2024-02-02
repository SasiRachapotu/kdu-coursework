package com.example.assesment2.controller;

import com.example.assesment2.dto.request.AddCartDto;
import com.example.assesment2.dto.response.OrderDto;
import com.example.assesment2.entity.Product;
import com.example.assesment2.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    UserService userService;

    public CartController(UserService userService){
        this.userService =userService;
    }

    @PostMapping("/add")
    public ResponseEntity<String> addProduct(@RequestBody AddCartDto addCartDto){
        userService.addItemToCart(addCartDto.getUserId(),addCartDto.getProductId());
        return ResponseEntity.ok("Item added to cart successfully");
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<Product>> getAll(@PathVariable Integer id){
        return ResponseEntity.ok(userService.getAllItemsInCart(id));
    }

    @GetMapping("/placeorder/{id}")
    public ResponseEntity<OrderDto> placeOrder(@PathVariable Integer id){
        OrderDto order = userService.placeOrder(id);
        return ResponseEntity.ok(order);
    }
}
