package br.com.trustgame.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.trustgame.model.ConfigJogo;



@Repository
public interface ConfigJogoRepository extends JpaRepository<ConfigJogo, Integer> {
	
	@Query("select cj from ConfigJogo cj order by cj.id desc")
	List<ConfigJogo> findAll();

} 
 