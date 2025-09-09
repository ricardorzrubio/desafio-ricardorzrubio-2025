import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
    expect(resultado.lista[0]).toBe('Fofo - abrigo');
    expect(resultado.lista[1]).toBe('Rex - pessoa 1');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER',
      'Mimi,Fofo,Rex,Bola'
    );

    expect(resultado.lista[0]).toBe('Bola - abrigo');
    expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
    expect(resultado.lista[2]).toBe('Mimi - abrigo');
    expect(resultado.lista[3]).toBe('Rex - abrigo');
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  test('Loco só pode ser adotado se houver outro animal como companhia', () => {
    const abrigo = new AbrigoAnimais();

    // Caso 1: pessoa ainda não adotou nenhum animal
    let resultado = abrigo.encontraPessoas(
      'SKATE,RATO', // brinquedos para pessoa 1
      'SKATE,RATO', // brinquedos para pessoa 2
      'Loco'
    );
    expect(resultado.lista[0]).toBe('Loco - abrigo'); // ninguém tem companhia
    expect(resultado.erro).toBeFalsy();

    // Caso 2: pessoa 1 já adotou um animal antes
    resultado = abrigo.encontraPessoas(
      'RATO,BOLA,SKATE,RATO', // brinquedos suficientes para Rex e Loco
      'RATO,NOVELO',          // brinquedos da pessoa 2
      'Rex,Loco'
    );
    expect(resultado.lista[0]).toBe('Rex - pessoa 1');  // primeiro animal adotado
    expect(resultado.lista[1]).toBe('Loco - pessoa 1'); // agora Loco tem companhia
    expect(resultado.erro).toBeFalsy();
  });

});
