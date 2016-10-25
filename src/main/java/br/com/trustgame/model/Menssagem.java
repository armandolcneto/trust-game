package br.com.trustgame.model;

public class Menssagem {

    private String valorEnviado;
    private String user;

    public Menssagem() {
    }

    public Menssagem(String valorEnviado, String user) {
        this.valorEnviado = valorEnviado;
        this.user = user;
    }

    public String getvalorEnviado() {
        return valorEnviado;
    }

    public void setName(String valorEnviado) {
        this.valorEnviado = valorEnviado;
    }
    
    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }
}