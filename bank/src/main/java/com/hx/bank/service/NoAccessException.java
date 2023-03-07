package com.hx.bank.service;

public class NoAccessException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	NoAccessException() {
		super("No access to other people's accounts.");
	}
}