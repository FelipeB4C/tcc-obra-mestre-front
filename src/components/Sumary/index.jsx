import { Container } from 'react-bootstrap';
import { Button } from '/src/components/Button';
import './styles.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

export const Sumary = ({ profissional }) => {
  return (
    <Container>
      {profissional.map((pro) => (
        <Link
          className="go-to-profile"
          as={Link}
          to={`/profile/${pro.idUsuario}`}
          key={pro.idUsuario}
        >
          <div className="bio-sumary">
            <div className="bio-photo-sumary">
              <img src="src/img/usr.png" alt="" />
            </div>
            <div className="bio-info-sumary">
              <div className="nome-nota">
                <h2>{pro.nome}</h2>
                <p>
                  <img src="src/img/star.svg" alt="" />
                  {pro.avaliacaoProfissional} ({pro.numAvaliacoes})
                </p>
              </div>
              <div className="professions-sumary">
                {pro.listProfissao.map((prof) => (
                  <p key={prof.ocupacao}>{prof.ocupacao}</p>
                ))}
              </div>
              <p className="resume-sumary">{pro.descricao}</p>
              <div className="local-atendimento-sumary">
                <p>Locais Atendimento: </p>
                {pro.localAtendimento.map((local) => (
                  <p key={local}>{local}</p>
                ))}
              </div>
            </div>
            <div className="bio-contact-sumary">
              <p>{pro.contato1}</p>
              <p>{pro.contato2}</p>
              <Button
                label={'Fale comigo!'}
                srcIcon={'/src/img/whatsapp.svg'}
              />
            </div>
          </div>
        </Link>
      ))}
    </Container>
  );
};
