package br.com.trustgame.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "perfil")
public class PerfilJogador implements Serializable{

	private static final long serialVersionUID = 3317339439073208844L;
	@SequenceGenerator(name = "SEQGENERATOR", sequenceName = "perfil_pkperfil_seq", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "SEQGENERATOR")

	@Id
	@Column(name = "pk_perfil", nullable = false)
	private int id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "fk_jogo")
	private ConfigJogo conifgJofo;

	@Column(name = "tipo_perfil", nullable = false)
	private String tipoPerfil;
	
	@Column(name = "saldo_acumulado", nullable = false)
	private float saldoAcumulado;
	
	@Column(name = "book", nullable = false)
	private boolean comBookKeeping;
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public ConfigJogo getConifgJofo() {
		return conifgJofo;
	}

	public void setConifgJofo(ConfigJogo conifgJofo) {
		this.conifgJofo = conifgJofo;
	}

	public String getTipoPerfil() {
		return tipoPerfil;
	}

	public void setTipoPerfil(String tipoPerfil) {
		this.tipoPerfil = tipoPerfil;
	}

	public float getSaldoAcumulado() {
		return saldoAcumulado;
	}

	public void setSaldoAcumulado(float saldoAcumulado) {
		this.saldoAcumulado = saldoAcumulado;
	}


	public void setComBookKeeping(boolean comBookKeeping) {
		this.comBookKeeping = comBookKeeping;
	}
}
