const fs = require('fs').promises;
const { performance } = require('perf_hooks');

async function lerAutomatoJson(arquivo) {
    try {
        const conteudoDoArquivo = await fs.readFile(arquivo, 'utf8');
        const automato = JSON.parse(conteudoDoArquivo);
        return automato;
    } catch (erro) {
        console.error(`Erro ao ler o arquivo ${arquivo}:`, erro);
        throw erro;
    }
}

async function lerEntradas(arquivo) {
    try {
        const conteudoDoArquivo = await fs.readFile(arquivo, 'utf8');
        const linhasDaEntrada = conteudoDoArquivo.split('\n');
        const entradas = linhasDaEntrada.map(linha => linha.split(';'));
        return entradas;
    } catch (erro) {
        console.error(`Erro ao ler o arquivo ${arquivo}:`, erro);
        throw erro;
    }
}

function respostaDoAutomato(automato, entrada) {
    let estadosAtuais = new Set([automato.initial]);

    for (let i = 0; i < entrada.length; i++) {
        let novosEstados = new Set();

        for (let estado of estadosAtuais) {
            for (let transicao of automato.transitions) {
                if (transicao.from === estado && transicao.read === entrada[i]) {
                    novosEstados.add(transicao.to);
                }
            }
        }
        estadosAtuais = novosEstados;
    }

    for (let estadoFinal of automato.final) {
        if (estadosAtuais.has(estadoFinal)) {
            return true;
        }
    }

    return false;
}

async function main() {
    try {
        const arquivoAutomato = process.argv[2];
        const arquivoEntradas = process.argv[3];
        const automato = await lerAutomatoJson(arquivoAutomato);
        const entradas = await lerEntradas(arquivoEntradas);
        const resultados = entradas.map(function(entrada) {
            const tempoInicial = performance.now();
            const aceita = respostaDoAutomato(automato, entrada[0]);
            const tempoFinal = performance.now();
            const tempoDeExecucao = tempoFinal - tempoInicial;
            const saidaEsperada = entrada[1];
            const saidaObtida = aceita ? 1 : 0;
            return `${entrada[0]};${saidaEsperada};${saidaObtida};${tempoDeExecucao.toFixed(3)}`;
        });

        const arquivoSaida = process.argv[4];
        const saida = resultados.join('\n\n');
        await fs.writeFile(arquivoSaida, saida);
        console.log(`Resultados impressos em ${arquivoSaida}`);
    } catch (erro) {
        console.error('Erro durante a execução da função main:', erro);
        throw erro;
    }
}

main();
