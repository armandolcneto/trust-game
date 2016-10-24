package br.com.trustgame.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.trustgame.model.TransferenciaJogo;
import br.com.trustgame.repository.TransferenciaJogoRepository;



@Service
public class TransferenciaJogoService {

	@Autowired
	private TransferenciaJogoRepository transferenciaJogoRepository;

	public List<TransferenciaJogo> getAll() {
		return transferenciaJogoRepository.findAll();
	}	
	
	public void transferencia(TransferenciaJogo transferenciaJogo){ 
		transferenciaJogoRepository.save(transferenciaJogo);
	}
}