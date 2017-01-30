package br.com.trustgame.model;

public class Menssagem {

    private String valorEnviado;
    private String id_perfil;
    private String nome;
    private String grupo;
    private String destino;
    private String book;
//    private String saldoRodada;

    public Menssagem() {
    }

    public Menssagem(String valorEnviado, String id_perfil, String nome, String grupo, String destino, String book) {
        this.valorEnviado = valorEnviado;
        this.id_perfil = id_perfil;
        this.nome = nome;
        this.grupo = grupo;
        this.destino = destino;
        this.book = book;
    }

	public String getValorEnviado() {
		return valorEnviado;
	}

	public void setValorEnviado(String valorEnviado) {
		this.valorEnviado = valorEnviado;
	}

	public String getId_perfil() {
		return id_perfil;
	}

	public void setId_perfil(String id_perfil) {
		this.id_perfil = id_perfil;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getGrupo() {
		return grupo;
	}

	public void setGrupo(String grupo) {
		this.grupo = grupo;
	}

	public String getDestino() {
		return destino;
	}

	public void setDestino(String destino) {
		this.destino = destino;
	}

	public String getBook() {
		return book;
	}

	public void setBook(String book) {
		this.book = book;
	}

//	public String getSaldoRodada() {
//		return saldoRodada;
//	}

//	public void setSaldoRodada(String saldoRodada) {
//		this.saldoRodada = saldoRodada;
//	}
	
}