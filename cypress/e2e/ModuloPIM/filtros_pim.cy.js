/**
 * Testes automatizados para os filtros de pesquisa do módulo PIM no OrangeHRM
 * 
 * Casos de teste cobertos:
 * 1. Pesquisa de employee por nome
 * 2. Pesquisa de employee por ID
 * 3. Pesquisar um employee com nome inexistente
 * 4. Pesquisar um employee com ID inexistente
 */

describe('Testes de Filtros Employee - Módulo PIM', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/web/index.php/pim/viewEmployeeList');
    });

    /**
     * TESTE 1: Pesquisa de employee por nome
     * 
     * Cenário: O sistema deve retornar corretamente os dados do employee ao pesquisar por um nome válido
     * Dado que o usuário acessou a tela de Employee List
     * Quando preencher o campo de nome com um nome existente
     * Aguarda e clica na sugestão do autocomplete 
     * E clicar em "Search"
     * Então o sistema deve exibir os dados do employee correspondente
     */
    it('CT001 - Pesquisa de employee por nome', () => {
        cy.get('input[placeholder="Type for hints..."]').eq(0).type('Carlos Oliveira'); // ATENÇÃO: Uso de `.eq()` baseado na ordem dos campos
        cy.get('.oxd-autocomplete-option').should('be.visible').first().click();
        cy.get('button[type="submit"]').click();
        cy.get('.oxd-table-row').should('contain.text', 'Carlos Oliveira');

    });

    /**
     * TESTE 2: Pesquisa de employee por ID
     * 
     * Cenário: O sistema deve localizar o employee quando o ID correto for informado
     * Dado que o usuário acessou a tela de Employee List
     * Quando preencher o campo de ID com um número existente
     * E clicar em "Search"
     * Então o sistema deve exibir os dados do employee com o ID correspondente
     */
    it('CT002 - Pesquisa de employee por ID', () => {
        cy.get('input.oxd-input').eq(1).type('1234'); // ATENÇÃO: Uso de `.eq()` baseado na ordem dos campos
        cy.get('button[type="submit"]').click();
        cy.get('.oxd-table-row').should('contain.text', '1234');
    });

    /**
     * TESTE 3: Pesquisa por nome inexistente
     * 
     * Cenário: O sistema não deve retornar resultados ao pesquisar por um nome que não está cadastrado
     * Dado que o usuário acessou a tela de Employee List
     * Quando preencher o campo de nome com um valor inválido
     * E clicar em "Search"
     * Verifica o toast de erro exibido com a mensagem 'No Records Found'
     */
    it('CT003 - Pesquisa por nome inexistente', () => {
        cy.get('input[placeholder="Type for hints..."]').eq(0).type('Renata Matos'); // ATENÇÃO: Uso de `.eq()` baseado na ordem dos campos
        cy.get('button[type="submit"]').click();
        cy.get('.oxd-toast-content').should('contain.text', 'No Records Found');

    });

    /**
     * TESTE 4: Pesquisa por ID inexistente
     * 
     * Cenário: O sistema não deve retornar resultados ao pesquisar por um ID que não está cadastrado
     * Dado que o usuário acessou a tela de Employee List
     * Quando preencher o campo de ID com um número inexistente
     * E clicar em "Search"
     * Então o sistema deve informar que nenhum registro foi encontrado
     */
    it('CT004 - Pesquisa por ID inexistente', () => {
        cy.get('input.oxd-input').eq(1).type('999999'); // ATENÇÃO: Uso de `.eq()` baseado na ordem dos campos
        cy.get('button[type="submit"]').click();
        cy.get('.oxd-toast-content').should('contain.text', 'No Records Found');
    });

});
