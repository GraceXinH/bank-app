package com.hx.bank.service;

import com.hx.bank.entity.Account;
import com.hx.bank.entity.Transaction;
import com.hx.bank.entity.User;
import com.hx.bank.model.*;
import com.hx.bank.repository.AccountRepository;
import com.hx.bank.repository.TransactionRepository;
import com.hx.bank.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;


import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@WithMockUser(username = "tomas", authorities = { "USER" })
class BankServiceImplTest {
    @InjectMocks
    private BankServiceImpl bankService;
    @Mock
    private UserRepository userRepository;
    @Mock
    private AccountRepository accountRepository;
    @Mock
    private TransactionRepository transactionRepository;

    @Test
    void testCreateUserAndDisplay() {

        User user = User.builder()
                .id(1)
                .firstname("Tomas")
                .lastname("Francois")
                .email("Alice@mail.com")
                .phone("514-789 6754")
                .address("1234 Rue Matte Greenfield park QC Y1P 2S4")
                .loginname("tomas")
                .password("password")
                .opendate(new Date())
                .role(Role.USER)
                .build();
        Mockito.when(userRepository.findById(1)).thenReturn(Optional.ofNullable(user));
        Mockito.when(userRepository.save(user)).thenReturn(user);
        user = bankService.createUser(user);

        User retrieveUser = bankService.displayUser(1);
        assertEquals(user, retrieveUser);
    }

    @Test
    void displayAccountsByUserId() {
        User user = User.builder()
                .id(1)
                .firstname("Tomas")
                .lastname("Francois")
                .email("Alice@mail.com")
                .phone("514-789 6754")
                .address("1234 Rue Matte Greenfield park QC Y1P 2S4")
                .loginname("tomas")
                .password("password")
                .opendate(new Date())
                .role(Role.USER)
                .build();
        Mockito.when(userRepository.findById(1)).thenReturn(Optional.ofNullable(user));
        Account account = Account.builder()
                .id(1L)
                .type(AccountType.CHEQUING)
                .status(Status.ACTIVE)
                .opendate(new Date())
                .user(user)
                .build();
        Account account1 = Account.builder()
                .id(1L)
                .name("check1")
                .number(5673001L)
                .balance(new BigDecimal(0))
                .type(AccountType.CHEQUING)
                .status(Status.ACTIVE)
                .opendate(new Date())
                .user(user)
                .build();
        Mockito.when(accountRepository.save(account)).thenReturn(account1);
        Mockito.when(accountRepository.countByUserAndType(user.getId(), AccountType.CHEQUING.name()))
                .thenReturn(0L);
        Mockito.when(accountRepository.getMaxId()).thenReturn(0L);
        Account result = bankService.createAccount(account);

        assertEquals(account1, result);
        //display account detail
        Mockito.when(accountRepository.findById(1L)).thenReturn(Optional.of(account1));
        result = bankService.displayAccountDetail(1L);
        assertEquals(account1, result);
    }

    @Test
    void transfer() {
        User user = User.builder()
                .id(1)
                .firstname("Tomas")
                .lastname("Francois")
                .email("Tomas@mail.com")
                .phone("514-789 6752")
                .address("1234 Rue Matte Greenfield park QC Y1P 2S4")
                .loginname("tomas")
                .password("password")
                .opendate(new Date())
                .role(Role.USER)
                .build();
        Mockito.when(userRepository.findById(1)).thenReturn(Optional.ofNullable(user));
        User user1 = User.builder()
                .id(2)
                .firstname("Alice")
                .lastname("Francois")
                .email("Alice@mail.com")
                .phone("514-789 6754")
                .address("1234 Rue Matte Greenfield park QC Y1P 2S4")
                .loginname("alice")
                .password("password")
                .opendate(new Date())
                .role(Role.USER)
                .build();
        Mockito.when(userRepository.findById(2)).thenReturn(Optional.ofNullable(user1));
        Account fromAccount = Account.builder()
                .id(1L)
                .name("check1")
                .number(5673001L)
                .balance(new BigDecimal(120))
                .type(AccountType.CHEQUING)
                .status(Status.ACTIVE)
                .opendate(new Date())
                .user(user)
                .build();
        Account toAccount = Account.builder()
                .id(2L)
                .name("saving1")
                .number(5673002L)
                .balance(new BigDecimal(0))
                .type(AccountType.SAVING)
                .status(Status.ACTIVE)
                .opendate(new Date())
                .user(user)
                .build();
        Account otherAccount = Account.builder()
                .id(2L)
                .name("saving11")
                .number(5673012L)
                .balance(new BigDecimal(200))
                .type(AccountType.SAVING)
                .status(Status.ACTIVE)
                .opendate(new Date())
                .user(user1)
                .build();
        Mockito.when(accountRepository.findById(1L)).thenReturn(Optional.ofNullable(fromAccount));
        Mockito.when(accountRepository.findById(2L)).thenReturn(Optional.ofNullable(toAccount));
        Transaction transaction = Transaction.builder()
                .id(1L)
                .amount(new BigDecimal(60))
                .fromaccount(fromAccount)
                .toaccount(toAccount)
                .type(TransType.TRANS)
                .build();
        Transaction transaction1 = Transaction.builder()
                .id(1L)
                .amount(new BigDecimal(60))
                .fromaccount(fromAccount)
                .toaccount(toAccount)
                .description("transfer money")
                .type(TransType.TRANS)
                .build();
        Mockito.when(transactionRepository.save(transaction)).thenReturn(transaction1);
        Transaction result = bankService.transfer(transaction);

        assertEquals(transaction1, result);
        assertEquals(new BigDecimal(60), fromAccount.getBalance());
    }


    @Test
    void displayTransactionsByAccountId() {
        User user = User.builder()
                .id(1)
                .firstname("Tomas")
                .lastname("Francois")
                .email("Tomas@mail.com")
                .phone("514-789 6752")
                .address("1234 Rue Matte Greenfield park QC Y1P 2S4")
                .loginname("tomas")
                .password("password")
                .opendate(new Date())
                .role(Role.USER)
                .build();
        Mockito.when(userRepository.findById(1)).thenReturn(Optional.ofNullable(user));
        User user1 = User.builder()
                .id(2)
                .firstname("Alice")
                .lastname("Francois")
                .email("Alice@mail.com")
                .phone("514-789 6754")
                .address("1234 Rue Matte Greenfield park QC Y1P 2S4")
                .loginname("alice")
                .password("password")
                .opendate(new Date())
                .role(Role.USER)
                .build();
        Mockito.when(userRepository.findById(2)).thenReturn(Optional.ofNullable(user1));
        Account fromAccount = Account.builder()
                .id(1L)
                .name("check1")
                .number(5673001L)
                .balance(new BigDecimal(120))
                .type(AccountType.CHEQUING)
                .status(Status.ACTIVE)
                .opendate(new Date())
                .user(user)
                .build();
        Account toAccount = Account.builder()
                .id(2L)
                .name("saving1")
                .number(5673002L)
                .balance(new BigDecimal(0))
                .type(AccountType.SAVING)
                .status(Status.ACTIVE)
                .opendate(new Date())
                .user(user)
                .build();
        Account otherAccount = Account.builder()
                .id(2L)
                .name("saving11")
                .number(5673012L)
                .balance(new BigDecimal(200))
                .type(AccountType.SAVING)
                .status(Status.ACTIVE)
                .opendate(new Date())
                .user(user1)
                .build();
        Mockito.when(accountRepository.findById(1L)).thenReturn(Optional.ofNullable(fromAccount));
        Mockito.when(accountRepository.findById(2L)).thenReturn(Optional.ofNullable(toAccount));
        Transaction transaction = Transaction.builder()
                .id(1L)
                .amount(new BigDecimal(60))
                .fromaccount(fromAccount)
                .toaccount(toAccount)
                .type(TransType.TRANS)
                .build();
        Transaction transaction1 = Transaction.builder()
                .id(1L)
                .amount(new BigDecimal(60))
                .fromaccount(fromAccount)
                .toaccount(toAccount)
                .description("transfer money")
                .type(TransType.TRANS)
                .build();
        List<Transaction> list = new ArrayList<>();
        list.add(transaction1);
        Mockito.when(transactionRepository.findByFromaccountOrderByIdAsc(fromAccount)).thenReturn(list);
        List<TransactionModel> result = bankService.displayTransactionsByAccountId(1L);

        assertEquals(list.size(), result.size());
        assertEquals(fromAccount.getNumber(), result.get(0).getFromAccount());

    }

    @Test
    void depositOrWithdraw() {
        User user = User.builder()
                .id(1)
                .firstname("Tomas")
                .lastname("Francois")
                .email("Tomas@mail.com")
                .phone("514-789 6752")
                .address("1234 Rue Matte Greenfield park QC Y1P 2S4")
                .loginname("tomas")
                .password("password")
                .opendate(new Date())
                .role(Role.USER)
                .build();
        Mockito.when(userRepository.findById(1)).thenReturn(Optional.ofNullable(user));
        User user1 = User.builder()
                .id(2)
                .firstname("Alice")
                .lastname("Francois")
                .email("Alice@mail.com")
                .phone("514-789 6754")
                .address("1234 Rue Matte Greenfield park QC Y1P 2S4")
                .loginname("alice")
                .password("password")
                .opendate(new Date())
                .role(Role.USER)
                .build();
        Mockito.when(userRepository.findById(2)).thenReturn(Optional.ofNullable(user1));
        Account fromAccount = Account.builder()
                .id(1L)
                .name("check1")
                .number(5673001L)
                .balance(new BigDecimal(120))
                .type(AccountType.CHEQUING)
                .status(Status.ACTIVE)
                .opendate(new Date())
                .user(user)
                .build();
        Transaction transaction = Transaction.builder()
                .id(1L)
                .amount(new BigDecimal(60))
                .fromaccount(fromAccount)
                .type(TransType.DEPOSIT)
                .build();
        Transaction transaction1 = Transaction.builder()
                .id(1L)
                .amount(new BigDecimal(60))
                .fromaccount(fromAccount)
                .description("From counter.")
                .type(TransType.DEPOSIT)
                .build();
        Mockito.when(accountRepository.findById(1L)).thenReturn(Optional.ofNullable(fromAccount));
        Mockito.when(transactionRepository.save(transaction1)).thenReturn(transaction1);
        Operation operation = new Operation();
        operation.setAccountId(fromAccount.getId());
        operation.setAmount(new BigDecimal(60));
        operation.setAction(TransType.DEPOSIT);
        Transaction result = bankService.depositOrWithdraw(operation);

        assertEquals(new BigDecimal(180), fromAccount.getBalance());
    }
}