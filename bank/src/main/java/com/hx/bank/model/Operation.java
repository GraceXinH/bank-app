package com.hx.bank.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class Operation {
    private Long accountId;
    private TransType action;
    private BigDecimal amount;

}
