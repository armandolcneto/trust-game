package br.com.trustgame.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "jogo")
public class ConfigJogo implements Serializable{

	private static final long serialVersionUID = 3317339439073208844L;
	@SequenceGenerator(name = "SEQGENERATOR", sequenceName = "jogo_pkjogo_seq", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "SEQGENERATOR")

	@Id
	@Column(name = "pk_jogo", nullable = false)
	private int id;

	@Column(name = "nome", nullable = false)
	private String nome;
	
	@Column(name = "tipo_jogo", nullable = false)
	private String tipoJogo;
	
	@Column(name = "montante_inicial", nullable = false)
	private float montante;
	
	@Column(name = "qtd_pessoas", nullable = false)
	private Integer qtdpessoas;
	
	@Column(name = "multiplicador", nullable = false)
	private Integer mutiplicador;
	
	@Column(name = "conversao_moeda", nullable = false)
	private float conversaoMoeda;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTipoJogo() {
		return tipoJogo;
	}

	public void setTipoJogo(String tipoJogo) {
		this.tipoJogo = tipoJogo;
	}

	public float getMontante() {
		return montante;
	}

	public void setMontante(float montante) {
		this.montante = montante;
	}

	public Integer getQtdpessoas() {
		return qtdpessoas;
	}

	public void setQtdpessoas(Integer qtdpessoas) {
		this.qtdpessoas = qtdpessoas;
	}

	public Integer getMutiplicador() {
		return mutiplicador;
	}

	public void setMutiplicador(Integer mutiplicador) {
		this.mutiplicador = mutiplicador;
	}

	public float getConversaoMoeda() {
		return conversaoMoeda;
	}

	public void setConversaoMoeda(float conversaoMoeda) {
		this.conversaoMoeda = conversaoMoeda;
	}
	
}
