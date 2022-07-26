package com.tis.user.model;

public class NotUserException extends Exception{
	public NotUserException() {
		super("아이디 또는 패스워드가 일치하지 않습니다");
	}
	public NotUserException(String msg) {
		super(msg);
	}
}
