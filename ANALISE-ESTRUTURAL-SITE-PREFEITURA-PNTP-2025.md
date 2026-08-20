# Análise estrutural do site - Checklist PNTP 2025

Base: `CHECKLIST-SITE-PREFEITURA-PNTP-2025.md`

Escopo desta análise: verificar apenas **estrutura, páginas, navegação e funcionalidades já implementadas** no projeto. Conteúdo final, arquivos oficiais, bases de dados, URLs externas definitivas e documentos ainda não inseridos não foram cobrados como ausência de conteúdo, mas foram apontados como pendência estrutural quando não há local/funcionalidade para recebê-los.

Legenda:

- **Atende estruturalmente:** existe página, bloco, navegação ou componente preparado para o requisito.
- **Parcial estrutural:** existe algum caminho visual ou placeholder, mas falta rota, link real, comportamento funcional ou seção específica.
- **Não localizado na estrutura:** não encontrei página, bloco ou funcionalidade dedicada no código.
- **Depende de conteúdo:** a estrutura existe em parte, mas o cumprimento real dependerá dos dados/documentos oficiais.

## Resumo executivo

- O site já tem boa base institucional: cabeçalho completo, menu por áreas, páginas de Secretarias, Contato, Licitações, Concursos, Legislação, Decretos, Portarias, Notícias e seção de Transparência na home.
- Os requisitos mais bem estruturados hoje são: acesso ao Portal da Transparência, breadcrumbs, Secretarias/competências/responsáveis, contatos/horários, atos normativos, licitações, concursos, acessibilidade básica, Ouvidoria/e-SIC como atalhos e contato institucional.
- A maior lacuna estrutural é que muitos atalhos importantes ainda são `href="#"`, sem rota própria nem URL externa configurada.
- Também não há estrutura dedicada para receitas/despesas detalhadas, dívida ativa, empenhos, transferências, folha/remuneração, diárias, contratos completos, obras, prestação de contas, LAI estatística, dados abertos, saúde detalhada e lista de creches.

## Atende estruturalmente

- [x] **Portal da Transparência visível na capa do site**
  - Evidência: botão rápido no cabeçalho `Portal da Transparência`; menu principal `Transparência`; seção home `Transparência e Acesso à Informação`; acesso rápido com `Portal da Transparência`.
  - Observação: estruturalmente existe, mas os links ainda apontam para `#`.

- [x] **Caminho de navegação nas páginas**
  - Evidência: breadcrumbs em `ConcursosPage`, `LicitacoesPage`, `LeisMunicipaisPage`, `NoticiasPage`, `SecretariaDetailPage`, `ContatoPage` e páginas de detalhe.

- [x] **Estrutura organizacional da Prefeitura**
  - Evidência: menu `A Prefeitura > Estrutura Administrativa`, menu `Secretarias` e página `Secretarias Municipais`.
  - Observação: não há organograma formal, mas existe diretório de unidades administrativas.

- [x] **Competências e atribuições das Secretarias**
  - Evidência: página de detalhe da secretaria possui seção `Competências` com lista por unidade.

- [x] **Responsáveis atuais pela gestão**
  - Evidência: cards de Secretarias e página de detalhe exibem titular/responsável, cargo, e contatos.
  - Observação: alguns dados aparecem como `Não declarado`, o que é aceitável como placeholder, mas exige preenchimento oficial depois.

- [x] **Endereços, telefones e e-mails institucionais**
  - Evidência: página `Contato`, cards de contato e detalhe de Secretarias exibem endereço, telefone, e-mail e mapa.

- [x] **Horário de atendimento**
  - Evidência: barra superior informa `Seg. a Sex. das 8h às 17h`; página `Contato`; cards de Secretarias.

- [x] **Atos normativos próprios**
  - Evidência: rotas/páginas para `Leis Municipais`, `Decretos` e `Portarias`, com busca, filtro por ano e página de detalhe.
  - Observação: estrutura existe; documentos oficiais ainda precisam ser inseridos.

- [x] **Editais de concursos e seleções**
  - Evidência: página `Concursos e Seleções Públicas`, cards por tipo, lista de processos e filtros visuais.
  - Observação: os itens são links `#`; falta página de detalhe/documentos.

- [x] **Relação sequencial de licitações**
  - Evidência: página `Licitações` com lista, número, objeto, data, status, filtro por ano e busca funcional.

- [x] **Íntegra dos editais**
  - Evidência: página de detalhe de licitação tem bloco `Documentos` com ação `Edital`.
  - Observação: link ainda é `#`, então atende apenas como espaço estrutural.

- [x] **Símbolo/ferramentas de acessibilidade**
  - Evidência: barra superior tem `VLibras`, controles de fonte `A-`, `A`, `A+`, skip link `Pular para o conteúdo principal`.
  - Observação: VLibras é botão visual sem integração confirmada.

- [x] **Redimensionamento de texto**
  - Evidência: estado `fontSize` no `App` aplica classes `font-scale-small`, `font-scale-normal`, `font-scale-large`; botões na barra superior.

- [x] **Atendimento presencial da Ouvidoria / canais de contato**
  - Evidência: página `Contato`, formulário, bloco de atendimento presencial, botão `Ouvidoria`.
  - Observação: não há página própria de Ouvidoria nem URL real configurada.

## Parcial estrutural

- [ ] **Busca interna no site institucional**
  - Evidência: `SearchBar` no cabeçalho com campo e botão `Buscar`.
  - Pendência: o campo guarda estado, mas não executa pesquisa nem exibe resultados.

- [ ] **Busca interna no Portal da Transparência**
  - Evidência: existe atalho para Portal da Transparência.
  - Pendência: não há portal interno implementado nem integração com busca do portal.

- [ ] **Perguntas frequentes reais**
  - Evidência: menu `Serviços > Perguntas Frequentes`.
  - Pendência: não há rota/página de FAQ implementada.

- [ ] **Documentos das fases interna e externa das licitações**
  - Evidência: detalhe de licitação possui área `Documentos`.
  - Pendência: só há botões genéricos `Edital` e `Publicações`; falta estrutura para documentos por fase.

- [ ] **Dispensas e inexigibilidades**
  - Evidência: item no menu `Licitações > Dispensas e Inexigibilidades`.
  - Pendência: não há rota ou tela específica; menu leva genericamente para Licitações.

- [ ] **Atas de adesão ao SRP**
  - Evidência: item no menu `Licitações > Atas de Registro de Preços`.
  - Pendência: não há rota/listagem específica para atas.

- [ ] **Relação de contratos**
  - Evidência: menu `Licitações > Contratos`, menu `Transparência > Contratos`, descrição da seção Transparência cita contratos.
  - Pendência: não há página própria de contratos.

- [ ] **Inteiro teor dos contratos e aditivos**
  - Evidência: menu contém `Contratos` e `Aditivos`.
  - Pendência: falta estrutura de listagem/detalhe/documentos de contratos.

- [ ] **SIC identificado no site**
  - Evidência: barra superior `Acesso à Informação (SIC)`, botão rápido `SIC`, card `Lei de Acesso à Informação`, página Contato com botão `e-SIC`.
  - Pendência: links são `#`; falta página própria/integração do SIC.

- [ ] **Contatos e horário do SIC**
  - Evidência: contato geral e horário geral existem.
  - Pendência: não há bloco específico do SIC com unidade responsável, endereço, telefone, e-mail e horário próprios.

- [ ] **e-SIC disponível**
  - Evidência: atalho `e-SIC` em menu e página Contato.
  - Pendência: não há formulário ou link real para e-SIC.

- [ ] **Pedido de informação simples**
  - Evidência: formulário geral de contato é simples.
  - Pendência: ele não é identificado como e-SIC e não implementa fluxo de pedido LAI.

- [ ] **Alto contraste**
  - Evidência: botão `Alto Contraste` na barra superior.
  - Pendência: não encontrei estado/efeito implementado para alternar contraste.

- [ ] **Carta de Serviços ao Usuário**
  - Evidência: menu `Serviços > Carta de Serviços` e botão na página Contato.
  - Pendência: não há página própria nem estrutura de catálogo de serviços.

- [ ] **Serviços públicos digitais**
  - Evidência: menus e acesso rápido com serviços como IPTU, NFS-e, protocolos, emissão de guias, agendamento.
  - Pendência: são atalhos `#`; não há integração ou páginas de serviço.

- [ ] **Dados abertos**
  - Evidência: menu `Transparência > Dados Abertos`.
  - Pendência: não há página de dados abertos, formatos, catálogo, API ou regras de uso.

- [ ] **Serviços de saúde**
  - Evidência: Secretaria/Diretoria de Saúde tem página, contatos, descrição e competências.
  - Pendência: não há página/listagem de serviços de saúde com horários, profissionais, especialidades e locais.

## Não localizado na estrutura

- [ ] **Dívida ativa**
  - Não encontrei rota, seção ou componente específico.

- [ ] **Consulta de empenhos**
  - Não encontrei estrutura específica além do menu genérico de Transparência/Despesas.

- [ ] **Transferências recebidas**
  - Não encontrei página ou componente específico para convênios/repasses recebidos.

- [ ] **Transferências realizadas**
  - Não encontrei página ou componente específico para repasses realizados.

- [ ] **Acordos sem transferência financeira**
  - Não encontrei estrutura específica.

- [ ] **Relação nominal de servidores**
  - Há menu `Serviços ao Servidor` e `Folha de Pagamento`, mas não estrutura específica de servidores.

- [ ] **Remuneração nominal e tabela remuneratória**
  - Há item de menu `Folha de Pagamento`, mas não página/listagem específica.

- [ ] **Atos de concursos e processos seletivos**
  - A página de concursos lista processos, mas não há detalhe com aprovados, classificações, nomeações e documentos.

- [ ] **Detalhamento de diárias concedidas**
  - Há menu `Diárias e Passagens`, mas não rota/componente específico.

- [ ] **Tabela de valores de diárias**
  - Não localizada.

- [ ] **Fiscais de contratos**
  - Apesar de haver portaria fictícia sobre fiscal de contrato, não há estrutura de fiscais por contrato.

- [ ] **Ordem cronológica de pagamentos**
  - Não localizada.

- [ ] **Quantitativos e preços contratados de obras**
  - Não localizado.

- [ ] **Execução física e financeira de obras**
  - Não localizada.

- [ ] **Obras paralisadas**
  - Menu contém `Obras Públicas`, mas não há página/listagem específica.

- [ ] **Prestação de contas do ano anterior**
  - Menu contém `Prestação de Contas`, mas não há página específica.

- [ ] **Relatório de gestão ou atividades**
  - Não localizado.

- [ ] **Decisão do Tribunal de Contas**
  - Menu contém `Parecer do Tribunal de Contas`, mas não há página específica.

- [ ] **Julgamento das contas pelo Legislativo**
  - Não localizado.

- [ ] **Regulamentação local da LAI**
  - Não localizada.

- [ ] **Relatório anual estatístico da LAI**
  - Não localizado.

- [ ] **Documentos classificados em sigilo**
  - Não localizado.

- [ ] **Informações desclassificadas**
  - Não localizado.

- [ ] **Pesquisa de satisfação**
  - Não localizada.

- [ ] **Plano, programação anual e relatório de gestão da saúde**
  - Não localizado.

- [ ] **Estoque de medicamentos**
  - Não localizado.

- [ ] **Lista de espera em creches**
  - Não localizado.

## Fora da validação estrutural atual

- [ ] **Links diretos funcionam**
  - Não dá para considerar atendido porque muitos links estão como `#`.

- [ ] **Informações estão atualizadas**
  - Depende da inserção/conferência de conteúdo oficial.

- [ ] **Arquivos são pesquisáveis**
  - Depende dos PDFs/documentos finais.

- [ ] **Dados podem ser reutilizados**
  - Depende de planilhas, CSV, JSON, XLSX, APIs ou exportações reais.

- [ ] **Ausências estão justificadas**
  - Não há estrutura visível para mensagens de inexistência/ausência justificada por seção.

## Recomendações estruturais prioritárias

1. Criar uma área/roteamento real de **Transparência** em vez de deixar os cards e menus com `href="#"`.
2. Implementar páginas específicas para: Receitas, Despesas/Empenhos, Convênios, Folha, Diárias, Contratos, Obras, Prestação de Contas, LAI/SIC, Dados Abertos, Saúde e Educação.
3. Transformar a busca do cabeçalho em busca funcional com página de resultados.
4. Implementar o botão de alto contraste com estado real.
5. Criar página de **Carta de Serviços** com catálogo pesquisável e links de solicitação digital.
6. Criar detalhe de concursos com documentos, aprovados, classificações, convocações e nomeações.
7. Criar componentes reutilizáveis para páginas de transparência com: filtros, ano/exercício, busca, download, formatos abertos, campo de atualização e mensagem de ausência justificada.
