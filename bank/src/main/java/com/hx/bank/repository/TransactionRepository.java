package com.hx.bank.repository;

import com.hx.bank.entity.Account;
import com.hx.bank.entity.Transaction;
import com.hx.bank.model.TransactionSet;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

    List<Transaction> findByFromaccountOrderByIdAsc(Account account);
    List<Transaction> findByToaccountOrderByIdAsc(Account account);
    List<TransactionSet> findByFromaccount(Account account, Pageable pageable);
    @Query(nativeQuery = true,
            value = """
                    select 
                        t.id AS id, 
                        t.type AS type,
                        t.amount AS amount, 
                        t.transactiondate AS transactiondate,
                        t.description AS description,
                        f.number fromAccount, 
                        q.number toAccount
                    from transactions t 
                    inner join accounts f on f.id = t.fromaccount
                    left join accounts q on q.id = t.toaccount
                    where t.fromaccount = :accountId
                    union
                                        select
                                            t.id AS id,
                                            t.type AS type,
                                            t.amount AS amount,
                                            t.transactiondate AS transactiondate,
                                            t.description AS description,
                                            f.number fromAccount,
                                            q.number toAccount
                                        from transactions t
                                        inner join accounts f on f.id = t.toaccount
                                        left join accounts q on q.id = t.fromaccount
                                        where t.toaccount = :accountId
                    """,
            countQuery = "select count(*) from transactions where fromaccount = :accountId or toaccount= :accountId")
    List<TransactionSet> retrieveTransactionsByAccountId(@Param("accountId") Long accountId, Pageable pageable);

    @Query(nativeQuery = true,
            value = """
                    select count(*) 
                    from transactions 
                    where fromaccount = :accountId 
                        or toaccount= :accountId
                    """)
    Integer retrieveTransactionsByAccountId(@Param("accountId") Long accountId);
}
