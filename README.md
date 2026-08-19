# Ótica Millenium PDV — estrutura inicial

Primeira versão visual/funcional do sistema da Ótica Millenium.

## O que já existe nesta versão

- Dashboard responsivo
- Menu completo do sistema
- Cadastro inicial de clientes com persistência local (localStorage)
- Ficha da cliente com resumo, receita, histórico de compra e linha do tempo
- Fluxo de nova venda: óculos completo, somente lentes, somente armação e serviço/ajuste
- Área de receita com OD/OE, esférico, cilíndrico, eixo e DNP
- Estrutura para foto/anexo da receita
- Cadastro visual de armações
- Tabela de lentes/tratamentos
- Ordens de serviço
- Quadro de acompanhamento do laboratório
- Avaliações verificadas
- Módulos reservados para estoque, fornecedores, financeiro, pós-venda e configurações
- Identidade azul, branco e preto da Ótica Millenium

## Importante

Esta é a **fundação do frontend**. Dados sensíveis (receitas, documentos, fotos, dados pessoais) ainda NÃO devem ser usados em produção. Na próxima etapa será necessário criar backend, autenticação, banco de dados e armazenamento privado.

## Rodar localmente

```bash
npm install
npm run dev
```

## Publicar

Pode ser publicado com Cloudflare Pages/Workers depois que o backend e as variáveis de ambiente forem configurados.

## Próximas etapas recomendadas

1. Banco de dados e autenticação
2. CRUD real de clientes/receitas
3. Armações + variações de cor + fotos
4. Lentes + tratamentos + laboratórios
5. Venda e financeiro
6. OS/guia do laboratório em PDF
7. Upload privado da receita
8. Catálogo público estilo marketplace
9. WhatsApp para modelo/cor selecionados
10. Avaliações verificadas e pós-venda
