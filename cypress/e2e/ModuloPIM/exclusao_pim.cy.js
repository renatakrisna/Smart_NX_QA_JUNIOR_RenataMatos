/**
 * Testes automatizados para excluir o employee do módulo PIM no OrangeHRM
 * 
 * Casos de teste cobertos:
 * 1. Clicar no ícone de lixeira e cancelar a exclusão, garantindo que o employee não foi excluído
 * 2. Clicar no ícone de lixeira e confirmar a exclusão, garantindo que o employee foi excluído
 */


describe('Testes de Filtros Employee - Módulo PIM', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/web/index.php/pim/viewEmployeeList');
    });

    /**
     * TESTE 1: Cancelamento da exclusão de employee
     * 
     * Cenário: O sistema não deve excluir o employee quando o usuário cancelar a ação no modal de confirmação
     * Dado que o usuário acessou a tela de Employee List
     * Quando preencher o campo de nome com um nome existente
     * Aguarda e clica na sugestão do autocomplete
     * Clicar em "Search"
     * Clicar no ícone da lixeira ao lado do employee
     * E clicar em "Cancel" no modal de confirmação
     * Então o sistema deve manter o employee na lista
     */
    it('CT001 - Cancelamento da exclusão de employee', () => {
        cy.get('input[placeholder="Type for hints..."]').eq(0).type('Carlos Oliveira'); // ATENÇÃO: Uso de `.eq()` baseado na ordem dos campos
        cy.get('.oxd-autocomplete-option').should('be.visible').first().click();
        cy.get('button[type="submit"]').click();
        cy.get('.oxd-table-row').should('contain.text', 'Carlos Oliveira');
        cy.get('.oxd-icon.bi-trash').click();
        cy.contains('button', 'Cancel').click();
        cy.get('.oxd-table-row').should('contain.text', 'Carlos Oliveira');

    });

    /**
  * TESTE 2: Confirmação da exclusão de employee
  * 
  * Cenário: O sistema deve remover o employee da lista após confirmação da exclusão
  * Dado que o usuário acessou a tela de Employee List
  * Quando preencher o campo de nome com um nome existente
  * E clicar no ícone da lixeira
  * E confirmar a exclusão clicando em "Yes, Delete"
  * Então o sistema deve exibir a mensagem "Successfully Deleted"
  * E ao pesquisar novamente o mesmo nome
  * Deve exibir a mensagem "No Records Found"
  */

    it('CT002 - Confirmar exclusão de employee', () => {
        cy.get('input[placeholder="Type for hints..."]').eq(0).type('Carlos Oliveira'); // ATENÇÃO: Uso de `.eq()` baseado na ordem dos campos
        cy.get('.oxd-autocomplete-option').should('be.visible').first().click();
        cy.get('button[type="submit"]').click();
        cy.get('.oxd-table-row').should('contain.text', 'Carlos Oliveira');
        cy.get('.oxd-icon.bi-trash').click();
        cy.get('.oxd-button--label-danger').click();
        cy.get('.oxd-toast').should('be.visible').and('contain.text', 'Successfully Deleted'); // Valida o toast de sucesso      
        cy.get('button[type="submit"]').click();// Faz nova pesquisa com o mesmo nome       
        cy.get('.oxd-toast-content').should('contain.text', 'No Records Found'); // Valida que excluiu
    });

});
