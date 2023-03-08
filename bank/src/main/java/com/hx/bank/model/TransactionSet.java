package com.hx.bank.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface TransactionSet {
    Long getId();
    TransType getType();
    BigDecimal getAmount();
    LocalDateTime getTransactiondate();
    String getDescription();
    Long getFromAccount();
    Long getToAccount();


    default String getString(){
        return "getId=" + getId()+";" +
                "getAmount=" + getAmount();
    }
}
