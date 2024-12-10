import { useEffect, useState } from "react";
import { Sumary } from "../components/Sumary";
import { ProfessionalFilter } from "../components/ProfessionalFilter";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "./styles.css";

const token = localStorage.getItem("token");

export const Professionals = () => {
  const [listProfessionals, setListProfessionals] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState(""); // Armazena o ID do estado
  const [cidadeSelecionada, setCidadeSelecionada] = useState("");
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);

  // Buscar estados ao carregar a página
  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((response) => response.json())
      .then((data) => setEstados(data))
      .catch((error) => console.error("Erro ao buscar estados:", error));
  }, []);

  // Buscar cidades quando um estado for selecionado
  useEffect(() => {
    if (estadoSelecionado) {
      fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`
      )
        .then((response) => response.json())
        .then((data) => setCidades(data))
        .catch((error) => console.error("Erro ao buscar cidades:", error));
    } else {
      setCidades([]); // Limpa cidades caso o estado seja desmarcado
    }
  }, [estadoSelecionado]);

  // Buscar profissionais com base nos filtros
  const fetchProfessionals = ({ estado = "", cidade = "" }) => {
    let query = `http://localhost:8080/profissional/pageable?`;
    if (estado) query += `estado=${estado}&`;
    if (cidade) query += `cidade=${cidade}&`;

    query = query.endsWith("&") ? query.slice(0, -1) : query; // Remove '&' extra

    fetch(query, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => setListProfessionals(data))
      .catch((err) => console.log("Erro ao buscar profissionais:", err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchProfessionals({
      estado: estadoSelecionado,
      cidade: cidadeSelecionada,
    });
  };

  // Busca inicial de profissionais ao carregar a página
  useEffect(() => {
    fetchProfessionals({});
  }, []);

  return (
    <Container fluid className="professionals-page">
      <Row>
        <Col md={3} className="sidebar">
          <ProfessionalFilter onFilter={fetchProfessionals} />
        </Col>
        <Col md={9} className="content">
          {/* Campos de Estado e Cidade */}
          <div className="group-estado-cidade">
            <Form onSubmit={handleSubmit} className="form-filter">
              {/* Estado */}
              <Form.Group controlId="formEstado">
                <Form.Label>Estado</Form.Label>
                <Form.Select
                  onChange={(e) => setEstadoSelecionado(e.target.value)} // Armazena o ID do estado
                  value={estadoSelecionado}
                >
                  <option value="">Selecione um estado...</option>
                  {estados.map((estado) => (
                    <option key={estado.id} value={estado.id}>
                      {estado.nome}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* Cidade */}
              <Form.Group controlId="formCidade">
                <Form.Label>Cidade</Form.Label>
                <Form.Select
                  onChange={(e) => setCidadeSelecionada(e.target.value)}
                  value={cidadeSelecionada}
                  disabled={!estadoSelecionado} // Desabilita se nenhum estado for selecionado
                >
                  <option value="">Selecione uma cidade...</option>
                  {cidades.map((cidade) => (
                    <option key={cidade.id} value={cidade.nome}>
                      {cidade.nome}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Button variant="primary" type="submit" className="buttonFilter">
                Filtrar
              </Button>
            </Form>
          </div>

          {/* Sumary com a listagem de profissionais */}
          <Sumary profissional={listProfessionals} />
        </Col>
      </Row>
    </Container>
  );
};
