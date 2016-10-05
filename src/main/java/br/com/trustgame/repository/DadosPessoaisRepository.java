package br.com.trustgame.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.trustgame.model.AtuacaoProfissional;
import br.com.trustgame.model.DadosPessoais;
import br.com.trustgame.model.FormacaoAcademica;



@Repository
public interface DadosPessoaisRepository extends JpaRepository<DadosPessoais, Integer> {
	
	@Query("select dp from DadosPessoais dp")
	List<DadosPessoais> findAll();

} 
 