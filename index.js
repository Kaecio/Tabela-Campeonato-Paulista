import resultados from "./resultados.js";

const tabela = document.querySelector(".table");
const thead = document.createElement("thead");
const tbody = document.createElement("tbody");
const tfoot = document.createElement("tfoot");
const tr = document.createElement("tr");

const indicesTabela = [
  "Time",
  "Pontos",
  "Jogos",
  "Vitórias",
  "Empates",
  "Derrotas",
];

for (let i = 0; i < indicesTabela.length; i++) {
  const th = document.createElement("th");
  th.textContent = indicesTabela[i];
  th.className;
  tr.appendChild(th);
}

thead.appendChild(tr);
tabela.appendChild(thead);
tabela.appendChild(tbody);
tabela.appendChild(tfoot);

let times = [];
resultados.forEach((resultado) => {
  times.push(resultado.casa);
  times.push(resultado.visitante);
});
times = [...new Set(times)]; //pra remover duplicados
console.log(times);

times = times.reduce((acc, time) => {
  acc[time] = {
    pontos: 0,
    jogos: 0,
    vitorias: 0,
    empates: 0,
    derrotas: 0,
  };
  return acc;
}, {});

const tabelaJSON = resultados.reduce((tabela, resultado) => {
  if (resultado.gols_casa > resultado.gols_visitante) {
    //CASA GANHOU
    tabela[resultado.casa].vitorias++;
    tabela[resultado.casa].pontos += 3;
    tabela[resultado.visitante].derrotas++;
  } else if (resultado.gols_casa === resultado.gols_visitante) {
    //EMPATOU
    tabela[resultado.casa].empates++;
    tabela[resultado.casa].pontos++;
    tabela[resultado.visitante].empates++;
    tabela[resultado.visitante].pontos++;
  } else {
    // VISITANTE GANHOU
    tabela[resultado.visitante].vitorias++;
    tabela[resultado.visitante].pontos += 3;
    tabela[resultado.casa].derrotas++;
  }
  tabela[resultado.casa].jogos++;
  tabela[resultado.visitante].jogos++;
  return tabela;
}, times);

console.log(tabelaJSON);

for (const property in tabelaJSON) {
  console.log(property);
  const linhaBody = document.createElement("tr");
  const cel0 = document.createElement("td");
  const cel1 = document.createElement("td");
  const cel2 = document.createElement("td");
  const cel3 = document.createElement("td");
  const cel4 = document.createElement("td");
  const cel5 = document.createElement("td");

  cel0.innerHTML = property;
  cel1.innerHTML = tabelaJSON[property].pontos;
  cel2.innerHTML = tabelaJSON[property].jogos;
  cel3.innerHTML = tabelaJSON[property].vitorias;
  cel4.innerHTML = tabelaJSON[property].empates;
  cel5.innerHTML = tabelaJSON[property].derrotas;

  linhaBody.appendChild(cel0);
  linhaBody.appendChild(cel1);
  linhaBody.appendChild(cel2);
  linhaBody.appendChild(cel3);
  linhaBody.appendChild(cel4);
  linhaBody.appendChild(cel5);
  console.log(tbody);
  tbody.appendChild(linhaBody);
}
