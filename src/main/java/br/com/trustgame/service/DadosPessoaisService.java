package br.com.trustgame.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.trustgame.model.DadosPessoais;
import br.com.trustgame.repository.DadosPessoaisRepository;


@Service
public class DadosPessoaisService {

	@Autowired
	private DadosPessoaisRepository dadosPessoaisRepository;

	public List<DadosPessoais> getAll() {
		return dadosPessoaisRepository.findAll();
	}

public void mergeSetor(DadosPessoais setoresContato){ 
	    dadosPessoaisRepository.save(setoresContato);
	}

	public void deleteAll(List<DadosPessoais> listSetoresContato) {
		dadosPessoaisRepository.delete(listSetoresContato);
	}	
}