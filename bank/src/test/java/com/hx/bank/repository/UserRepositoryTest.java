package com.hx.bank.repository;

import com.hx.bank.model.Role;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import com.hx.bank.entity.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.annotation.Rollback;

import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace.NONE;

@DataJpaTest
@AutoConfigureTestDatabase(replace = NONE)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final String LOGINNAME = "tomas";

    //JUnit test for save User
    @Test
    @Order(1)
    @Rollback(value = false)
    void saveUserTest() {
        User user = User.builder()
                .firstname("Tomas")
                .lastname("Francois")
                .email("Alice@mail.com")
                .phone("514-789 6754")
                .address("1234 Rue Matte Greenfield park QC Y1P 2S4")
                .loginname(LOGINNAME)
                .password("password")
                .opendate(new Date())
                .role(Role.USER)
                .build();
        userRepository.save(user);

        assertTrue(user.getId() > 0);
    }

    @Test
    @Order(2)
    void findByLoginNameTest() {
        assertNotNull(userRepository);
        User user = userRepository.findByLoginname(LOGINNAME).orElse(null);
        assertEquals(user.getLoginname(), LOGINNAME);

    }

    @Test
    @Order(3)
    void getListOfUsersTest() {
        List<User> userList = userRepository.findAll();

        assertTrue(userList.size() >= 1);
    }

    @Test
    @Order(4)
    @Rollback(value = false)
    void clean() {
        jdbcTemplate.update("delete from user where loginname='" + LOGINNAME + "'");

    }


}