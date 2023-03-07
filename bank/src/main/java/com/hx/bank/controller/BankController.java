package com.hx.bank.controller;

import com.hx.bank.entity.Account;
import com.hx.bank.entity.Transaction;
import com.hx.bank.entity.User;
import com.hx.bank.model.*;
import com.hx.bank.model.TransactionSet;
import com.hx.bank.service.BankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class BankController {

    @Autowired
    private BankService service;

    @PostMapping("/account")
    @ResponseStatus(HttpStatus.CREATED)
    public Account createAccount(@RequestBody Account account) {

        return service.createAccount(account);
    }

    @PostMapping("/operation")
    @ResponseStatus(HttpStatus.CREATED)
    public String depositOrWithdraw(@RequestBody Operation operation) {
        service.depositOrWithdraw(operation);
        return "Operation succeed.";
    }

    @PostMapping("/transfer")
    @ResponseStatus(HttpStatus.CREATED)
    public String transferMoney(@RequestBody Transaction transaction) {
        service.transfer(transaction);
        return "Transfer succeed.";
    }

    @GetMapping("/user/{userId}")
    public User displayUser(@PathVariable int userId) {
        User user = service.displayUser(userId);

        return user;
    }

    @GetMapping("/accounts/user/{userId}")
    public List<Account> displayAccountsByUserId(@PathVariable int userId) {
        List<Account> accountList = service.displayAccountsByUserId(userId);

        return accountList;
    }

    @GetMapping("/account/{accountId}")
    public Account displayAccountsDetailById(@PathVariable Long accountId) {
        return service.displayAccountDetail(accountId);
    }

    @GetMapping("/transaction/account/{accountId}")
    public List<Transaction> displayTransactionsByAccountId(@PathVariable Long accountId) {

        return service.displayTransactionsByAccountId(accountId);
    }

    @GetMapping("/transaction/account/p/{accountId}")
    public List<TransactionSet> displayTransactionsWithPaging(@PathVariable Long accountId,
                                                              @RequestParam int page, @RequestParam int size) {

        return service.displayTransactionsByAccountId(accountId, page, size);
    }
}
