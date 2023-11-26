describe('Floor Create', () => {
  beforeEach(() => {
    // Code to run before each test case
    cy.visit('http://localhost:4200/floorCreate')
  });

  it('should create a floor', () => {
    cy.on('window:alert', (alertMessage) => {
      // Check the alert message
      expect(alertMessage).to.equal('Floor created');
    });
    // Fill in form data
    cy.get('input').eq(0).type('YourCode');
    cy.get('input').eq(1).type('YourName');
    cy.get('input').eq(2).type('YourLength'); // Example length
    cy.get('input').eq(3).type('YourWidth');  // Example width
    cy.get('input').eq(4).type('YourBuildingCode');  // Example width
    cy.get('textarea').eq(0).type('YourDescription');

    // Intercept the HTTP request and stub it with a success response
    cy.intercept('POST', 'http://localhost:4000/api/floor', {
      statusCode: 201,
      body: {
        success: true,
        message: 'Floor created',
      },
    }).as('createFloor');

    // Debugging output
    cy.get('[data-cy="createFloorButton"]').should('be.visible').click();
  });

  it('should create a floor without description', () => {
    cy.on('window:alert', (alertMessage) => {
      // Check the alert message
      expect(alertMessage).to.equal('Floor created');
    });
    // Fill in form data
    cy.get('input').eq(0).type('YourCode');
    cy.get('input').eq(1).type('YourName');
    cy.get('input').eq(2).type('YourLength'); // Example length
    cy.get('input').eq(3).type('YourWidth');  // Example width
    cy.get('input').eq(4).type('YourBuildingCode');  // Example width

    // Intercept the HTTP request and stub it with a success response
    cy.intercept('POST', 'http://localhost:4000/api/floor', {
      statusCode: 201,
      body: {
        success: true,
        message: 'Floor created',
      },
    }).as('createFloor');

    // Debugging output
    cy.get('[data-cy="createFloorButton"]').should('be.visible').click();
  });

  it('should not create a floor without code', () => {
    cy.on('window:alert', (alertMessage) => {
      // Check the alert message
      expect(alertMessage).to.equal('Please fill in all fields');
    });
    // Fill in form data
    cy.get('input').eq(1).type('YourName');
    cy.get('input').eq(2).type('YourLength'); // Example length
    cy.get('input').eq(3).type('YourWidth');  // Example width
    cy.get('input').eq(4).type('YourBuildingCode');  // Example width

    // Intercept the HTTP request and stub it with a success response
    cy.intercept('POST', 'http://localhost:4000/api/floor', {
      statusCode: 201,
      body: {
        success: true,
        message: 'Floor created',
      },
    }).as('createFloor');

    // Debugging output
    cy.get('[data-cy="createFloorButton"]').should('be.visible').click();
  });

  it('should not create a floor without name', () => {
    cy.on('window:alert', (alertMessage) => {
      // Check the alert message
      expect(alertMessage).to.equal('Please fill in all fields');
    });
    // Fill in form data
    cy.get('input').eq(0).type('YourCode');
    cy.get('input').eq(2).type('YourLength'); // Example length
    cy.get('input').eq(3).type('YourWidth');  // Example width
    cy.get('input').eq(4).type('YourBuildingCode');  // Example width

    // Intercept the HTTP request and stub it with a success response
    cy.intercept('POST', 'http://localhost:4000/api/floor', {
      statusCode: 201,
      body: {
        success: true,
        message: 'Floor created',
      },
    }).as('createFloor');

    // Debugging output
    cy.get('[data-cy="createFloorButton"]').should('be.visible').click();
  });

  it('should not create a floor without length', () => {
    cy.on('window:alert', (alertMessage) => {
      // Check the alert message
      expect(alertMessage).to.equal('Please fill in all fields');
    });
    // Fill in form data
    cy.get('input').eq(0).type('YourCode');
    cy.get('input').eq(1).type('YourName');
    cy.get('input').eq(3).type('YourWidth');  // Example width
    cy.get('input').eq(4).type('YourBuildingCode');  // Example width

    // Intercept the HTTP request and stub it with a success response
    cy.intercept('POST', 'http://localhost:4000/api/floor', {
      statusCode: 201,
      body: {
        success: true,
        message: 'Floor created',
      },
    }).as('createFloor');

    // Debugging output
    cy.get('[data-cy="createFloorButton"]').should('be.visible').click();
  });

  it('should not create a floor without width', () => {
    cy.on('window:alert', (alertMessage) => {
      // Check the alert message
      expect(alertMessage).to.equal('Please fill in all fields');
    });
    // Fill in form data
    cy.get('input').eq(0).type('YourCode');
    cy.get('input').eq(1).type('YourName');
    cy.get('input').eq(2).type('YourLength'); // Example length
    cy.get('input').eq(4).type('YourBuildingCode');  // Example width

    // Intercept the HTTP request and stub it with a success response
    cy.intercept('POST', 'http://localhost:4000/api/floor', {
      statusCode: 201,
      body: {
        success: true,
        message: 'Floor created',
      },
    }).as('createFloor');

    // Debugging output
    cy.get('[data-cy="createFloorButton"]').should('be.visible').click();
  });

  it('should not create a floor without buildingCode', () => {
    cy.on('window:alert', (alertMessage) => {
      // Check the alert message
      expect(alertMessage).to.equal('Please fill in all fields');
    });
    // Fill in form data
    cy.get('input').eq(0).type('YourCode');
    cy.get('input').eq(1).type('YourName');
    cy.get('input').eq(2).type('YourLength'); // Example length
    cy.get('input').eq(3).type('YourWidth');  // Example width

    // Intercept the HTTP request and stub it with a success response
    cy.intercept('POST', 'http://localhost:4000/api/floor', {
      statusCode: 201,
      body: {
        success: true,
        message: 'Floor created',
      },
    }).as('createFloor');

    // Debugging output
    cy.get('[data-cy="createFloorButton"]').should('be.visible').click();
  });

});