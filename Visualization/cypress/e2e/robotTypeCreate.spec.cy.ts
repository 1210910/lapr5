describe('RobotTypeCreateComponent', () => {
  beforeEach(() => {
    // Code to run before each test case
    cy.visit('http://localhost:4200/robotTypeCreate')

  });

  it('should create a robot type', () => {
    cy.on('window:alert', (alertMessage) => {
      // Check the alert message
      expect(alertMessage).to.equal('Robot type created');
    });
    // Fill in form data
    cy.get('input').eq(0).type('YourCode');
    cy.get('input').eq(1).type('YourBrand');
    cy.get('input').eq(2).type('YourModel');
    cy.get('input').eq(3).type('YourTaskTypeCode');
    cy.get('textarea').eq(0).type('YourDescription');

    // Intercept the HTTP request and stub it with a success response
    cy.intercept('POST', 'http://localhost:4000/api/robotType', {
      statusCode: 201,
      body: {
        success: true,
        message: 'Robot type created',
      },
    }).as('createRobotType');

    // Debugging output
    cy.get('[data-cy="createRobotTypeButton"]').should('be.visible').click();
  });

  it('should create a robot type without description', () => {
    cy.on('window:alert', (alertMessage) => {
      // Check the alert message
      expect(alertMessage).to.equal('Please fill all the fields');
    });
    // Fill in form data
    cy.get('input').eq(0).type('YourCode');
    cy.get('input').eq(1).type('YourBrand');
    cy.get('input').eq(2).type('YourModel');
    cy.get('input').eq(3).type('YourTaskTypeCode');

    // Intercept the HTTP request and stub it with a success response
    cy.intercept('POST', 'http://localhost:4000/api/robotType', {
      statusCode: 201,
      body: {
        success: true,
        message: 'Robot type created',
      },
    }).as('createRobotType');

    // Debugging output
    cy.get('[data-cy="createRobotTypeButton"]').should('be.visible').click();
    cy.wait('@createRobotType');
  });

  it('should not create a robot type with no fields', () => {
    cy.on('window:alert', (alertMessage) => {
      // Check the alert message
      expect(alertMessage).to.equal('Please fill all the fields');
    });

    // Intercept the HTTP request and stub it with a success response
    cy.intercept('POST', 'http://localhost:4000/api/robotType', {
      statusCode: 201,
      body: {
        success: true,
        message: 'Robot type created',
      },
    }).as('createRobotType');

    // Debugging output
    cy.get('[data-cy="createRobotTypeButton"]').should('be.visible').click();
  });

  it('should not create a robot type without code', () => {
    cy.on('window:alert', (alertMessage) => {
      // Check the alert message
      expect(alertMessage).to.equal('Please fill all the fields');
    });
    // Fill in form data
    cy.get('input').eq(1).type('YourBrand');
    cy.get('input').eq(2).type('YourModel');
    cy.get('input').eq(3).type('YourTaskTypeCode');
    cy.get('textarea').eq(0).type('YourDescription');

    // Intercept the HTTP request and stub it with a success response
    cy.intercept('POST', 'http://localhost:4000/api/robotType', {
      statusCode: 201,
      body: {
        success: true,
        message: 'Robot type created',
      },
    }).as('createRobotType');

    // Debugging output
    cy.get('[data-cy="createRobotTypeButton"]').should('be.visible').click();
  });

  it('should not create a robot type without brand', () => {
    cy.on('window:alert', (alertMessage) => {
      // Check the alert message
      expect(alertMessage).to.equal('Please fill all the fields');
    });
    // Fill in form data
    cy.get('input').eq(0).type('YourCode');
    cy.get('input').eq(2).type('YourModel');
    cy.get('input').eq(3).type('YourTaskTypeCode');
    cy.get('textarea').eq(0).type('YourDescription');

    // Intercept the HTTP request and stub it with a success response
    cy.intercept('POST', 'http://localhost:4000/api/robotType', {
      statusCode: 201,
      body: {
        success: true,
        message: 'Robot type created',
      },
    }).as('createRobotType');

    // Debugging output
    cy.get('[data-cy="createRobotTypeButton"]').should('be.visible').click();
  });

  it('should not create a robot type without model', () => {
    cy.on('window:alert', (alertMessage) => {
      // Check the alert message
      expect(alertMessage).to.equal('Please fill all the fields');
    });
    // Fill in form data
    cy.get('input').eq(0).type('YourCode');
    cy.get('input').eq(1).type('YourBrand');
    cy.get('input').eq(3).type('YourTaskTypeCode');
    cy.get('textarea').eq(0).type('YourDescription');

    // Intercept the HTTP request and stub it with a success response
    cy.intercept('POST', 'http://localhost:4000/api/robotType', {
      statusCode: 201,
      body: {
        success: true,
        message: 'Robot type created',
      },
    }).as('createRobotType');

    // Debugging output
    cy.get('[data-cy="createRobotTypeButton"]').should('be.visible').click();
  });

  it('should not create a robot type without task type code', () => {
    cy.on('window:alert', (alertMessage) => {
      // Check the alert message
      expect(alertMessage).to.equal('Please fill all the fields');
    });
    // Fill in form data
    cy.get('input').eq(0).type('YourCode');
    cy.get('input').eq(1).type('YourBrand');
    cy.get('input').eq(2).type('YourModel');
    cy.get('textarea').eq(0).type('YourDescription');

    // Intercept the HTTP request and stub it with a success response
    cy.intercept('POST', 'http://localhost:4000/api/robotType', {
      statusCode: 201,
      body: {
        success: true,
        message: 'Robot type created',
      },
    }).as('createRobotType');

    // Debugging output
    cy.get('[data-cy="createRobotTypeButton"]').should('be.visible').click();
  });

});
