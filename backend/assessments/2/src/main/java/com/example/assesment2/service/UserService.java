package com.example.assesment2.service;

import com.example.assesment2.dto.request.RequestAddressDto;
import com.example.assesment2.dto.request.UserRequestDto;
import com.example.assesment2.dto.response.OrderDto;
import com.example.assesment2.entity.Address;
import com.example.assesment2.entity.Cart;
import com.example.assesment2.entity.Product;
import com.example.assesment2.entity.Users;
import com.example.assesment2.repository.AddressRepository;
import com.example.assesment2.repository.CartRepository;
import com.example.assesment2.repository.ProductRepository;
import com.example.assesment2.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    UserRepository userRepository;
    CartRepository cartRepository;
    AddressRepository addressRepository;

    ProductRepository productRepository;

    @Autowired
    public UserService(UserRepository userRepository, CartRepository cartRepository,AddressRepository addressRepository,ProductRepository productRepository){
        this.userRepository=userRepository;
        this.cartRepository=cartRepository;
        this.addressRepository=addressRepository;
        this.productRepository = productRepository;
    }

    public Users addUser(UserRequestDto userRequestDto){
        Users user = new Users();
        user.setFullName(userRequestDto.getFullName());
        user.setEmail(userRequestDto.getEmail());
        user.setPassword(userRequestDto.getPassword());
        Cart cart = new Cart();
        cart.setProducts(new ArrayList<>());
        cartRepository.save(cart);
        ArrayList<Address> addresses = new ArrayList<>();
        for(RequestAddressDto address: userRequestDto.getAddresses()){
            Address address1 = new Address();
            address1.setCity(address.getCity());
            address1.setNickname(address.getNickname());
            address1.setPostalCode(address.getPostalCode());
            address1.setState(address.getState());
            addressRepository.save(address1);
            addresses.add(address1);
        }
        user.setAddresses(addresses);
        user.setCart(cart);
        return userRepository.save(user);
    }

    public List<Users> getAllUsers(){
        return userRepository.findAll();
    }

    public void updateUserById(Integer id,Users user){
        Users user1= userRepository.getReferenceById(id);
        user1.setEmail(user.getEmail());
        user1.setFullName(user.getFullName());
        user1.setPassword(user.getPassword());
        userRepository.save(user1);
    }

    public void addAddress(Integer id, Address address){
        Users user1= userRepository.getReferenceById(id);
        List<Address> temp=user1.getAddresses();
        addressRepository.save(address);
        temp.add(address);
        user1.setAddresses(temp);
        userRepository.save(user1);
    }

    public void updateAddress(Integer addressId, Address address){
        Address address1 = addressRepository.getReferenceById(addressId);
        address1.setState(address.getState());
        address1.setPostalCode(address.getPostalCode());
        address1.setStreet(address.getStreet());
        address1.setCity(address.getCity());
        address1.setNickname(address.getNickname());
        addressRepository.save(address1);
    }

    public void addItemToCart(Integer userId,Integer productId){
        Users user = userRepository.getReferenceById(userId);
        Cart cart = user.getCart();
        Cart cart1 = cartRepository.getReferenceById(cart.getId());
        Product product = productRepository.getReferenceById(productId);
        List<Product> products = cart.getProducts();
        products.add(product);
        cart.setProducts(products);
        cart1.setProducts(products);
        cartRepository.save(cart1);
        userRepository.save(user);
    }

    public List<Product> getAllItemsInCart(Integer id){
        Users user = userRepository.getReferenceById(id);
        return user.getCart().getProducts();
    }

    public OrderDto placeOrder(Integer id){
        Users user = userRepository.getReferenceById(id);
        List<Product> products = user.getCart().getProducts();
        Address address = user.getAddresses().get(0);
        OrderDto orderDto = new OrderDto();
        orderDto.setDate(LocalDate.now());
        Double amount=0.0;
        for(Product product: products){
            amount+=product.getPrice();
            Product temp =productRepository.getReferenceById(product.getId());
            temp.setStock(temp.getStock()-1);
            productRepository.save(temp);
        }

        orderDto.setAmount(amount);
        orderDto.setAddress(address);
        Cart cart = user.getCart();
        Cart temp = cartRepository.getReferenceById(cart.getId());
        temp.setProducts(new ArrayList<>());
        cartRepository.save(temp);

        return orderDto;
    }
}
