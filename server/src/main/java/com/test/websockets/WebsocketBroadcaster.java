package com.test.websockets;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.AbstractWebSocketHandler;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

public class WebsocketBroadcaster {

    private final ObjectMapper objectMapper;
    private final WSHandler handler;

    public WebsocketBroadcaster(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
        this.handler = new WSHandler();
    }

    public WebSocketHandler getHandler() {
        return handler;
    }

    public void send(final ServerMessage<?> message) {
        try {
            TextMessage textMessage = new TextMessage(objectMapper.writeValueAsString(message));
            handler.sessions
                .forEach(session -> {
                    try {
                        session.sendMessage(textMessage);
                    } catch (IOException e) {
                        System.err.println("Unexpected error : " + e);
                    }
                });
        } catch (Throwable t) {
            System.err.println("Unexpected error : " + t);
        }
    }

    private static class WSHandler extends AbstractWebSocketHandler {

        private final List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();

        @Override
        public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) {
            throw new IllegalStateException("Builders web socket is unidirectional");
        }

        @Override
        public void afterConnectionEstablished(WebSocketSession session) {
            sessions.add(session);
        }

        @Override
        public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
            sessions.remove(session);
        }
    }
}
