package br.com.trustgame.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.trustgame.model.AtuacaoProfissional;
import br.com.trustgame.model.FormacaoAcademica;



@Repository
public interface FormacaoAcademicaRepository extends JpaRepository<FormacaoAcademica, Integer> {
	
	@Query("select fa from FormacaoAcademica fa order by fa.nome")
	List<FormacaoAcademica> findAll();

} 
 