package com.hx.bank.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransactionModel implements TransactionSet {

    private Long id;
    private TransType type;
    private BigDecimal amount;
    private LocalDateTime transactiondate;
    private String description;
    private Long fromAccount;
    private Long toAccount;

    @Override
    public String toString() {
        return "TransactionModel{" +
                "id=" + id +
                ", type=" + type +
                ", amount=" + amount +
                ", transactiondate=" + transactiondate +
                ", description='" + description + '\'' +
                ", fromaccount=" + fromAccount +
                ", toaccount=" + toAccount +
                '}';
    }
}
