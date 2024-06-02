
# Simulador de Autômatos Finitos

## Descrição
Este é um simulador de autômatos finitos determinísticos, não determinísticos e não determinísticos com movimento vazio em JavaScript. Ele permite que você defina um autômato através de um arquivo em estrutura JSON e teste várias entradas para verificar se o autômato as aceita ou não.

## Funcionamento
O simulador lê dois arquivos de entrada: um que descreve o autômato em formato JSON e outro que contém as entradas de teste. Ele então executa cada entrada no autômato e registra se cada entrada é aceita ou rejeitada, além do tempo de execução. Os resultados são armazenados em um arquivo de saída.

## Exemplo de Uso
Para utilizar o simulador, é necessário fornecer dois arquivos de entrada: um arquivo contendo a definição do autômato em formato JSON e outro arquivo contendo as entradas a serem testadas. Além disso, é necessário especificar um terceiro arquivo para armazenar os resultados da simulação. 

### Exemplo de arquivo de autômato:
`arquivo_do_automato.aut`
```json 
{
    "initial": 0,
    "final": [3, 5],
    "transitions": [
        {"from": 0, "read": "a", "to": 1},
        {"from": 0, "read": " ", "to": 2},
        {"from": 1, "read": "b", "to": 3},
        {"from": 2, "read": "c", "to": 3},
        {"from": 2, "read": " ", "to": 4},
        {"from": 3, "read": "a", "to": 5},
        {"from": 4, "read": "b", "to": 5},
        {"from": 5, "read": " ", "to": 0}
    ]
}
```
### Exemplo de arquivo de entradas:
`arquivo_de_testes.in`
```
aba  c;1
abc;0
a b a;0
```
Onde os elementos à direita são as entradas e os elementos à esquerda são as saídas esperadas (1: aceita / 0: rejeita). Essas duas informações devem ser separadas por ";".


### Exemplo de uso no terminal:
```bash
node ferramenta.js arquivo_do_automato.aut arquivo_de_testes.in arquivo_de_saida.out
```
Se estiver usando o terminal do Visual Studio Code, o arquivo de saída será criado ou reescrito na própria pasta do arquivo `ferramenta.js`, então basta abrí-lo para verificar as saídas. Se estiver usando outro terminal, recomendo usar este comando para abrir o arquivo de saída:
```bash
start notepad arquivo_de_saida.out
```
### Exemplo de arquivo de saída:
`arquivo_de_saida.out`
```
aba  c;1
;1;0.028

abc;0
;0;0.003

a b a;0
;0;0.003
```
Onde os dois elementos de cima são, respectivamente, a entrada e a saída esperada (1: aceita / 0: rejeita). Já os dois elementos de baixo são, respectivamente, a saída obtida (1: aceita / 0: rejeita) e o tempo de execução. Cada informação é separada por ";".