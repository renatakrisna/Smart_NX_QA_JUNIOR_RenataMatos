// Cria um comando personalizado chamado "login"
// Assim você pode usar cy.login() em qualquer teste
Cypress.Commands.add('login', () => {
  
  cy.visit('/web/index.php/auth/login'); // Visita a página de login
  cy.get('input[name="username"]').type('Admin'); // Preenche o nome de usuário
  cy.get('input[name="password"]').type('admin123'); // Preenche a senha
  cy.get('button[type="submit"]').click(); // Clica no botão de login
  cy.url().should('include', '/dashboard'); // Verifica se o login foi bem-sucedido pelo redirecionamento
});