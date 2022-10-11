package com.test.websockets;

/**
 * @author Anthony WEBSTER (AWE)
 * @since 11/10/2022
 */
public class ServerMessage<T> {

    private String type;
    private T body;

    public ServerMessage(String type, T body) {
        this.type = type;
        this.body = body;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public T getBody() {
        return body;
    }

    public void setBody(T body) {
        this.body = body;
    }
}
