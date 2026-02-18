# ⚽ The Dugout - Footbal Manager

![Version](https://img.shields.io/badge/1.0.0-beta?label=version)
![Vue 3](https://img.shields.io/badge/Vue%203-3.5.13-41B883.svg?style=flat-square&logo=vue.js)
![Vite](https://img.shields.io/badge/Vite-7.0.0-646CFF.svg?style=flat-square&logo=vite)
![Vitest](https://img.shields.io/badge/Vitest-3.2.4-729B1B.svg?style=flat-square&logo=vitest)
![Pinia](https://img.shields.io/badge/Pinia-3.0.3-F5C518.svg?style=flat-square&logo=vue.js)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC.svg?style=flat-square&logo=tailwindcss)
![DaisyUI](https://img.shields.io/badge/DaisyUI-4.12.24-FE7C1D.svg?style=flat-square&logo=daisyui)


Simulador tático e narrativo inspirado em **Brasfoot**, criado com **Vue 3 + TypeScript + Vite**.  
Você comanda **Náutico** e **Sport** em partidas simuladas minuto a minuto, com:

- escalação e táticas personalizáveis (4-3-3, 4-4-2, 3-5-2),
- eventos dinâmicos com base nos atributos reais dos jogadores,
- barra de **stamina** (fadiga),
- **substituições e ajustes táticos no intervalo**,
- e uma engine de jogo realista que leva em conta **shooting, dribbling, defense, pace e altura**.

> Um projeto demonstrativo que mistura programação, simulação e futebol. ⚽  
> Desenvolvido por [André Canuto](https://www.linkedin.com/in/andre-canuto-77461b102/).

---

## 🚀 **Tecnologias**

| Stack                          | Descrição                                               |
| ------------------------------ | ------------------------------------------------------- |
| ⚙️ **Vite**                    | Build rápido e leve                                     |
| 🧩 **Vue 3 (Composition API)** | Framework principal                                     |
| 💬 **TypeScript**              | Tipagem forte e previsível                              |
| 🎨 **TailwindCSS + DaisyUI**   | Estilização moderna e responsiva                        |
| ⚡ **Sim Engine custom**        | Cálculo probabilístico com atributos reais de jogadores |

---

## 🧠 **Como funciona o simulador**

A engine roda minuto a minuto (`simulateMinute()`),  
avaliando atributos individuais dos jogadores e o contexto do jogo para criar eventos:

| Tipo de evento             | Baseado em atributos                        |
| -------------------------- | ------------------------------------------- |
| **Ataque e gol**           | `shooting`, `dribbling`, `pace`, `stamina`  |
| **Defesa e goleiro**       | `defense`, `physical`, `height`, `stamina`  |
| **Escanteio / Cruzamento** | `height`, `physical`, `defense`             |
| **Faltas e cartões**       | Sorteio ponderado por time                  |
| **Momentos neutros**       | Narração contextualizada com nome dos times |

A cada minuto:

- Jogadores **perdem stamina** proporcional à posição;
- O desempenho **cai conforme o cansaço**;
- Substituições e táticas podem ser feitas no módulo **táticas** antes do jogo.

---

## 🕹️ **Como rodar o projeto**

```bash
# 1. Clone o repositório
git clone git@github.com:dehcanuto/football-manager-vue.git
cd football-manager-vue

# 2. Instale as dependências
yarn install

# 3. Rode em modo desenvolvimento
yarn dev
```

Acesse em: [http://localhost:5173](http://localhost:5173)

## 🧱 Estrutura de pastas

```bash
src/
├── components/
│   ├── MatchSimulator.vue      # Tela principal do jogo
│   ├── TeamPanel.vue           # Mostra escalação e stamina
│   └── TeamTacticsModal.vue    # Modal para táticas e substituições
│
├── data/
│   └── teams.ts                # Dados de Náutico e Sport
│
├── utils/
│   └── matchEngine.ts          # Lógica da simulação minuto a minuto
│
├── types.ts                    # Tipagem de jogadores, times e atributos
└── main.ts                     # Ponto de entrada Vue
```

## 🧩 Gameplay

### 🕒 Durante o jogo

- Acompanhe o log minuto a minuto.
- Veja as barras de stamina descendo.

## 🧩 Atributos dos jogadores

| Atributo      | Efeito                                    |
| ------------- | ----------------------------------------- |
| **Pace**      | Influencia contra-ataques e deslocamentos |
| **Shooting**  | Precisão e força nas finalizações         |
| **Passing**   | Qualidade na troca de passes              |
| **Dribbling** | Chance de driblar e criar espaço          |
| **Defense**   | Desempenho defensivo e cortes             |
| **Physical**  | Disputa corporal e resistência            |
| **Height**    | Eficiência em cruzamentos e escanteios    |
| **Stamina**   | Energia — quanto menor, pior desempenho   |

## 🧩 Melhorias futuras (roadmap)

- Tela de estatísticas pós-jogo (finalizações, posse, cartões)
- Sistema de rating dos jogadores com base em desempenho
- Táticas mais profundas (pressão, linha alta, contra-ataque)
- Persistência em localStorage (salvar escalação e resultados)
- Drag-n-drop para escalar jogadores
- Versão multiplayer local (hotseat)

# 🧡 Créditos

Desenvolvido com paixão por futebol e código por André Canuto.

> _“Futebol é como código: precisa de lógica, mas é a emoção que dá sentido.”_
