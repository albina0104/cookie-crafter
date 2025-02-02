package com.albinasalkayeva.cookie_crafter;

public class ApiErrorResponse {
    private int errorCode;
    private String errorMessage;

    public int getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(int errorCode) {
        this.errorCode = errorCode;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public ApiErrorResponse() {
    }

    public ApiErrorResponse(int statusCode, String message) {
        this.errorCode = statusCode;
        this.errorMessage = message;
    }
}
