package com.hx.bank.service;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ServiceAdvice {

    @ResponseBody
    @ExceptionHandler({NotFoundException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String NotFoundHandler(NotFoundException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ExceptionHandler({NotSuchActionException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String NotSuchActionExceptionHandler(NotSuchActionException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ExceptionHandler({NoAccessException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String NoAccessExceptionHandler(NoAccessException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ExceptionHandler
    @ResponseStatus(HttpStatus.NOT_IMPLEMENTED)
    String OtherHandler(Exception ex) {
        ex.printStackTrace();
        return ex.getMessage();
    }
}
