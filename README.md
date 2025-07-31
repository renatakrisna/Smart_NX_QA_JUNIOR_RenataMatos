# Smart_NX_QA_JUNIOR - Projeto de Testes Automatizados

Este projeto contém testes automatizados desenvolvidos em Cypress para o sistema OrangeHRM, abrangendo funcionalidades de login, módulo PIM e gerenciamento de funcionários.

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Git

## 🚀 Instalação e Configuração

1. **Clone o repositório:**
```bash
git clone https://github.com/renatakrisna/Smart_NX_QA_JUNIOR_RenataMatos.git
cd Smart_NX_QA_JUNIOR_RenataMatos
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Instale o Cypress:**
```bash
npm install cypress --save-dev
```

## 📂 Estrutura do Projeto

```
├── cypress/
│   ├── e2e/
│   │   ├── Login/
│   │   │   └── login.cy.js
│   │   └── ModuloPIM/
│   │       ├── cadastro_pim.cy.js
│   │       ├── exclusao_pim.cy.js
│   │       ├── filtros_pim.cy.js
│   │       └── pesquisa_pim.cy.js
│   ├── fixtures/
│   │   └── example.json
│   └── support/
│      ├── commands.js
│      └── e2e.js
│        
│    screenshots/
├── cypress.config.js
├── package.json
└── README.md
```

## 🎯 Casos de Teste Implementados

### Parte 1: Tela de Login
- ✅ Login com sucesso
- ✅ Login sem fornecer usuário e senha
- ✅ Login com credenciais inválidas

### Parte 2: Módulo PIM
- ✅ Pesquisar o módulo "PIM"
- ✅ Pesquisar um módulo diferente de "PIM"
- ✅ Apagar a pesquisa
- ✅ Acessar o módulo "PIM"

### Parte 3: Cadastro de Employee
- ✅ Validar a existência do botão "+ Add"
- ✅ Acessar a tela de cadastro de usuário
- ✅ Tentar cadastrar um usuário sem preencher o nome
- ✅ Validar tentativa de cadastro com "Employee ID" já existente
- ✅ Cadastrar um employee sem dados de login

### Parte 4: Filtros de Employee
- ✅ Pesquisar um employee pelo nome
- ✅ Pesquisar um employee pelo ID
- ✅ Pesquisar um employee com nome inexistente
- ✅ Pesquisar um employee com ID inexistente

### Parte 5: Exclusão de Employee
- ✅ Cancelar exclusão de employee
- ✅ Confirmar exclusão de employee

## 🔧 Comandos para Execução

### Executar todos os testes (modo interativo):
```bash
npx cypress open
```

### Executar todos os testes (modo headless):
```bash
npx cypress run
```

### Executar testes específicos:
```bash
# Apenas testes de login
npx cypress run --spec "cypress/e2e/login/*.cy.js"

# Apenas testes do módulo PIM
npx cypress run --spec "cypress/e2e/pim/*.cy.js"

# Teste específico
npx cypress run --spec "cypress/e2e/login/login.cy.js"
```

### Executar com diferentes navegadores:
```bash
# Chrome
npx cypress run --browser chrome

# Firefox
npx cypress run --browser firefox

# Edge
npx cypress run --browser edge
```

## 🌐 Configurações do Ambiente

O arquivo `cypress.config.js` contém as configurações principais:
- URL base: https://opensource-demo.orangehrmlive.com
- Timeouts configurados
- Configurações de viewport
- Configurações de vídeo e screenshots

## 📝 Padrões Utilizados

- **Page Object Model (POM)** para organização do código
- **Custom Commands** para reutilização de código
- **Fixtures** para dados de teste
- **Gherkin** para escrita de cenários (BDD)
- **Comentários descritivos** em todo o código

## 🔐 Credenciais de Teste

As credenciais padrão do OrangeHRM Demo:
- **Usuário:** Admin
- **Senha:** admin123

## 🐛 Troubleshooting

### Problemas Comuns:
1. **Cypress não abre:** Verifique se o Node.js está instalado corretamente
2. **Testes falham por timeout:** Aumente os timeouts no cypress.config.js
3. **Elementos não encontrados:** Verifique se a aplicação carregou completamente

### Logs e Debug:
```bash
# Executar com logs detalhados
DEBUG=cypress:* npx cypress run

# Executar apenas um teste para debug
npx cypress run --spec "cypress/e2e/login/login.cy.js" --headed
```

## 📞 Contato

Para dúvidas ou sugestões sobre os testes automatizados, entre em contato através do e-mail de submissão da prova.

---

**Desenvolvido para o processo seletivo Smart NX - QA Junior 2025**
