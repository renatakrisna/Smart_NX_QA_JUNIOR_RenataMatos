/**
 * Testes automatizados para Cadastro de Employee no módulo PIM
 * 
 * Casos de teste cobertos:
 * 1. Validar a existência do botão "+ Add"
 * 2. Acessar a tela de cadastro de usuário clicando no botão "+ Add"
 * 3. Tentar cadastrar um usuário sem preencher o nome
 * 4. Validar tentativa de cadastro com "Employee ID" já existente
 * 5. Cadastrar um employee sem dados de login
 */

describe('Cadastro de Employees - Módulo PIM', () => {

    beforeEach(() => {
        cy.visit('/web/index.php/auth/login');
        cy.login();
        cy.get('.oxd-main-menu-item').contains('PIM').click(); // Acessa o módulo PIM
    });

    /**
     * TESTE - 1: Validar existência do botão "+ Add"
     * 
     * Cenário: Usuário acessa o módulo PIM
     * Dado que o usuário está autenticado e dentro do módulo PIM
     * Então o botão "+ Add" deve estar visível
     */
    it('CT001 - Validar a existência do botão "+ Add"', () => {
        cy.get('button').contains('Add').should('be.visible');
    });

    /**
     * TESTE - 2: Acessar tela de cadastro clicando em "+ Add"
     * 
     * Cenário: Usuário inicia o cadastro de um novo employee
     * Dado que o botão "+ Add" está visível no módulo PIM
     * Quando o usuário clica no botão "+ Add"
     * Então deve ser redirecionado para a tela de cadastro
     * E deve visualizar o título "Add Employee"
     */
    it('CT002 - Acessar a tela de cadastro de usuário clicando em "+ Add"', () => {
        cy.get('button').contains('Add').click();
        cy.get('h6').should('contain', 'Add Employee');
    });

    /**
     * TESTE - 3: Tentar cadastrar um usuário sem preencher o nome
     * 
     * Cenário: Usuário tenta cadastrar um employee sem preencher os campos obrigatórios
     * Dado que o usuário está na tela de cadastro
     * Quando tenta salvar sem preencher o nome
     * Então o sistema deve exibir mensagens de erro de validação
     */
    it('CT003 - Tentar cadastrar um usuário sem preencher o nome', () => {
        cy.get('button').contains('Add').click();
        cy.get('button[type="submit"]').click();
        cy.get('.oxd-input-group .oxd-text--span').should('contain', 'Required');
    });

    /**
     * TESTE - 4: Validar tentativa de cadastro com "Employee ID" já existente
     * 
     * Cenário: Usuário tenta cadastrar um novo funcionário com ID duplicado
     * Dado que o campo "Employee ID" já foi usado em outro cadastro
     * Quando o usuário tenta cadastrar com o mesmo ID
     * Então o sistema deve exibir uma mensagem de erro
     */
    it('CT004 - Validar tentativa de cadastro com "Employee ID" já existente', () => {
        cy.get('button').contains('Add').click();
        cy.get('input[name="firstName"]').type('Maria');
        cy.get('input[name="middleName"]').type('Joana')
        cy.get('input[name="lastName"]').type('Silva');

        // Atenção: Foi usando `.eq(3)` para acessar o campo "Employee ID" com base na ordem dos inputs.
        // Essa abordagem é frágil, pois depende da estrutura da página. Se novos campos forem adicionados ou removidos, esse índice pode mudar.
        // O ideal seria usar um seletor mais específico ou baseado em rótulo para maior estabilidade.
        // Porém todos os inputs da pagina tem o mesmo nome.
        cy.get('input.oxd-input--active').eq(3).clear().type('1234');

        cy.get('button[type="submit"]').click();

        // Valida a mensagem de erro
        cy.get('.oxd-input-field-error-message')
            .should('contain.text', 'Employee Id already exists')
            .and('be.visible');
    });

    /**
     * TESTE - 5: Cadastrar um employee sem dados de login
     * 
     * Cenário: Usuário cadastra um novo funcionário sem preencher login e senha
     * Dado que o formulário de cadastro está aberto
     * Quando preenche os dados obrigatórios do funcionário
     * E deixa a seção de login desmarcada
     * Então o cadastro deve ser concluído com sucesso
     */
    it('CT005 - Cadastrar um employee sem dados de login', () => {
        cy.get('button').contains('Add').click();
        cy.get('input[name="firstName"]').type('Carlos');
        cy.get('input[name="lastName"]').type('Oliveira');

        cy.get('button[type="submit"]').click();

        cy.get('.oxd-toast').should('contain', 'Successfully Saved'); // ou verificar redirecionamento
    });

});
