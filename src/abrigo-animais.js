class AbrigoAnimais {
  constructor() {
    this.animais = {
      Rex: { tipo: 'cao', brinquedos: ['RATO', 'BOLA'] },
      Mimi: { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
      Fofo: { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
      Zero: { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
      Bola: { tipo: 'cao', brinquedos: ['CAIXA', 'NOVELO'] },
      Bebe: { tipo: 'cao', brinquedos: ['LASER', 'RATO', 'BOLA'] },
      Loco: { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] },
    };

    // Lista de todos os brinquedos válidos (para futuras validações, se necessário)
    this.todosBrinquedosValidos = [
      ...new Set(Object.values(this.animais).flatMap(a => a.brinquedos))
    ];
  }

  // Verifica se os brinquedos favoritos aparecem na ordem dentro da lista da pessoa
  contemBrinquedosFavoritos(brinquedosPessoa, brinquedosAnimal, tipoAnimal) {
    if (tipoAnimal === 'jabuti') {
      // Loco não liga para ordem, apenas precisa ter os brinquedos
      return brinquedosAnimal.every(b => brinquedosPessoa.includes(b));
    }

    // Checagem de subsequência (intercalando brinquedos)
    let i = 0;
    for (let brinquedo of brinquedosPessoa) {
      if (brinquedo === brinquedosAnimal[i]) {
        i++;
      }
      if (i === brinquedosAnimal.length) return true;
    }
    return false;
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    try {
      const pessoa1 = brinquedosPessoa1.split(',').map(b => b.trim().toUpperCase());
      const pessoa2 = brinquedosPessoa2.split(',').map(b => b.trim().toUpperCase());
      const ordem = ordemAnimais.split(',').map(a => a.trim());

      let adotados1 = 0;
      let adotados2 = 0;
      let lista = [];

      let nomesAnimaisValidos = Object.keys(this.animais);
      let vistos = new Set();

      for (let animal of ordem) {
        if (!nomesAnimaisValidos.includes(animal) || vistos.has(animal)) {
          return { erro: 'Animal inválido' };
        }
        vistos.add(animal);

        const info = this.animais[animal];
        const brinquedos = info.brinquedos;

        let pode1 = this.contemBrinquedosFavoritos(pessoa1, brinquedos, info.tipo) && adotados1 < 3;
        let pode2 = this.contemBrinquedosFavoritos(pessoa2, brinquedos, info.tipo) && adotados2 < 3;

        // Loco só pode ser adotado se a pessoa já tiver adotado outro animal
        if (info.tipo === 'jabuti') {
          const temCompanhia1 = adotados1 > 0;
          const temCompanhia2 = adotados2 > 0;
          pode1 = pode1 && temCompanhia1;
          pode2 = pode2 && temCompanhia2;
        }

        if (pode1 && pode2) {
          lista.push(`${animal} - abrigo`);
        } else if (pode1) {
          lista.push(`${animal} - pessoa 1`);
          adotados1++;
        } else if (pode2) {
          lista.push(`${animal} - pessoa 2`);
          adotados2++;
        } else {
          lista.push(`${animal} - abrigo`);
        }
      }

      return { lista: lista, erro: null };
    } catch (e) {
      return { erro: 'Brinquedo inválido' };
    }
  }
}

export { AbrigoAnimais as AbrigoAnimais };