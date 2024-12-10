import './styles.css';
import { Input } from '../../components/Input';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TextArea } from '../../components/Input/TextArea';
import { useParams } from 'react-router-dom';

export const RegisterProfessional = () => {
  const navigate = useNavigate();

  /* Listagem estado cidade */
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [cidadeSelecionada, setCidadeSelecionada] = useState('');
  const [listaCidades, setListaCidades] = useState([]);

  useEffect(() => {
    // Consultar a API para obter os estados
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then((response) => response.json())
      .then((data) => setEstados(data));
  }, []);

  useEffect(() => {
    if (estadoSelecionado) {
      // Consultar a API para obter as cidades do estado selecionado
      fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`,
      )
        .then((response) => response.json())
        .then((data) => setCidades(data));
    }
  }, [estadoSelecionado]);

  const adicionarCidade = () => {
    if (cidadeSelecionada && !listaCidades.includes(cidadeSelecionada)) {
      setListaCidades([...listaCidades, cidadeSelecionada]);
    }
  };

  const removerCidade = (cidade) => {
    setListaCidades(listaCidades.filter((c) => c !== cidade));
  };

  /*Lista profissão*/

  const [profissao, setProfissao] = useState('');
  //const [codigo, setCodigo] = useState('');
  const [lista, setLista] = useState([]);
  const [listaOfc, setListaOfc] = useState([]);
  const [ocupacao, setOcupacao] = useState(0);
  const [codProfissao, setCodigo] = useState('');

  useEffect(() => {
    let novaOcupacao = 0;
    if (profissao === 'eletricista') {
      novaOcupacao = 1;
    } else if (profissao === 'designer de Interiores') {
      novaOcupacao = 2;
    } else if (profissao === 'arquiteto') {
      novaOcupacao = 3;
    } else if (profissao === 'engenheiro') {
      novaOcupacao = 4;
    }
    setOcupacao(novaOcupacao);
  }, [profissao]);

  const handleAdd = () => {
    console.log('profissao');
    console.log(profissao);

    if (profissao === '') {
      alert('Escolha a profissão!');
      return;
    }
    if (profissao === 'engenheiro' || profissao === 'arquiteto') {
      if (codProfissao.trim() === '') {
        alert('O campo código é obrigatório!');
        return;
      }
    }

    const objProfissaoOfc = {
      ocupacao,
      codProfissao:
        profissao === 'engenheiro' || profissao === 'arquiteto'
          ? codProfissao
          : '',
    };

    console.log('objProfissaoOfc');
    console.log(objProfissaoOfc);

    setListaOfc([...listaOfc, objProfissaoOfc]);

    console.log('listaOfc');
    console.log(listaOfc);

    const novaProfissao = {
      profissao,
      codProfissao:
        profissao === 'engenheiro' || profissao === 'arquiteto'
          ? codProfissao
          : '',
    };
    setLista([...lista, novaProfissao]);
    setProfissao('');
    setCodigo('');
    setOcupacao(0);
  };

  const handleDelete = (index) => {
    const novaLista = lista.filter((_, i) => i !== index);
    setLista(novaLista);
  };

  /*  Adicionar ao objeto JSON para submit  */
  /* Json Object */

  const [profissional, setProfissional] = useState({
    listProfissao: [],
    localAtendimento: [],
  });

  const { id } = useParams(); // Pega o ID da URL
  const token = localStorage.getItem('token');

  function registerProfessional(profissionalObj) {
    console.log(id);
    console.log(profissionalObj);
    fetch(
      `http://localhost:8080/profissional/cadastrar/${id}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profissionalObj),
      },
      [],
    )
      .then((resp) => {
        console.log(token);
        console.log(resp);
        navigate('/professionals', {
          message: 'Profissional criado com sucesso!',
        });
      })
      .catch((err) => console.log(err));
  }

  function handleChange(e) {
    setProfissional({ ...profissional, [e.target.name]: e.target.value });
  }

  const submit = (e) => {
    e.preventDefault();
    setProfissional((prevProfissional) => ({
      ...prevProfissional,
      listProfissao: [...prevProfissional.listProfissao, ...listaOfc],
      localAtendimento: [...prevProfissional.localAtendimento, ...listaCidades],
    }));

    const boolean = profissional.atendimentoOnline === 'false' ? false : true;

    const profissionalObj = {
      listProfissao: listaOfc,
      descricao: profissional.descricao,
      localAtendimento: listaCidades,
      atendimentoOnline: boolean,
    };

    registerProfessional(profissionalObj);
  };

  return (
    <Container>
      <div className="form-field-professional">
        <h1>Cadastro de dados profissionais</h1>
        <form onSubmit={submit} autoComplete="off" className='form-professional'>
          <div className="select-profissao">
            <div className="option-profissao">
              <label htmlFor="opcoes">Escolha profissao:</label>
              <select
                id="opcoes"
                name="opcoes"
                value={profissao}
                onChange={(e) => setProfissao(e.target.value)}
              >
                <option value="">Selecione...</option>
                <option value="pedreiro">Pedreiro</option>
                <option value="eletricista">Eletricista</option>
                <option value="designer de Interiores">
                  Designer de Interiores
                </option>
                <option value="arquiteto">Arquiteto</option>
                <option value="engenheiro">Engenheiro</option>
              </select>
            </div>
            {(profissao === 'arquiteto' || profissao === 'engenheiro') && (
              <div className="input-field">
                <label htmlFor="">Código profissão</label>
                <input
                  type="text"
                  placeholder="Insira o código"
                  value={codProfissao}
                  onChange={(e) => setCodigo(e.target.value)}
                  required
                />
              </div>
            )}
          </div>
          <div>
            <Button
              variant="primary"
              className="btn-add-profissao"
              onClick={handleAdd}
            >
              Adicionar profissão
            </Button>
          </div>
          <ul className="list-profissao">
            {lista.map((item, index) => (
              <li key={index}>
                <div>
                  <Button variant="primary" onClick={() => handleDelete(index)}>
                    Deletar
                  </Button>
                </div>

                <div className="nome-profissao">
                  {item.profissao}{' '}
                  {item.codProfissao && `- Código: ${item.codProfissao}`}
                </div>
              </li>
            ))}
          </ul>
          <div className="atende-online">
            <label htmlFor="">Atende Online?</label>
            <div className="row-radio-btn">
              <div className="radio-btn">
                <input
                  type="radio"
                  name="atendimentoOnline"
                  value="true"
                  onChange={handleChange}
                />{' '}
                Sim
              </div>
              <div className="radio-btn">
                <input
                  type="radio"
                  name="atendimentoOnline"
                  value="false"
                  onChange={handleChange}
                />
                Não
              </div>
            </div>
          </div>

          <div className="select-estado">
            <div className="option-cidade">
              <label htmlFor="">Escolha o estado:</label>
              <select
                onChange={(e) => setEstadoSelecionado(e.target.value)}
                value={estadoSelecionado}
              >
                <option value="">Selecione...</option>
                {estados.map((estado) => (
                  <option key={estado.id} value={estado.id}>
                    {estado.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className='select-cidade'>
              <label htmlFor="">Escolha uma cidade:</label>
              <select
                onChange={(e) => setCidadeSelecionada(e.target.value)}
                value={cidadeSelecionada}
              >
                <option value="">Selecione...</option>
                {cidades.map((cidade) => (
                  <option key={cidade.id} value={cidade.nome}>
                    {cidade.nome}
                  </option>
                ))}
              </select>
            </div>

            <ul className='list-cidades'>
              {listaCidades.map((cidade) => (
                <li key={cidade}>
                  <Button
                    variant="primary"
                    onClick={() => removerCidade(cidade)}
                  >
                    Deletar
                  </Button>
                  <div>
                    {cidade}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Button onClick={adicionarCidade}>Adicionar cidade</Button>
          </div>

          <div className="form-field-bio">
            <TextArea
              label={'Biografia'}
              type={'text'}
              name="descricao"
              length={15}
              placeholder={
                'Digite sua biografia, experiências, formações e etc...'
              }
              handleOnChange={handleChange}
            />
          </div>

          <Button type="submit" variant="primary">
            ENVIAR
          </Button>
        </form>
      </div>
    </Container>
  );
};
