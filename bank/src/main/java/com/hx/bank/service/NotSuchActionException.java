package com.hx.bank.service;

public class NotSuchActionException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	NotSuchActionException() {
		super("No such action.");
	}
}