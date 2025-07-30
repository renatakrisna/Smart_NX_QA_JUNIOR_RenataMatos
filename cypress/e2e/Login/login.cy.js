/**
 * Testes automatizados para a funcionalidade de Login do OrangeHRM
 * 
 * Casos de teste cobertos:
 * 1. Login com sucesso
 * 2. Login sem fornecer usuário e senha
 * 3. Login com credenciais inválidas
 */

describe('Testes de Login - OrangeHRM', () => {

  /**
   * TESTE 1: Login com sucesso
   * 
   * Cenário: Usuário realiza login com credenciais válidas
   * Dado que o usuário está na página de login
   * Quando preenche usuário e senha válidos
   * E clica no botão "Login"
   * Então deve ser redirecionado para o dashboard
   * E deve visualizar a página inicial do sistema
   */
  it('CT001 - Login com sucesso', () => {
    cy.visit('/web/index.php/auth/login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  /**
   * TESTE 2: Login sem fornecer usuário e senha
   * 
   * Cenário: Usuário tenta fazer login sem preencher os campos obrigatórios
   * Dado que o usuário está na página de login
   * Quando clica no botão "Login" sem preencher usuário e senha
   * Então deve exibir mensagens de campo obrigatório
   * E não deve realizar o login
   */
  it('CT002 - Login sem usuário e senha', () => {
    cy.visit('/web/index.php/auth/login');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-field-error-message')
      .should('contain', 'Required');
  });

  /**
   * TESTE 3: Login com credenciais inválidas
   * 
   * Cenário: Usuário tenta fazer login com credenciais incorretas
   * Dado que o usuário está na página de login
   * Quando preenche credenciais inválidas
   * E clica no botão "Login"
   * Então deve exibir mensagem de credenciais inválidas
   * E não deve realizar o login
   */
  it('CT003 - Login com credenciais inválidas', () => {
    cy.visit('/web/index.php/auth/login');
    cy.get('input[name="username"]').type('usuarioErrado');
    cy.get('input[name="password"]').type('senhaErrada');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials');
  });

});
