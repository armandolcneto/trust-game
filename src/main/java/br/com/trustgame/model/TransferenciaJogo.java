package br.com.trustgame.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "transferencia")
public class TransferenciaJogo implements Serializable{

	private static final long serialVersionUID = 3317339439073208844L;
	@SequenceGenerator(name = "SEQGENERATOR", sequenceName = "transferencia_pktransferencia_seq", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "SEQGENERATOR")

	@Id
	@Column(name = "pk_transferencia", nullable = false)
	private int id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "jogador")
	private Usuario usuario;
	
	@Column(name = "envio_jogador", nullable = false)
	private float envioJogador;
	
//	public Integer getUsuario() {
//		return usuario;
//	}
//
//	public void setUsuario(Integer usuario) {
//		this.usuario = usuario;
//	}

	@Column(name = "tempo_envio_jogador", nullable = false)
	private Integer tempo;
	
	@Column(name = "round_jogo", nullable = false)
	private Integer roundJogo;
	
	@Column(name = "tipo_jogador", nullable = false)
	private String tipoJogador;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	
	public float getEnvioJogador() {
		return envioJogador;
	}

	public void setEnvioJogador(float envioJogador) {
		this.envioJogador = envioJogador;
	}

	public Integer getTempo() {
		return tempo;
	}

	public void setTempo(Integer tempo) {
		this.tempo = tempo;
	}

	public Integer getRoundJogo() {
		return roundJogo;
	}

	public void setRoundJogo(Integer roundJogo) {
		this.roundJogo = roundJogo;
	}

	public String getTipoJogador() {
		return tipoJogador;
	}

	public void setTipoJogador(String tipoJogador) {
		this.tipoJogador = tipoJogador;
	}

}
