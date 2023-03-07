package com.hx.bank.model;

import java.math.BigDecimal;
import java.util.Date;

public interface TransactionSet {
    Integer getId();
    TransType getType();
    BigDecimal getAmount();
    Date getTransactionDate();
    String getDescription();
    Integer getFromAccount();
    Integer getToAccount();


    default String getString(){
        return "getId=" + getId()+";" +
                "getAmount=" + getAmount();
    }
}
