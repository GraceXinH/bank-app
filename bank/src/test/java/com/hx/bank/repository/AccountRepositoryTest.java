package com.hx.bank.repository;

import com.hx.bank.entity.Account;
import com.hx.bank.entity.User;
import com.hx.bank.model.AccountType;
import com.hx.bank.model.Status;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.jdbc.Sql;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace.NONE;

@DataJpaTest
@AutoConfigureTestDatabase(replace = NONE)
class AccountRepositoryTest {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Test
    @Sql({"/import_users.sql"})
    void findAllByUser() {
        User user = userRepository.findByLoginname("alice").orElse(null);

        Account account = new Account();
        account.setUser(user);
        account.setName("check1");
        account.setNumber(8641001L);
        account.setType(AccountType.CHEQUING);
        account.setBalance(new BigDecimal("0"));
        account.setOpendate(new Date());
        account.setStatus(Status.ACTIVE);
        accountRepository.save(account);

        List<Account> accounts = accountRepository.findAllByUser(user);
        assertNotNull(accounts);
        assertTrue(accounts.contains(account));

        Account retrieveAccount = accountRepository.findById(account.getId()).orElseThrow();
        assertEquals(account, retrieveAccount);
    }
}