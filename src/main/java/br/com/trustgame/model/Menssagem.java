package br.com.trustgame.model;

public class Menssagem {

    private String valorEnviado;
    private String user;
    private String saldo;

    public Menssagem() {
    }

    public Menssagem(String valorEnviado, String user, String saldo) {
        this.valorEnviado = valorEnviado;
        this.user = user;
        this.saldo = saldo;
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

	public String getSaldo() {
		return saldo;
	}

	public void setSaldo(String saldo) {
		this.saldo = saldo;
	}
    
}