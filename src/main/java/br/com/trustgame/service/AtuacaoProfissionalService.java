package br.com.trustgame.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.trustgame.model.AtuacaoProfissional;
import br.com.trustgame.repository.AtuacaoProfissionalRepository;


@Service
public class AtuacaoProfissionalService {

	@Autowired
	private AtuacaoProfissionalRepository atuacaoProfissionalRepository;

	public List<AtuacaoProfissional> getAll() {
		return atuacaoProfissionalRepository.findAll();
	}	
}