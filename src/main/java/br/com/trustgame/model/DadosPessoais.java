package br.com.trustgame.model;

import java.io.Serializable;
import java.sql.Date;

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
@Table(name = "dados_pessoais")
public class DadosPessoais implements Serializable{

	private static final long serialVersionUID = 3317339439073208844L;
	@SequenceGenerator(name = "SEQGENERATOR", sequenceName = "pessoa_pkpessoa_seq", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "SEQGENERATOR")

	@Id
	@Column(name = "pk_dados_pessoais", nullable = false)
	private int id;

	@Column(name = "nome", nullable = false)
	private String nome;
	
	@Column(name = "data_nascimento", nullable = false)
	private Date dataNascimento;
	
	@Column(name = "sexo", nullable = false)
	private String sexo;
	
	@Column(name = "experiencia_profisional", nullable = false)
	private Integer experiencia;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "fk_formacao")
	private FormacaoAcademica formacaoAcedemica;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "fk_profissao")
	private AtuacaoProfissional atuacaoProfissional;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "fk_perfil")
	private PerfilJogador perfilJogador;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getSexo() {
		return sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

	public Integer getExperiencia() {
		return experiencia;
	}

	public void setExperiencia(Integer experiencia) {
		this.experiencia = experiencia;
	}

	public FormacaoAcademica getFormacaoAcedemica() {
		return formacaoAcedemica;
	}

	public void setFormacaoAcedemica(FormacaoAcademica formacaoAcedemica) {
		this.formacaoAcedemica = formacaoAcedemica;
	}

	public AtuacaoProfissional getAtuacaoProfissional() {
		return atuacaoProfissional;
	}

	public void setAtuacaoProfissional(AtuacaoProfissional atuacaoProfissional) {
		this.atuacaoProfissional = atuacaoProfissional;
	}

	public PerfilJogador getPerfilJogador() {
		return perfilJogador;
	}

	public void setPerfilJogador(PerfilJogador perfilJogador) {
		this.perfilJogador = perfilJogador;
	}

	public Date getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(Date dataNascimento) {
		this.dataNascimento = dataNascimento;
	}	
	
}
