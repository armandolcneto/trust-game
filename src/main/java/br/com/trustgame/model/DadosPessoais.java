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
@Table(name = "dados_pessoais")
public class DadosPessoais implements Serializable{

	private static final long serialVersionUID = 3317339439073208844L;
	@SequenceGenerator(name = "SEQGENERATOR", sequenceName = "pessoa_pkpessoa_seq", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "SEQGENERATOR")

	@Id
	@Column(name = "pk_pessoa", nullable = false)
	private int id;

	@Column(name = "nome")
	private String nome;
	
	@Column(name = "data_nascimento")
	private String dataNascimento;
	
	@Column(name = "sexo")
	private String sexo;
	
	@Column(name = "experiencia_profisional")
	private Integer experiencia;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "fk_formacao")
	private FormacaoAcademica formacaoAcedemica;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "fk_profissao")
	private AtuacaoProfissional atuacaoProfissional;

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

	public String getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(String dataNascimento) {
		this.dataNascimento = dataNascimento;
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
	
}
