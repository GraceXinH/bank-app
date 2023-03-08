package com.hx.bank.repository;

import com.hx.bank.entity.Account;
import java.util.List;
import java.util.Optional;

import com.hx.bank.entity.User;
import com.hx.bank.model.AccountType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    List<Account> findAllByUser(User user);

    @Query(value = "SELECT COUNT(*) FROM accounts WHERE userid=:userId and type=:type", nativeQuery = true)
    Long countByUserAndType(int userId, String type);

    @Query(value = "SELECT IFNULL(MAX(id), 0) FROM accounts ", nativeQuery = true)
    Long getMaxId();


}
