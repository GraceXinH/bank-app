package com.hx.bank.service;

public class BalanceLowException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	BalanceLowException(String number) {
		super("No enough money, account number: " + number);
	}
}