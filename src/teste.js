import { AbrigoAnimais } from "./abrigo-animais.js"; // cuidado com a extensão .js

const abrigo = new AbrigoAnimais();

// Exemplo de entradas
const brinquedosPessoa1 = 'RATO,BOLA';
const brinquedosPessoa2 = 'RATO,CAIXA,NOVELO,SKATE';
const ordemAnimais = 'Rex,Bola,Loco';

const resultado = abrigo.encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais);

console.log('Resultado visual:');
console.log(resultado);