/**
 * Testes automatizados para o Módulo PIM do OrangeHRM
 * 
 * Casos de teste cobertos:
 * 1. Pesquisar o módulo "PIM"
 * 2. Pesquisar um módulo diferente de "PIM"
 * 3. Apagar a pesquisa
 * 4. Acessar o módulo "PIM"
 */

describe('Testes no Módulo PIM - OrangeHRM', () => {

  beforeEach(() => {
    cy.login(); // Executa o login de forma reutilizável
  });

  /**
   * TESTE 1: Pesquisar o módulo PIM
   * 
   * Cenário: Usuário acessa o módulo PIM
   * Dado que o usuário está autenticado no sistema
   * Quando acessa o menu lateral
   * E clica no item "PIM"
   * Então o sistema deve redirecionar para a página "Employee List"
   */
  it('CT001 - Pesquisar o módulo PIM', () => {
    cy.get('.oxd-main-menu-item').contains('PIM').click();
    cy.url().should('include', '/pim/viewEmployeeList');
  });

  /**
  * TESTE 2: Pesquisar um módulo diferente de PIM
  * 
  * Cenário: Usuário acessa outro módulo do sistema
  * Dado que o usuário está autenticado no sistema
  * Quando acessa o menu lateral
  * E clica no item "Leave"
  * Então o sistema deve redirecionar para a página do módulo "Leave"
  */
  it('CT002 - Pesquisar um módulo diferente de PIM', () => {
    cy.get('.oxd-main-menu-item').contains('Leave').click();
    cy.url().should('include', '/leave');
  });

  /**
   * TESTE 3: Pesquisar pela lupa e apagar pesquisa de módulo no menu lateral
   * 
   * Cenário: Usuário utiliza a busca de módulos e depois apaga a pesquisa
   * Dado que o usuário está autenticado no sistema
   * Quando clica na lupa do menu lateral
   * E digita "PIM" no campo de busca
   * E visualiza o item "PIM" nos resultados
   * E apaga o conteúdo da busca
   * Então o campo de busca deve ficar vazio
   * E o sistema deve exibir novamente todos os módulos
   */
  it('CT003 - Pesquisar pela lupa e apagar pesquisa do módulo no menu lateral', () => {
    cy.get('.oxd-main-menu-search > .oxd-input').click();
    cy.get('.oxd-input').type('PIM');
    cy.get('.oxd-main-menu-item').contains('PIM').should('exist');
    cy.get('.oxd-input').clear();
    cy.get('.oxd-input').should('have.value', '');
    cy.get('.oxd-main-menu-item').contains('Admin').should('exist');
  });

  /**
 * TESTE 4: Acessar o módulo PIM e validar conteúdo
 *
 * Cenário: Usuário acessa diretamente o módulo PIM
 * Dado que o usuário está autenticado no sistema
 * Quando clica no item "PIM" no menu lateral
 * Então a URL deve conter "/pim/viewEmployeeList"
 * E a tela deve exibir o título "Employee Information"
 */
  it('CT004 - Acessar o módulo PIM e validar conteúdo', () => {
    cy.get('.oxd-main-menu-item').contains('PIM').click();
    cy.url().should('include', '/pim/viewEmployeeList');
    cy.get('.oxd-table-filter-header-title > .oxd-text').should('contain', 'Employee Information');
    cy.get('input[placeholder="Type for hints..."]').should('be.visible');
  });

});