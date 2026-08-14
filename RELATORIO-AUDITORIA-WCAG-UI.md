# Relatório de auditoria de acessibilidade, UI e qualidade

Data da checagem: 11/08/2026
Projeto: Prefeitura de Roseira, React + Vite
Escopo: `src/App.tsx`, `src/App.css`, `src/index.css`, `index.html`, configuração e arquivos públicos. Dependências de terceiros, `node_modules` e `dist` foram excluídos da análise de código.

## Resumo executivo

O projeto está compilando e o servidor local responde. Há uma base positiva de acessibilidade: idioma do documento, título e descrição, skip link, foco visível, labels em campos principais, semântica inicial para abas e diálogo de cookies, além de suporte a `prefers-reduced-motion`.

Os maiores riscos atuais são funcionais e de navegação: muitos links ainda usam `href="#"`, o menu desktop depende principalmente de hover, os carrosséis automáticos não oferecem um controle visível de pausa, e o modal de cookies ainda precisa de um ciclo completo de foco e retorno ao elemento que o abriu. Também existem oportunidades de melhorar estados de erro, contraste medido, responsividade de tabelas e qualidade dos textos alternativos.

## Testes automatizados executados

Comandos:

```text
npm.cmd run build
npm.cmd run a11y:check
```

Resultado do build: aprovado. O Vite emitiu apenas avisos futuros sobre `__dirname` e importação JSON na configuração.

O teste `scripts/accessibility-check.mjs` foi criado para ser repetido em qualquer máquina com o projeto. Na execução desta auditoria, 13 de 16 verificações passaram; as três falhas correspondem a campos que ainda precisam de revisão, botões sem `type` explícito e links placeholder. Ele verifica:

- `lang`, `title`, `meta description` e skip link;
- presença de `main` identificável;
- `alt` nas imagens declaradas em React;
- identificação acessível de campos de formulário;
- `type` explícito em botões;
- semântica básica de abas e diálogo;
- suporte a foco visível e movimento reduzido;
- links com `href="#"`;
- disponibilidade do servidor local e integridade mínima do HTML servido.

Limitação importante: não há navegador automatizável ou `axe-core` instalado neste checkout. Portanto, o teste é uma combinação de smoke test HTTP e análise estática, não substitui uma execução real do axe, leitor de tela, navegação por teclado em navegador e medição de contraste por pixel.

## Achados prioritários

### Alta prioridade

#### 1. Links sem destino real

Há vários `href="#"` em header, navegação, cards, alertas, publicações, calendário, galeria, rodapé e política de cookies. Isso cria falsas affordances, altera a posição da página e impede que o usuário conclua tarefas.

Recomendação: substituir por URLs reais, âncoras de seção ou botões quando a ação não for navegação. Para conteúdo futuro, usar rotas amigáveis como `/noticias`, `/legislacao`, `/licitacoes`, `/concursos`, `/galeria` e `/secretarias`.

#### 2. Menu desktop não é plenamente operável por teclado

O submenu é aberto com `onMouseEnter` e fechado com `onMouseLeave`. Usuários de teclado precisam conseguir abrir e fechar o submenu com Enter/Espaço, escapar com Escape e navegar entre itens sem depender do ponteiro.

Recomendação: adicionar `aria-expanded`, `aria-haspopup="true"`, estado controlado por foco/clique e listener de Escape. O link ou botão de cada item deve ter destino próprio.

#### 3. Carrosséis automáticos sem controle de pausa

Hero, notícias e secretarias avançam automaticamente. O código respeita `prefers-reduced-motion`, o que é positivo, mas pessoas que não usam essa configuração não têm controle explícito para interromper o movimento.

Recomendação: incluir pausa/iniciar por teclado e toque, pausar ao receber foco ou hover e anunciar mudanças apenas quando necessário. Como o pedido visual removeu os botões de pausa, uma alternativa discreta é pausar automaticamente enquanto o foco estiver dentro do carrossel e oferecer o controle no menu acessível do componente.

#### 4. Modal de cookies precisa de gerenciamento completo de foco

O diálogo possui `role="dialog"`, `aria-modal` e título, mas deve guardar o elemento que abriu o modal, mover foco para o primeiro controle, manter Tab dentro do modal, fechar com Escape e devolver foco ao acionador.

### Média prioridade

#### 5. Abas sem relação explícita com seus painéis

As abas já têm `role="tab"` e `aria-selected`, mas os painéis não têm `role="tabpanel"`, `aria-labelledby` e `aria-controls`.

Recomendação: dar ids estáveis às abas e painéis, associá-los e permitir navegação pelas setas Home/End. O conteúdo alterado deve permanecer identificável para tecnologias assistivas.

#### 6. Links de cards pouco descritivos

Textos repetidos como “Ler mais”, “Leia mais” e “Ver perfil” ficam ambíguos quando uma lista de links é lida fora do contexto visual.

Recomendação: manter o texto visual curto e usar `aria-label` específico, por exemplo `Ler mais: Base do Corpo de Bombeiros inaugurada`.

#### 7. Texto alternativo genérico na galeria

`Galeria 1`, `Galeria 2` etc. não descrevem a imagem nem sua finalidade.

Recomendação: cadastrar título, descrição e autoria/data de cada mídia. Se a imagem for puramente decorativa, usar `alt=""` e remover a obrigação de o leitor interpretá-la.

#### 8. Tabela de publicações em telas pequenas

A tabela usa uma largura mínima que pode forçar rolagem horizontal. Isso é aceitável apenas quando comunicado e mantido operável.

Recomendação: criar uma alternativa responsiva em cards ou manter a tabela dentro de um contêiner com rolagem nomeado, indicando que há conteúdo horizontal.

#### 9. Formulários sem estados completos

Newsletter e contato têm campos identificados, mas faltam mensagens de erro associadas, `aria-invalid`, `aria-describedby`, estado de carregamento e confirmação anunciada por `role="status"`.

Recomendação: validar formato e obrigatoriedade no cliente, informar o erro junto ao campo e preservar os dados digitados.

#### 10. Contraste precisa de medição objetiva

A paleta verde, amarelo, branco, cinza e azul conversa com a identidade visual, mas combinações como texto branco sobre verde translúcido, texto escuro em amarelo e links secundários devem ser medidas com WCAG 2.2 AA.

Recomendação: medir texto normal em 4.5:1, texto grande em 3:1 e componentes/indicadores em 3:1. Validar também foco, hover, estado selecionado e texto sobre imagens do hero.

## Melhorias de UI recomendadas

### Sistema visual

- Centralizar tokens de cor, espaçamento, raio, sombra e tipografia em variáveis CSS; hoje há cores institucionais e cores legadas misturadas.
- Reduzir a dependência de classes numeradas (`sx-*`) em novos componentes e migrar gradualmente para nomes semânticos.
- Definir estados consistentes para default, hover, foco, selecionado, desabilitado, carregando e erro.
- Padronizar a altura mínima dos alvos clicáveis em aproximadamente 44px, especialmente dots, links de rodapé e controles do topo.
- Garantir que o amarelo seja usado como destaque e estado selecionado, preservando o verde escuro para navegação e links institucionais.

### Layout e responsividade

- Testar larguras de 320px, 375px, 768px, 1024px e 1440px.
- Verificar quebra de títulos longos, nomes de secretarias, endereços, e-mails e eventos sem clipping.
- Evitar que carrosséis dependam apenas de arraste horizontal; setas, foco e indicadores devem continuar disponíveis.
- Implementar uma visão mobile específica para publicações e eventos quando a comparação em tabela ficar difícil.
- Reservar espaço para carregamento de imagens e usar `loading="lazy"` em mídias abaixo da primeira dobra.

### Conteúdo e confiança

- Trocar dados demonstrativos, como contatos e domínios de exemplo, por informações oficiais antes de publicar.
- Substituir imagens remotas de demonstração por ativos institucionais com licença e fallback local.
- Mostrar data de atualização em notícias, publicações, calendário e contatos.
- Evitar misturar “Prefeitura de Roseira” com nomes de outros municípios nos dados exibidos.

## Plano de implementação sugerido

1. Corrigir destinos de navegação, menu por teclado e modal de cookies.
2. Completar abas e carrosséis com estados ARIA, foco, Escape e pausa por foco/hover.
3. Corrigir formulários, mensagens de erro e anúncios de sucesso.
4. Medir contraste e ajustar tokens de cor, foco e estados.
5. Criar layout mobile de publicações e revisar alvos clicáveis.
6. Substituir conteúdo de demonstração, alt texts genéricos e imagens externas.
7. Integrar `axe-core` com Playwright em CI quando um navegador automatizado estiver disponível.

## Critérios de aceite recomendados

- Todo link leva a um destino real ou é convertido em botão.
- Toda função do menu, abas, carrosséis, modal e formulários funciona somente com teclado.
- O foco nunca desaparece e não fica preso fora do componente ativo.
- Todas as combinações de texto e fundo atendem WCAG 2.2 AA.
- O conteúdo continua legível e operável em 320px sem sobreposição.
- Carrosséis não avançam enquanto o usuário interage com eles e respeitam movimento reduzido.
- O teste automatizado passa no build e no HTML servido; o axe e a validação manual não apontam violações críticas.
