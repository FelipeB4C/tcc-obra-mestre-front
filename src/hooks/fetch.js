fetch('http://localhost:8080/profissional/listarUm/1')
  .then((res) => res.json())
  .then((data) => console.log(data));
