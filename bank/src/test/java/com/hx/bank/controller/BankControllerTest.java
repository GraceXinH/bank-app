package com.hx.bank.controller;

import com.hx.bank.entity.Account;
import com.hx.bank.entity.Transaction;
import com.hx.bank.entity.User;
import com.hx.bank.model.*;
import com.hx.bank.repository.AccountRepository;
import com.hx.bank.repository.TransactionRepository;
import com.hx.bank.repository.UserRepository;

import com.hx.bank.service.BankServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Optional;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@WithMockUser(username = "jean", password = "password", authorities = {"USER"})
class BankControllerTest {

    @Autowired
    private WebApplicationContext context;
    @MockBean
    UserRepository userRepository;
    @MockBean
    private AccountRepository accountRepository;
    @MockBean
    private TransactionRepository transactionRepository;
    @InjectMocks
    private BankServiceImpl service;
    private MockMvc mvc;
    private User user;

    @BeforeEach
    public void setup() {
        mvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity())
                .build();
        user = User.builder()
                .id(1)
                .firstname("Jean")
                .lastname("Francois")
                .email("Jean@mail.com")
                .phone("514-789 6752")
                .address("1234 Rue Matte Greenfield park QC Y1P 2S4")
                .loginname("jean")
                .password("password")
                .opendate(new Date())
                .role(Role.USER)
                .build();
    }

    @Test
    void testCreateAccount() throws Exception {
        Mockito.when(userRepository.findByLoginname("jean")).thenReturn(Optional.ofNullable(user));
        Mockito.when(userRepository.findById(1)).thenReturn(Optional.ofNullable(user));
        Account account = Account.builder()
                .id(1L)
                .name("check1")
                .balance(new BigDecimal(0))
                .number("3722 5673-001")
                .type(AccountType.CHEQUING)
                .opendate(new Date())
                .status(Status.ACTIVE)
                .user(user)
                .build();
        Mockito.when(accountRepository.save(account)).thenReturn(account);
        mvc.perform(post("/api/account")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "user": {
                                        "id": 1
                                    },
                                                        
                                    "type": "CHECK",
                                    "opendate": "2023-01-03 10:20:00"
                                }
                                """)
                        .with(csrf())
                        .with(SecurityMockMvcRequestPostProcessors.user("jean"))
                )
                .andExpect(status().isCreated());

    }

    @Test
    void testDeposit() throws Exception {
        Account account = Account.builder()
                .id(1L)
                .name("check1")
                .balance(new BigDecimal(0))
                .number("3722 5673-001")
                .balance(new BigDecimal(20))
                .type(AccountType.CHEQUING)
                .opendate(new Date())
                .status(Status.ACTIVE)
                .user(user)
                .build();
        Account result = Account.builder()
                .id(1L)
                .name("check1")
                .balance(new BigDecimal(0))
                .number("3722 5673-001")
                .balance(new BigDecimal(70))
                .type(AccountType.CHEQUING)
                .opendate(new Date())
                .status(Status.ACTIVE)
                .user(user)
                .build();
        Mockito.when(accountRepository.findById(1L)).thenReturn(Optional.ofNullable(account));
        Mockito.when(accountRepository.save(result)).thenReturn(result);
        Transaction transaction = new Transaction();
        transaction.setFromaccount(account);
        transaction.setType(TransType.DEPOSIT);
        transaction.setAmount(new BigDecimal(50));
        transaction.setTransactiondate(new Date());
        transaction.setDescription("From counter.");
        Mockito.when(transactionRepository.save(transaction)).thenReturn(transaction);

        mvc.perform(post("/api/operation")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "accountId": 1,
                                    "action": "DEPOSIT",
                                    "amount": 50
                                }
                                """)
                        .with(csrf())
                        .with(SecurityMockMvcRequestPostProcessors.user("jean"))
                )
                .andExpect(status().isCreated());
    }


}