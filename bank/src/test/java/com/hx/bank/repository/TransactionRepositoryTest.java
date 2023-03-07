package com.hx.bank.repository;

import com.hx.bank.entity.Account;
import com.hx.bank.entity.Transaction;
import com.hx.bank.model.TransType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace.NONE;

@DataJpaTest
@AutoConfigureTestDatabase(replace = NONE)
class TransactionRepositoryTest {

    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private AccountRepository accountRepository;

    @Test
    @Sql({"/import_accounts.sql"})
    void findByFromAccount() {
        Account fromAccount = accountRepository.findById(1L).orElseThrow(); //balance:100
        Account toAccount = accountRepository.findById(2L).orElseThrow(); //balance:0
        Transaction transaction = new Transaction();
        transaction.setType(TransType.DEPOSIT);
        transaction.setAmount(new BigDecimal(30.0));
        transaction.setTransactiondate(new Date());
        transaction.setFromaccount(fromAccount);
        transaction.setToaccount(toAccount);
        transaction.setDescription("Deposit 30");
        transactionRepository.save(transaction);

        List<Transaction> list = transactionRepository.findByFromaccount(fromAccount);
        assertTrue(list.size() == 1);
        assertTrue(list.contains(transaction));

        Transaction transaction2 = new Transaction();
        transaction2.setType(TransType.TRANS);
        transaction2.setAmount(new BigDecimal(50.0));
        transaction2.setTransactiondate(new Date());
        transaction2.setFromaccount(fromAccount);
        transaction2.setToaccount(toAccount);
        transaction2.setDescription("Trans 50");
        transactionRepository.save(transaction2);

        list = transactionRepository.findByFromaccount(fromAccount);
        assertTrue(list.size() == 2);
        assertTrue(list.contains(transaction2));

    }


}