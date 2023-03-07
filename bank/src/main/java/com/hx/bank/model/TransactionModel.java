package com.hx.bank.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransactionModel implements TransactionSet {

    private Long id;
    private TransType type;
    private BigDecimal amount;
    private Date transactionDate;
    private String description;
    private Long fromAccount;
    private Long toAccount;

    @Override
    public String toString() {
        return "TransactionModel{" +
                "id=" + id +
                ", type=" + type +
                ", amount=" + amount +
                ", transactiondate=" + transactionDate +
                ", description='" + description + '\'' +
                ", fromaccount=" + fromAccount +
                ", toaccount=" + toAccount +
                '}';
    }
}
