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
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "perfil")
public class BookKepping implements Serializable{

	private static final long serialVersionUID = 3317339439073208844L;
	@SequenceGenerator(name = "SEQGENERATOR", sequenceName = "book_pkbook_seq", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "SEQGENERATOR")

	@Id
	@Column(name = "pk_book", nullable = false)
	private int id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "fk_usuario")
	private Usuario usuario;
	
	@Column(name = "book", nullable = false)
	private String book;

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

	public String getBook() {
		return book;
	}

	public void setBook(String book) {
		this.book = book;
	}

}
