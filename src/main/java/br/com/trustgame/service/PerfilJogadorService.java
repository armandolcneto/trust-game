package br.com.trustgame.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.trustgame.model.ConfigJogo;
import br.com.trustgame.model.PerfilJogador;
import br.com.trustgame.model.TransferenciaJogo;
import br.com.trustgame.repository.PerfilJogadorRepository;
import br.com.trustgame.repository.TransferenciaJogoRepository;



@Service
public class PerfilJogadorService {

	@Autowired
	private PerfilJogadorRepository perfilJogadorRepository;

	public List<PerfilJogador> getAll() {
		return perfilJogadorRepository.findAll();
	}	
	
	public void saldoAcumulado(PerfilJogador saldoAcumulado){ 
		perfilJogadorRepository.save(saldoAcumulado);
	}

	public PerfilJogador criarPerfil(String parametros) {
		
		PerfilJogador perfil = new PerfilJogador();
	//	perfil.setTipoPerfil(tipo);
	//	perfil.setConifgJofo(jogo);
		perfil.setSaldoAcumulado(0);
		perfilJogadorRepository.save(perfil);
		return perfil;
		
	}
}