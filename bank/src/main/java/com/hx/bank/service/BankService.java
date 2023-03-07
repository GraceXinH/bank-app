package com.hx.bank.service;

import com.hx.bank.entity.Account;
import com.hx.bank.entity.Transaction;
import com.hx.bank.entity.User;
import com.hx.bank.model.Operation;
import com.hx.bank.model.TransactionSet;
import java.util.List;

public interface BankService {
    User createUser(User user);

    List<Account> displayAccountsByUserId(int userId);

    User displayUser(int userId);

    Account createAccount(Account account);

    Transaction transfer(Transaction transaction);

    Account displayAccountDetail(Long accountId);

    List<Transaction> displayTransactionsByAccountId(Long accountId);

    List<TransactionSet> displayTransactionsByAccountId(Long accountId, int page, int size);

    Transaction depositOrWithdraw(Operation operation);

    String sayHello();
}
