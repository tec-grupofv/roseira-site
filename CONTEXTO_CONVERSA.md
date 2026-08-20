# Contexto Detalhado da Conversa - Prefeitura de Roseira

Este documento registra, em detalhes, o contexto de trabalho desta conversa no projeto da Prefeitura de Roseira. A ideia e permitir retomar o desenvolvimento sem depender do historico completo do chat.

## 1. Ambiente e Validacao

### Projeto

- Caminho do projeto: `C:\Users\user\Desktop\Workspace\Prefeitura-de-Roseira-Site`
- Stack: React, Vite, TypeScript e CSS global em `src/App.css`
- Dev server usado: Vite
- URL local usada: `http://localhost:5173/`
- Porta confirmada em uso: `5173`
- O servidor local chegou a responder `HTTP 200`.

### Comandos usados com frequencia

- Rodar projeto:
  - `npm.cmd run dev -- --port 5173`
- Build:
  - `npm.cmd run build`
- Checagem de mojibake:
  - usar `rg` nos arquivos alterados buscando caracteres corrompidos

### Observacoes de build

- O build passa.
- O Vite exibe avisos sobre:
  - uso de `__dirname` em `vite.config.ts`
  - import JSON sem `with { type: 'json' }`
- Esses avisos nao bloquearam o build e ja vinham aparecendo durante o desenvolvimento.

### Regra de edicao

- Usar `apply_patch` para edicoes manuais.
- Depois de alterar arquivos, rodar build quando aplicavel.
- Sempre checar mojibake em arquivos alterados.
- O PowerShell pode exibir acentos distorcidos mesmo quando o arquivo esta correto em UTF-8. A checagem com `rg` e mais confiavel.

## 2. Preferencias do Usuario

- O usuario quer ajustes visuais fieis as imagens de referencia.
- Quando o usuario disser que "nao mudou", "nao esta igual" ou mostrar screenshot, o ideal e verificar visualmente no navegador quando possivel.
- O usuario prefere implementacao direta, nao apenas plano.
- Manter padrao visual ja definido no site.
- Evitar criar estilos muito diferentes quando ja houver classe existente.
- Reutilizar classes sempre que possivel.
- Botoes, cards, tags, titulos e breadcrumbs devem ficar padronizados em todas as paginas.

## 3. Padrao Visual Global

### Headers de paginas internas

As paginas internas seguem o padrao:

- Fundo escuro em cinza/azul muito escuro.
- Breadcrumb no topo.
- Titulo grande com `site-title`.
- Subtitulo com `site-subtitle`.
- Conteudo em largura centralizada com `max-w-7xl mx-auto px-4`.

Paginas que seguem ou devem seguir esse padrao:

- Noticias
- Detalhe de noticia
- Secretarias
- Detalhe de secretaria
- Concursos
- Licitacoes
- Detalhe de licitacao
- Leis Municipais
- Decretos
- Portarias
- Historia de Roseira
- Contato

### Breadcrumbs

- O breadcrumb deve seguir o padrao visual usado em concursos/noticias/secretarias.
- Foi tentada uma variavel para breadcrumb, mas depois o usuario pediu para desfazer.
- Portanto, breadcrumbs continuam definidos diretamente por pagina.

### Titulos e texto

Classes padronizadas usadas:

- `site-title`: titulo principal de pagina/hero
- `site-subtitle`: subtitulo do hero
- `site-section-title`: titulo de secao
- `site-panel-title`: titulo de painel/card grande
- `site-card-title`: titulo de card/lista
- `site-caps-title`: texto pequeno em caps
- `site-text`: texto comum

Decisoes:

- Titulos que estavam em verde escuro foram ajustados para cinza escuro/texto.
- Cores semanticas continuam sendo usadas em tags, status, icones e badges.

### Botoes

Padrao amarelo:

- O usuario pediu que botoes amarelos sigam o botao LGPD "Aceitar todos".
- Classe base existente do LGPD: `sx-220`.
- Classe criada para reutilizar esse visual fora do banner:
  - `lgpd-yellow-button`
- Usado no botao `Enviar mensagem` da pagina de contato junto com `sx-220`.
- Esse botao nao deve ter sombra.

Padrao verde escuro:

- Classe criada:
  - `site-green-pill-button`
- Caracteristicas:
  - fundo `var(--green-dark)`
  - texto branco
  - totalmente redondo
  - hover com `var(--green)`
  - leve `translateY(-1px)`
  - peso de fonte reduzido para `600`
- Usada nos botoes de `Canais digitais` na pagina de contato.

Botao buscar:

- Classe do botao da barra principal: `.sx-32`
- Foi adicionado hover:
  - escurece para `var(--yellow-dark)`
  - leve subida com `translateY(-1px)`

## 4. Header Principal e Navegacao

### Estrutura do header

O menu foi reorganizado com grupos:

- A Prefeitura
- Secretarias
- Servicos
- Noticias
- Licitacoes
- Concursos
- Transparencia
- Legislacao
- Contato

### Item ativo

- O header deve mostrar a pagina atual.
- Foi adicionada linha amarela abaixo do item ativo.
- A classe envolvida no underline ativo e `nav-item-active` aplicada em conjunto com `.sx-35`.

### Rotas/estados no App

O app e SPA controlado por estado `page`.

Tipo `AppPage` foi expandido ao longo da conversa para incluir:

- `home`
- `historia-roseira`
- `contato`
- `concursos`
- `licitacoes`
- `licitacao-detail`
- `leis-municipais`
- `lei-detail`
- `decretos`
- `decreto-detail`
- `portarias`
- `portaria-detail`
- `noticias`
- `noticia-detail`
- `secretarias`
- `secretaria-detail`

### Links importantes do header

- Logo e nome da Prefeitura redirecionam para home.
- `A Prefeitura > Historia de Roseira` abre `historia-roseira`.
- `Noticias > Ultimas Noticias` abre `noticias`.
- `Licitações` e seus subitens abrem `licitacoes`.
- `Legislação > Leis Municipais` abre `leis-municipais`.
- `Legislação > Decretos` abre `decretos`.
- `Legislação > Portarias` abre `portarias`.
- `Contato > Fale Conosco` abre `contato`.
- `Secretarias` abre detalhes conforme secretaria clicada.

## 5. Secretarias

### Paginas

Arquivos principais:

- `src/pages/SecretariaDetailPage.tsx`
- `src/App.tsx`
- `src/App.css`

Foram criadas/ajustadas:

- listagem/diretorio de secretarias
- pagina de detalhe de secretaria

### Dados oficiais inseridos

Dados baseados na tabela enviada pelo usuario:

- Cultura
  - Responsavel: Wladimir Roberto Garcia de Paula Santos
  - Telefone: `(12) 3646-9900 / 202`
  - E-mail: `turismo@roseira.sp.gov.br`
  - Endereco: `Praca Sant'Ana, 201`
- Administracao
  - Responsavel: Isaac Pontes
  - Telefone: `Nao declarado`
  - E-mail: `administracao@roseira.sp.gov.br`
  - Endereco: `Praca Sant'Ana, 201, Centro - Roseira`
- Esporte, Turismo e Lazer
  - Responsavel: Zaneth de Sousa Miranda
  - Telefone: `(12) 3646-3394`
  - E-mail: `secesportesroseira@gmail.com`
  - Endereco: `R. Dep. Antonio Silvio Cunha Bueno - Nova Era`
- Educacao
  - Responsavel: Leonaria Rodrigues de Sousa Correa
  - Telefone: `(12) 3646-9900`
  - E-mail: `educacao@roseira.sp.gov.br`
  - Endereco: `Extensao da Praca Sant'Ana, 02 - Centro - Roseira/SP`
- Assistencia Social
  - Responsavel: Fabiana Caltabiano de Souza Siqueira
  - Telefone: `Nao declarado`
  - E-mail: `psroseira@yahoo.com.br`
  - Endereco: `Rua Cel. Rodophiano de Barros, 97 - Centro - Roseira/SP`
- Financas
  - Responsavel: Luiz Carlos Rodrigues
  - Telefone: `(12) 3646-9900`
  - E-mail: `lcarlos@roseira.sp.gov.br`
  - Endereco: `Praca Sant'Ana, 201 - Centro - Roseira/SP`
- Saude
  - Responsavel: Joao Bosco de Almeida Maia
  - Telefone: `(12) 3646-1210`
  - E-mail: `sms@roseira.sp.gov.br`
  - Endereco: `Roque Vieira da Silva No197`

### Layout definido

- Hero no padrao escuro.
- Cards de contato abaixo do hero.
- Card `Titular da Secretaria` deve ficar na lateral esquerda.
- Conteudo `Sobre a Secretaria` e `Competencias` deve ficar ao lado direito.
- Cards de `Horarios Detalhados` e mapa inferior foram removidos.
- Card do titular tem faixa amarela lateral esquerda, nao superior.
- A faixa lateral deve aparecer somente nesse card do titular, nao em todos.
- Checks das competencias devem ser verde escuro.
- Cards de contato devem:
  - nao ter borda pesada
  - usar icone amarelo
  - ter hover com borda fina
  - alinhar conteudo horizontalmente

### Avatar do titular

- Classe: `secretaria-detail-manager-avatar`
- Foi aumentado para:
  - `width: 66px`
  - `height: 66px`
  - `font-size: 18px`
- Importante: esse ajuste foi separado de `secretaria-directory-avatar` para nao afetar a listagem.

## 6. Noticias

### Arquivo

- `src/pages/NoticiasPage.tsx`

### Listagem

- Criada pagina de listagem de noticias.
- Cards seguem padrao visual do site.
- Ao clicar em noticia, abre pagina de detalhe.
- Campo de busca foi substituido por select de ano.
- Filtros por categoria seguem botoes arredondados com fonte mais bold.
- Tag `Comunicacao` foi removida.
- Tags seguem padrao visual solicitado:
  - badge colorida por categoria
  - data
  - visualizacao/olho

### Detalhe

- Criada pagina de detalhe da noticia.
- Contem:
  - hero com titulo e metadados
  - imagem principal
  - album de imagens
  - texto
  - acoes
  - sidebar com previa de outras noticias
- Sidebar de noticias serviu como referencia para hover de `Outras Leis`.

## 7. Concursos

### Arquivo

- `src/pages/ConcursosPage.tsx`

### Ajustes importantes

- Cards de resumo foram padronizados.
- Foi adicionado card `Todos os processos`.
- O card `Todos os processos` deve:
  - ficar sempre em primeiro
  - ser amarelo
  - texto padronizado exatamente como `Todos os processos`
- Card `Edital` ficou em vermelho.
- Quando houver apenas 3 cards em alguma listagem/pagina, eles devem ocupar a largura do container.
- Botoes de filtros em caixa alta foram alterados para texto normal com apenas primeira letra maiuscula.
- Fonte dos botoes foi deixada mais bold conforme imagem.

## 8. Licitacoes

### Arquivo

- `src/pages/LicitacoesPage.tsx`

### Listagem

- Criada pagina de listagem de licitacoes.
- Segue o padrao de layout ja definido.
- Reutiliza classes de concursos/listagens quando possivel.
- Cards clicaveis redirecionam para detalhe.
- A seta visual foi ajustada ate chegar a icone de seta, nao texto "Ver detalhes".
- Status `Ativo` deve ter tag verde igual em concursos.
- Card `Todos os processos` deve ficar em primeiro.

### Detalhe

- Ao clicar em uma licitacao, abre pagina de detalhe.
- No detalhe:
  - documentos ficam abaixo de `Objeto`
  - sidebar mostra previa de outras licitacoes
  - sidebar deve listar as que estao em aberto
  - botao `Edital` ficou menor, amarelo, sem sombra, sem borda pesada
  - hover do botao `Edital` segue padrao do botao amarelo/LGPD
  - status fica com tag colorida como na listagem

## 9. Leis Municipais

### Arquivo

- `src/pages/LeisMunicipaisPage.tsx`

### Listagem

- Criada pagina de listagem de leis municipais.
- Filtros:
  - numero/descricao
  - ano
- Filtros foram tirados de dentro de container branco grande; devem ficar soltos como na referencia com select arredondado.
- Ao clicar em uma lei, deve abrir pagina de detalhe.
- Em determinado momento a listagem ficou centralizada; usuario pediu voltar como estava.
- Ajustado:
  - `.leis-result-card`
  - conteudo alinhado a esquerda

### Detalhe

- Criada pagina de detalhe de lei.
- Sidebar `Outras Leis` usa cards com hover igual ao de noticias.
- Hover ajustado em `.licitacao-related-card` para:
  - borda transparente no normal
  - borda fina no hover
  - leve `translateY(-1px)`

### Cards de resumo

- `Consulta Publica` deve ficar em vermelho.
- Usuario pediu adicionar `Todos`, depois desfez e pediu para fazer em concursos. Portanto Leis Municipais ficou sem card `Todos`.

## 10. Decretos e Portarias

### Implementacao

- Usam o mesmo componente de Leis Municipais com configuracao.
- Foram adicionados dados mockados em `src/App.tsx`.
- Foram adicionadas configuracoes reutilizaveis:
  - `DECRETOS_CONFIG`
  - `PORTARIAS_CONFIG`

### Rotas

- `decretos`
- `decreto-detail`
- `portarias`
- `portaria-detail`

### Header

- `Legislação > Decretos` abre pagina de decretos.
- `Legislação > Portarias` abre pagina de portarias.

## 11. Historia de Roseira

### Arquivo

- `src/pages/HistoriaRoseiraPage.tsx`

### Primeiro pedido

- Criar pagina sobre historia de Roseira.
- A pagina foi criada com hero, breadcrumb, conteudo institucional, cards e linha do tempo.

### Ajuste posterior

Usuario pediu:

- parte do header seguir o padrao das outras paginas
- restante da pagina mais interessante, imersivo, com imagens da cidade

### Estado atual esperado

- Hero/header no padrao escuro das outras paginas.
- Conteudo mais editorial/imersivo.
- Secoes:
  - narrativa de abertura sobre Roseira Velha e trilhos
  - imagem grande do Espaco Arte, Cultura e Turismo
  - linha de marcos historicos
  - bloco visual amplo
  - galeria com fotos reais
  - linha do tempo
  - card final sobre Vale do Paraiba, Rota da Fe e caminhos historicos

### Imagens usadas

- Estacao ferroviaria:
  - `https://www.estacoesferroviarias.com.br/r/fotos/roseira0151.jpg`
- Espaco Arte, Cultura e Turismo:
  - `https://www.roseira.sp.gov.br/public/admin/globalarq/uploads/files/IMG_3925.JPG`
- Igreja Matriz:
  - `https://chaocaipira.org.br/wp-content/uploads/2024/10/igreja-matriz-roseira.jpg`
- Mosteiro da Sagrada Face:
  - `https://www.roseira.sp.gov.br/admin/globalarq/noticia/noticia/651_366/ce43c18f7f09b2e8eb19eb78acb85c01.jpeg`
- Paco/Prefeitura:
  - `https://www.roseira.sp.gov.br/admin/globalarq/noticia/noticia/651_366/cf55a1f50949a2bec2c8996f18f0a62a.png`

## 12. Contato

### Arquivo

- `src/pages/ContatoPage.tsx`

### Rota

- `contato`
- Acessada por `Contato > Fale Conosco`.

### Hero

- Hero escuro no padrao das outras paginas.
- Breadcrumb:
  - Inicio
  - Contato
  - Fale Conosco
- Titulo:
  - `Fale com a Prefeitura`

### Cards superiores

Usuario pediu que a area dos cards ficasse igual ao padrao das secretarias.

Estado atual:

- A faixa superior da pagina de contato deve ser branca.
- Cards ficam centralizados em uma linha.
- Cards tem fundo cinza claro.
- Usam classes base:
  - `secretaria-detail-contact-grid`
  - `secretaria-detail-contact-card`
  - `secretaria-detail-contact-icon`
- Tambem usam classes especificas:
  - `contato-channel-grid-reference`
  - `contato-channel-card-reference`

Cards:

- Telefone
  - `(12) 3646-9900`
  - `Atendimento em dias uteis`
- E-mail
  - `contato@roseira.sp.gov.br`
  - `Canal institucional da Prefeitura`
- Endereco
  - `Praca Sant'Ana, 201 - Centro`
  - `Roseira/SP - CEP 12580-017`
- Atendimento
  - `Segunda a sexta, das 8h as 17h`
  - `Exceto feriados e pontos facultativos`

### Formulario

- Formulario com:
  - Nome
  - E-mail
  - Assunto
  - Mensagem
- Ao enviar, exibe estado de sucesso.
- Botao `Enviar mensagem`:
  - usa `sx-220`
  - usa `lgpd-yellow-button`
  - sem sombra
  - alinhamento com icone `Send`

### Canais digitais

- Links:
  - Ouvidoria
  - e-SIC
  - Portal da Transparencia
  - Carta de Servicos
- Devem ser botoes verde escuro, redondos, com texto branco.
- Classe criada:
  - `site-green-pill-button`
- Fonte reduzida para `font-weight: 600`.

### Mapa de localizacao

- O preview estatico foi trocado por Google Maps.
- Usa iframe com query para:
  - Prefeitura Municipal de Roseira
  - Praca Sant'Ana 201
  - Roseira SP
- Classe do container:
  - `contato-map-preview`

## 13. Mapa Turistico na Home

### Imagem principal

- Arquivo:
  - `public/mapa-cidade-de-roseira.png`
- A imagem ocupa toda a largura da tela.
- A proporcao foi ajustada para evitar corte:
  - `aspect-ratio: 2240 / 480`
  - `object-fit: fill`

### Posicionamento da chamada

- O card `Interaja com o mapa` fica fora da imagem.
- Fica no topo direito, oposto ao titulo.
- Nao possui sombra.

### Interatividade

- O mapa possui pontos clicaveis posicionados por porcentagem.
- Ao clicar em um ponto turistico, abre card lateral com:
  - nome
  - descricao
  - endereco
  - foto real
  - botao `Como chegar`
  - botao `Compartilhar`
  - botao de fechar
- No mobile, o card aparece abaixo/ajustado para nao quebrar layout.

### Pontos turisticos configurados

- Estacao Ferroviaria de Roseira
  - x: `10.8`
  - y: `58.5`
- Espaco Arte, Cultura e Turismo Ana Claudia Giovanelli Fazzeri
  - x: `23.4`
  - y: `38.8`
- Igreja Matriz de Sant'Ana
  - x: `32.4`
  - y: `76.2`
- Mosteiro da Sagrada Face
  - x: `43.4`
  - y: `52`
- Paco Municipal de Roseira
  - x: `60.4`
  - y: `53.2`
- Igreja de Nossa Senhora da Piedade
  - x: `79.3`
  - y: `52`
- Praca da Matriz
  - x: `74.6`
  - y: `77`
- Caminho Velho da Estrada Real
  - x: `92.6`
  - y: `57.4`

### Classes principais do mapa

- `tourism-map-section`
- `tourism-map-header`
- `tourism-map-heading`
- `tourism-map-cta`
- `tourism-map-full`
- `tourism-map-card`
- `tourism-map-point`
- `tourism-map-point-active`
- `tourism-map-info-card`
- `tourism-map-close`
- `tourism-map-info-content`
- `tourism-map-address`
- `tourism-map-actions`

## 14. Rodape e Newsletter

- Usuario pediu inicialmente para mover newsletter para o rodape com efeito vazado.
- Depois pediu para desfazer.
- Estado esperado:
  - newsletter continua na home como estava, nao fixa no rodape.
- O mapa turistico foi adicionado acima do rodape.

## 15. Classes Criadas ou Ajustadas

### Botoes

- `lgpd-yellow-button`
- `site-green-pill-button`

### Contato

- `contato-page-view`
- `contato-page-hero`
- `contato-page-section`
- `contato-channel-grid`
- `contato-channel-grid-reference`
- `contato-channel-card-reference`
- `contato-page-layout`
- `contato-form-panel`
- `contato-form`
- `contato-success-message`
- `contato-side-panel`
- `contato-link-list`
- `contato-map-preview`

### Mapa turistico

- `tourism-map-section`
- `tourism-map-header`
- `tourism-map-full`
- `tourism-map-card`
- `tourism-map-point`
- `tourism-map-info-card`
- `tourism-map-close`

### Historia

- `historia-page-view`
- `historia-page-hero`
- `historia-immersive-section`
- `historia-immersive-grid`
- `historia-story-card`
- `historia-feature-image`
- `historia-stat-row`
- `historia-wide-image`
- `historia-gallery-grid`
- `historia-gallery-card`
- `historia-timeline-panel`
- `historia-location-card`

### Secretarias

- `secretaria-detail-manager-avatar` aumentado para 66px.
- `secretaria-detail-contact-card` usado tambem em contato.

### Legislacao

- `leis-result-card`
- `licitacao-related-card`
- configuracoes de pagina para Leis/Decretos/Portarias.

## 16. Arquivos Criados

- `src/pages/ContatoPage.tsx`
- `src/pages/HistoriaRoseiraPage.tsx`
- `src/pages/LicitacoesPage.tsx`
- `src/pages/LeisMunicipaisPage.tsx`
- `CONTEXTO_CONVERSA.md`

## 17. Arquivos Bastante Alterados

- `src/App.tsx`
- `src/App.css`
- `src/pages/SecretariaDetailPage.tsx`
- `src/pages/NoticiasPage.tsx`
- `src/pages/ConcursosPage.tsx`

## 18. Pendencias e Cuidados para Proximos Passos

- Se o usuario pedir ajuste visual, verificar screenshot/navegador quando possivel.
- Se mudar qualquer texto com acento, checar mojibake.
- Se adicionar novas paginas ao header, atualizar:
  - tipo `AppPage`
  - funcao `isActiveItem`
  - handlers de clique desktop/mobile
  - renderizacao no `main`
- Se criar novo tipo de listagem, tentar reaproveitar:
  - layout de Concursos/Licitacoes/Leis
  - cards e tags ja existentes
- Se criar novo botao:
  - amarelo: usar visual de `lgpd-yellow-button`
  - verde escuro: usar `site-green-pill-button`
- Se mexer nos cards superiores de contato, manter visual igual aos cards de secretarias.
- Se mexer no mapa turistico, lembrar que pontos estao em porcentagem e dependem da proporcao `2240 / 480`.

## 19. Estado Atual Esperado

- Projeto compila.
- Home abre em `http://localhost:5173/`.
- Header navega para:
  - Historia de Roseira
  - Contato
  - Noticias
  - Licitacoes
  - Leis Municipais
  - Decretos
  - Portarias
  - Secretarias
- Pagina de contato tem:
  - cards superiores iguais aos de secretarias
  - formulario
  - botoes verdes nos canais digitais
  - Google Maps embutido
- Pagina de historia tem visual mais imersivo com imagens reais.
- Mapa turistico da home esta interativo.

## 20. Fluxo de Estado e Navegacao no `App.tsx`

### Estado principal

O `App` usa estado local para simular rotas de SPA:

- `page`: define qual tela esta ativa.
- `activeNoticiaIndex`: indice da noticia aberta no detalhe.
- `activeLicitacaoIndex`: indice da licitacao aberta no detalhe.
- `activeLeiIndex`: indice da lei aberta no detalhe.
- `activeDecretoIndex`: indice do decreto aberto no detalhe.
- `activePortariaIndex`: indice da portaria aberta no detalhe.
- `activeSecretariaSlug`: slug da secretaria aberta no detalhe.

### Funcoes de navegacao

Padrao usado:

- `navigate(nextPage)`
  - atualiza `page`
  - rola para o topo com `window.scrollTo({ top: 0, behavior: "smooth" })`
- `openNoticia(index)`
  - salva indice
  - navega para `noticia-detail`
- `openLicitacao(index)`
  - salva indice
  - navega para `licitacao-detail`
- `openLei(index)`
  - salva indice
  - navega para `lei-detail`
- `openDecreto(index)`
  - salva indice
  - navega para `decreto-detail`
- `openPortaria(index)`
  - salva indice
  - navega para `portaria-detail`
- `openSecretaria(slug)`
  - salva slug
  - navega para `secretaria-detail`

### Renderizacao condicional no `main`

O `main` renderiza por cascata de ternarios. Ao adicionar paginas novas, manter o mesmo padrao:

- `page === "concursos"` renderiza `ConcursosPage`
- `page === "historia-roseira"` renderiza `HistoriaRoseiraPage`
- `page === "contato"` renderiza `ContatoPage`
- `page === "licitacoes"` renderiza `LicitacoesPage`
- `page === "licitacao-detail"` renderiza `LicitacaoDetailPage`
- `page === "leis-municipais"` renderiza `LeisMunicipaisPage`
- `page === "lei-detail"` renderiza `LeiMunicipalDetailPage`
- `page === "decretos"` renderiza `LeisMunicipaisPage` com `DECRETOS_CONFIG`
- `page === "decreto-detail"` renderiza `LeiMunicipalDetailPage` com `DECRETOS_CONFIG`
- `page === "portarias"` renderiza `LeisMunicipaisPage` com `PORTARIAS_CONFIG`
- `page === "portaria-detail"` renderiza `LeiMunicipalDetailPage` com `PORTARIAS_CONFIG`
- `page === "noticias"` renderiza `NoticiasPage`
- `page === "noticia-detail"` renderiza `NoticiaDetailPage`
- `page === "secretarias"` renderiza `SecretariasDirectoryPage`
- `page === "secretaria-detail"` renderiza `SecretariaDetailPage`
- Caso contrario, renderiza a home.

### Home atual

A home, no estado atual esperado, renderiza:

- `HeroSlider`
- `AcessoRapido`
- `Noticias`
- `Publicacoes`
- `Galeria`
- `Secretarias`
- `CalendarioEventos`
- `Transparencia`
- `SocialNewsletter`
- `FaleConosco`
- `MapaTuristico`
- depois, fora do `main`, `Footer` e `CookieBanner`

## 21. Componentes Principais e Responsabilidades

### `SearchBar`

- Fica no header fixo.
- Usa classes:
  - `.sx-28`
  - `.sx-29`
  - `.sx-30`
  - `.sx-31`
  - `.sx-32`
- O botao `Buscar` e `.sx-32`.
- Hover de `.sx-32`:
  - background `var(--yellow-dark)`
  - border `var(--yellow-dark)`
  - transform `translateY(-1px)`
- Nao foi implementada busca funcional real; atualmente e visual/estado local.

### `NavBar`

- Controla menu desktop e mobile.
- Usa `NAV_ITEMS`.
- Usa `isActiveItem(label)` para aplicar `nav-item-active`.
- Em desktop, os subitens usam `a href="#"` com `event.preventDefault()` quando ha navegacao SPA.
- Em mobile, clicar no item principal navega para a primeira pagina relevante do grupo.

### `Header`

- Logo e nome da Prefeitura ficam dentro de um botao/link visual.
- Clicar volta para home.

### `CookieBanner`

- Contem botao `Aceitar todos`.
- Classe importante do botao:
  - `sx-220`
- O visual desse botao virou referencia para botoes amarelos.

## 22. Inventario de Dados no `App.tsx`

### `NAV_ITEMS`

Contem os menus principais e submenus.

Grupos atuais:

- A Prefeitura
- Secretarias
- Servicos
- Noticias
- Licitacoes
- Concursos
- Transparencia
- Legislacao
- Contato

Se adicionar novo submenu que deve navegar, atualizar o `onClick` dentro do mapa de `item.children`.

### `LEGISLACAO`

- Dados de leis municipais.
- Tambem serviu como base inicial para a pagina de leis.
- Campos:
  - `num`
  - `desc`
  - `date`
  - `status`

### `DECRETOS`

- Dados mockados de decretos.
- Mesma estrutura de `LEGISLACAO`.

### `PORTARIAS`

- Dados mockados de portarias.
- Mesma estrutura de `LEGISLACAO`.

### `LICITACOES`

- Dados de licitacoes.
- Campos:
  - `num`
  - `desc`
  - `date`
  - `status`

### `CONCURSOS`

- Dados exibidos em publicacoes/concursos.
- Categorias e cards foram ajustados para seguir padrao visual.

### `NOTICIAS`

- Dados da home, listagem e detalhe de noticias.
- Campos:
  - `cat`
  - `catColor`
  - `date`
  - `views`
  - `title`
  - `desc`
  - `img`

### `SECRETARIA_DETAILS`

- Lista principal usada para detalhes das secretarias.
- Campos:
  - `slug`
  - `nome`
  - `shortName`
  - `diretor`
  - `cargo`
  - `horario`
  - `end`
  - `tel`
  - `email`
  - `summary`
  - `sobre`
  - `competencias`

### `SECRETARIA_MENU_SLUGS`

- Mapeia nomes do submenu de secretarias para slugs.
- Se adicionar secretaria no menu, atualizar esse objeto.

## 23. Detalhamento de CSS por Area

### Header ativo

Classe:

- `.sx-35.nav-item-active::after`

Comportamento:

- cria linha amarela abaixo do item ativo.
- deve usar `var(--yellow)`.

### Cards de contato de secretarias

Classes:

- `.secretaria-detail-contact-grid`
- `.secretaria-detail-contact-card`
- `.secretaria-detail-contact-icon`

Estilo esperado:

- grid de 4 colunas em desktop
- card cinza claro
- sem sombra
- hover com borda fina
- icone amarelo
- conteudo horizontal

Observacao:

- Esses cards foram reutilizados na pagina de contato.
- Nao alterar de forma que quebre secretarias se estiver ajustando apenas contato. Preferir classes especificas complementares, como `contato-channel-card-reference`.

### Card titular da secretaria

Classes:

- `.secretaria-detail-manager`
- `.secretaria-detail-manager::before`
- `.secretaria-detail-manager-avatar`

Estilo esperado:

- faixa amarela lateral esquerda.
- avatar circular maior.
- avatar atual: 66px.
- esse ajuste nao deve afetar `.secretaria-directory-avatar`.

### Botoes amarelos

Classes:

- `.sx-220`
- `.lgpd-yellow-button`

Uso:

- botao `Enviar mensagem`.
- pode ser usado em botoes que precisam copiar visual do LGPD.

### Botoes verde escuro

Classe:

- `.site-green-pill-button`

Uso atual:

- links de canais digitais na pagina de contato.

Estilo:

- `background: var(--green-dark)`
- `color: var(--white)`
- `border-radius: 9999px`
- `font-weight: 600`

### Listagens

Classes relevantes:

- `.concursos-summary-grid`
- `.concursos-summary-card`
- `.concursos-result-card`
- `.concursos-result-content`
- `.concursos-result-meta`
- `.concursos-status`
- `.concursos-tag`
- `.leis-result-card`
- `.licitacao-related-card`

Pontos importantes:

- Listagens de leis devem ficar alinhadas a esquerda.
- `licitacao-related-card` tambem e usado para sidebars de leis/decretos/portarias.

## 24. Decisoes Desfeitas ou Corrigidas

### Breadcrumb variavel

- Usuario pediu criar variavel para breadcrumb.
- Depois pediu desfazer.
- Estado atual: breadcrumbs ficam diretamente em cada componente.

### Newsletter no rodape

- Usuario pediu mover newsletter para rodape com efeito vazado.
- Depois pediu desfazer.
- Estado atual: newsletter continua na home, nao fixa no rodape.

### Card "Todos" em Leis Municipais

- Usuario pediu adicionar mais um card com "todos".
- Depois esclareceu que queria isso na pagina de concursos.
- Estado atual:
  - Concursos tem `Todos os processos`.
  - Leis Municipais nao deve ter card extra `Todos`.

### Setas em licitacoes

- Usuario pediu trocar "Ver detalhes" por seta.
- Depois pediu desfazer uma versao.
- Depois pediu seta mais fina, depois nao tao fina, depois icone de seta.
- Estado esperado: usar icone de seta, nao texto "Ver detalhes".

### Cards com faixa amarela

- Usuario pediu faixa amarela lateral, mas depois corrigiu que era apenas no card do titular da secretaria.
- Estado atual: apenas o card `Titular da Secretaria` deve ter faixa lateral amarela.

## 25. Conteudo e Copy Especificos

### Contato

Hero:

- Titulo: `Fale com a Prefeitura`
- Subtitulo: `Envie sua mensagem, consulte os canais oficiais e encontre informacoes para atendimento presencial.`

Formulario:

- Titulo do painel: `Como podemos ajudar?`
- Campos:
  - Nome
  - E-mail
  - Assunto
  - Mensagem
- Opcoes de assunto:
  - Informacoes gerais
  - Servicos municipais
  - Ouvidoria
  - Solicitacao de atendimento

Mensagem de sucesso:

- Titulo: `Mensagem enviada`
- Texto: `Recebemos sua solicitacao. A equipe responsavel fara o atendimento pelo canal informado.`

### Historia

Hero:

- Titulo: `Historia de Roseira`
- Subtitulo: `Uma cidade moldada por caminhos antigos, pela ferrovia, pela fe e pela vida comunitaria do Vale do Paraiba.`

Conceitos que devem permanecer:

- Roseira Velha
- Caminho Real
- ferrovia
- Igreja Matriz de Sant'Ana
- Mosteiro da Sagrada Face
- Rota da Fe
- Vale do Paraiba

### Mapa turistico

Chamada:

- Titulo da secao: `Mapa turistico de Roseira`
- Card: `Interaja com o mapa`
- Texto: `Clique nos pontos turisticos para explorar a cidade.`

## 26. Responsividade

### Cards de contato

- Desktop: 4 colunas.
- Tablet: 2 colunas.
- Mobile: 1 coluna.

### Pagina de contato

- Desktop:
  - formulario e sidebar lado a lado.
- Mobile/tablet:
  - `contato-page-layout` vira 1 coluna.
  - botao do formulario ocupa 100% no mobile.

### Mapa turistico

- Desktop:
  - imagem full width.
  - card de detalhe aparece sobre o mapa, a direita.
- Mobile:
  - card de detalhe passa para fluxo relativo para nao quebrar layout.
  - pontos diminuem.

### Historia

- Desktop:
  - grid editorial com texto e imagem.
  - cards em 3 colunas quando aplicavel.
- Mobile:
  - grids viram 1 coluna.
  - imagens mantem altura minima.

## 27. Checklist para Nova Pagina no Padrao do Site

Quando criar uma nova pagina:

1. Criar arquivo em `src/pages/NomePage.tsx`.
2. Usar hero escuro com breadcrumb.
3. Usar classes:
   - `site-title`
   - `site-subtitle`
   - `site-card-title`
   - `site-panel-title`
   - `site-caps-title`
   - `site-text`
4. Adicionar tipo no `AppPage`.
5. Importar pagina no `App.tsx`.
6. Adicionar `page === "..."`
7. Se vier do header, atualizar clique desktop e mobile.
8. Atualizar `isActiveItem`.
9. Adicionar CSS no `src/App.css`, tentando reaproveitar classes existentes.
10. Rodar build.
11. Checar mojibake nos arquivos alterados.

## 28. Checklist para Ajuste Visual Solicitado por Screenshot

1. Identificar a tela exata.
2. Localizar componente e classes atuais com `rg`.
3. Conferir se existe classe reutilizavel ja definida.
4. Aplicar ajuste com o menor escopo possivel.
5. Evitar mudar classes compartilhadas se o ajuste for especifico de uma pagina.
6. Se mexer em classe compartilhada, conferir paginas que tambem usam essa classe.
7. Rodar build.
8. Checar mojibake.
9. Se o usuario indicar que continua diferente, idealmente verificar no navegador/local.

## 29. Termos e Nomes que o Usuario Espera

Alguns textos devem manter esta grafia quando possivel:

- `Todos os processos`
- `Fale com a Prefeitura`
- `Interaja com o mapa`
- `Mapa turistico de Roseira`
- `Titular da Secretaria`
- `Sobre a Secretaria`
- `Competencias`
- `Canais digitais`
- `Mapa de localizacao`
- `Enviar mensagem`
- `Aceitar todos`

## 30. Observacoes sobre Imagens

### Imagens locais

Ativos locais encontrados:

- `public/mapa-cidade-de-roseira.png`
- `public/prefeitura-de-roseira-logo.png`
- `public/favicon.svg`
- `public/icons.svg`
- `src/assets/hero.png`

### Imagens externas

Foram usadas URLs externas em:

- Historia de Roseira
- Mapa turistico
- Noticias usam Unsplash em alguns itens

Em ajustes futuros, se o usuario fornecer fotos oficiais locais, preferir substituir as URLs externas por arquivos em `public`.

## 31. Riscos Conhecidos

- URLs externas de imagens podem sair do ar ou bloquear hotlink.
- O projeto ainda usa estado local para rotas; recarregar a pagina nao preserva rota real.
- Google Maps embed depende de acesso externo.
- Busca principal do header ainda nao tem busca real.
- Formularios sao simulados; nao enviam para backend.
- Muitos estilos usam classes `sx-*`, entao alteracoes globais podem ter efeitos inesperados.

## 32. Como Validar Manualmente no Navegador

Com servidor rodando em `http://localhost:5173/`:

1. Abrir home.
2. Testar header:
   - A Prefeitura > Historia de Roseira
   - Contato > Fale Conosco
   - Noticias > Ultimas Noticias
   - Legislacao > Leis Municipais
   - Legislacao > Decretos
   - Legislacao > Portarias
3. Conferir linha amarela no item ativo.
4. Na home, rolar ate mapa turistico.
5. Clicar em pontos turisticos.
6. Abrir contato.
7. Conferir cards superiores.
8. Conferir Google Maps.
9. Enviar formulario e ver estado de sucesso.
10. Abrir secretarias e conferir card do titular.

## 33. Ultimas Alteracoes Antes Deste Documento

As ultimas alteracoes feitas antes da expansao deste arquivo foram:

- criacao/expansao do proprio `CONTEXTO_CONVERSA.md`;
- aumento do avatar circular do titular da secretaria;
- reducao do peso da fonte dos botoes verdes;
- criacao de `site-green-pill-button`;
- ajuste do hover do botao `Buscar`;
- botao `Enviar mensagem` usando `sx-220` e `lgpd-yellow-button`;
- Google Maps no bloco de contato;
- cards superiores de contato ajustados para o padrao dos cards de secretarias.
