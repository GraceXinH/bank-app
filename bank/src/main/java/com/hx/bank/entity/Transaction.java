package com.hx.bank.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hx.bank.entity.Account;
import com.hx.bank.model.TransType;
import lombok.*;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Objects;

import static jakarta.persistence.FetchType.EAGER;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="transactions")
@Builder
public class Transaction{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "account_seq")
    @SequenceGenerator(name = "account_seq", allocationSize = 1)
    private Long id;
    @Column(nullable = false, length = 10)
    @Enumerated(EnumType.STRING)
    private TransType type;
    @Column(nullable = false)
    private BigDecimal amount;
    @Column(nullable = false)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date transactiondate;
    @Column(nullable = false, length = 100)
    private String description;

    @ManyToOne(fetch = EAGER)
    @JoinColumn(name="fromaccount", referencedColumnName = "id", nullable = true)
    private Account fromaccount;
    @ManyToOne(fetch = EAGER)
    @JoinColumn(name="toaccount", referencedColumnName = "id", nullable = true)
    private Account toaccount;

    @Override
    public String toString() {
        return "Transaction{" +
                "id=" + id +
                ", type='" + type + '\'' +
                ", amount=" + amount +
                ", transactiondate=" + transactiondate +
                ", description='" + description + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Transaction that = (Transaction) o;
        return Objects.equals(id, that.id) && type == that.type && Objects.equals(amount, that.amount) && Objects.equals(transactiondate, that.transactiondate) && Objects.equals(description, that.description) && Objects.equals(fromaccount, that.fromaccount) && Objects.equals(toaccount, that.toaccount);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, type, amount, transactiondate, description, fromaccount, toaccount);
    }
}
