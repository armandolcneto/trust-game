package br.com.trustgame.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.trustgame.model.AtuacaoProfissional;



@Repository
public interface AtuacaoProfissionalRepository extends JpaRepository<AtuacaoProfissional, Integer> {
	
	@Query("select ap from AtuacaoProfissional ap order by ap.nome")
	List<AtuacaoProfissional> findAll();

} 
 