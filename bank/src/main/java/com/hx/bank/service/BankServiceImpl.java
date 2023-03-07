package com.hx.bank.service;

import com.hx.bank.auth.NotSuchUserException;
import com.hx.bank.entity.Account;
import com.hx.bank.entity.Transaction;
import com.hx.bank.entity.User;
import com.hx.bank.model.*;
import com.hx.bank.repository.AccountRepository;
import com.hx.bank.repository.TransactionRepository;
import com.hx.bank.model.TransactionSet;
import com.hx.bank.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BankServiceImpl implements BankService {
    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final String BRANCHNO = "3722 5673-";


    private String currentUserLoginName() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        return authentication.getName();
    }
    public User createUser(User user) {
        return userRepository.save(user);
    }

    public List<Account> displayAccountsByUserId(int userId) {
        User user = userRepository.findById(userId).orElseThrow();
        if (!user.getLoginname().equals(currentUserLoginName()))
            throw new NoAccessException();
        List<Account> accountList = accountRepository.findAllByUser(user);

        return accountList;
    }

    public User displayUser(int userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (!user.getLoginname().equals(currentUserLoginName()))
            throw new NoAccessException();
        return user;
    }

    public Account createAccount(Account account) {
        User user = userRepository.findById(account.getUser().getId())
                .orElseThrow(() -> new NotSuchUserException());
        if (!user.getLoginname().equals(currentUserLoginName()))
            throw new NoAccessException();

        generateAccountNameAndNumber(account);
        account.setBalance(new BigDecimal("0"));
        account.setStatus(Status.ACTIVE);
        account.setUser(user);
        account.setOpendate(new Date());
        return accountRepository.save(account);
    }

    private void generateAccountNameAndNumber(Account account) {
        Long n = accountRepository.countByUserAndType(account.getUser().getId(), account.getType().name());
        n = getIncrementOne(n);
        if (account.getName() == null || account.getName().equals(""))
            account.setName(account.getType().name().toLowerCase() +  n);
        n = accountRepository.getMaxId();
        n = getIncrementOne(n);
        String num = "";
        if (n < 10) {
            num = "00" + n;
        } else if (n < 100) {
            num = "0" + n;
        } else {
            num = n.toString();
        }
        account.setNumber(BRANCHNO + num);
    }

    private Long getIncrementOne(Long n) {
        if (n == null) {
            return 1L;
        } else {
            return n + 1;
        }
    }

    @Transactional
    public Transaction transfer(Transaction transaction) {
        transaction.setDescription("transfer money");
        Account accountFrom = accountRepository.findById(transaction.getFromaccount().getId()).orElseThrow();
        Account accountTo = accountRepository.findById(transaction.getToaccount().getId()).orElseThrow();
        if (!accountFrom.getUser().getLoginname().equals(currentUserLoginName()))
            throw new NoAccessException();

        if (accountFrom.equals(accountTo))
            throw new FromIsSameAsToException();

        if (transaction.getAmount().compareTo(accountFrom.getBalance()) > 0) {
            throw new BalanceLowException(accountFrom.getNumber());
        } else {
            accountFrom.setBalance(accountFrom.getBalance().subtract(transaction.getAmount()));
            accountTo.setBalance(accountTo.getBalance().add(transaction.getAmount()));
            accountRepository.save(accountFrom);
            accountRepository.save(accountTo);
        }
        return transactionRepository.save(transaction);
    }

    public Account displayAccountDetail(Long accountId) {
        Account account = accountRepository.findById(accountId).orElseThrow();
        if (!account.getUser().getLoginname().equals(currentUserLoginName()))
            throw new NoAccessException();
        return account;

    }

    public List<Transaction> displayTransactionsByAccountId(Long accountId) {
        Account account = accountRepository.findById(accountId).orElseThrow();
        if (!account.getUser().getLoginname().equals(currentUserLoginName()))
            throw new NoAccessException();
        return transactionRepository.findByFromaccount(account);
    }

    public List<TransactionSet> displayTransactionsByAccountId(Long accountId, int page, int size) {
        Account account = accountRepository.findById(accountId).orElseThrow();
        if (!account.getUser().getLoginname().equals(currentUserLoginName()))
            throw new NoAccessException();
        Pageable paging = PageRequest.of(page, size);
        return transactionRepository.findByFromaccount(account, paging);
    }

    @Transactional
    public Transaction depositOrWithdraw(Operation operation) {
        Transaction transaction = new Transaction();
        Account account = accountRepository.findById(operation.getAccountId()).orElseThrow();
        if (!account.getUser().getLoginname().equals(currentUserLoginName()))
            throw new NoAccessException();

        if (operation.getAction().equals(TransType.WITHDRAW)) {
            if (operation.getAmount().compareTo(account.getBalance()) > 0) {
                throw new BalanceLowException(account.getNumber());
            }
            account.setBalance(account.getBalance().subtract(operation.getAmount()));
        } else if (operation.getAction().equals(TransType.DEPOSIT)) {
            account.setBalance(account.getBalance().add(operation.getAmount()));
        } else throw new NotSuchActionException();
        transaction.setFromaccount(account);
        transaction.setType(operation.getAction());
        transaction.setAmount(operation.getAmount());
        transaction.setTransactiondate(new Date());
        transaction.setDescription("From counter.");
        transactionRepository.save(transaction);
        accountRepository.save(account);
        return transaction;

    }

    @Override
    public String sayHello() {
        return "hello";
    }
}
