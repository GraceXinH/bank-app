package com.hx.bank.service;

public class FromIsSameAsToException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	FromIsSameAsToException() {
		super("From account is same as to account.");
	}
}