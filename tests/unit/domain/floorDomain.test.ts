import { expect } from 'chai';
import { Floor } from '../../../src/domain/floor';

describe('Floor Test', () => {
    it('Test Create Valid Floor', async function () {
        // Arrange
        const floorProps = {
            floorCode: 'F1',
            floorNumber: 1,
            width: 5,
            length: 5,
            description: 'First floor',
            buildingID: 'B1',
        };
        // Act
        const result = Floor.create(floorProps);
        // Assert
        expect(result.isSuccess).to.be.true;
        const floor = result.getValue();
        expect(floor.floorCode).to.equal('F1');
        expect(floor.floorNumber).to.equal(1);
        expect(floor.width).to.equal(5);
        expect(floor.length).to.equal(5);
        expect(floor.description).to.equal('First floor');
        expect(floor.buildingID).to.equal('B1');
    });

    it('Test Create Floor with code more than 10 characteres FAIL', () => {
        // Arrange
        const floorProps = {
            floorCode: 'F2111111111',
            floorNumber: 2,
            width: 10,
            length: 10,
            description: 'Descrição',
            buildingID: 'B2',
        };

        // Act
        const result = Floor.create(floorProps);

        // Assert
        expect(result.isFailure).to.be.true;
        expect(result.error).to.equal('Floor code cannot be longer than 10 characters');
    });

    it('Test Create Floor with description more than 255 characteres FAIL',async function () {
        // Arrange
        const floorProps = {
            floorCode: 'F1',
            floorNumber: 2,
            width: 10,
            length: 10,
            description: 'a'.repeat(251),
            buildingID: 'B2',
        };

        // Act
        const result = Floor.create(floorProps);

        // Assert
        expect(result.isFailure).to.be.true;
        expect(result.error).to.equal('Description cannot be longer than 250 characters');
    });

   it('Test Create Floor with floor code null argument FAIL', async function()  {
        // Arrange
        const validFloorProps = {
            floorCode: null,
            floorNumber: 1,
            width: 1,
            length: 10,
            description: 'a',
            buildingID: 'B2',
          };


        // Act
        const result = Floor.create(validFloorProps);

        // Assert
        expect(result.isFailure).to.be.true;
        expect(result.error).to.equal('floorCode is null or undefined');
    });

    it('Test Create Floor with floorNumber null argument FAIL', async function () {
        // Arrange
        const validFloorProps = {
            floorCode: 'F1',
            floorNumber: null,
            width: 1,
            length: 10,
            description: 'a',
            buildingID: 'B2',
          };


        // Act
        const result = Floor.create(validFloorProps);

        // Assert
        expect(result.isFailure).to.be.true;
        expect(result.error).to.equal('floorNumber is null or undefined');
    });


    it('Test Create Floor with width null argument FAIL', async function () {
        // Arrange
        const validFloorProps = {
            floorCode: 'F1',
            floorNumber: 1,
            width: null,
            length: 10,
            description: 'a',
            buildingID: 'B2',
          };


        // Act
        const result = Floor.create(validFloorProps);

        // Assert
        expect(result.isFailure).to.be.true;
        expect(result.error).to.equal('width is null or undefined');
    });

    it('Test Create Floor with length null argument FAIL',async function ()  {
        // Arrange
        const validFloorProps = {
            floorCode: 'F1',
            floorNumber: 1,
            width: 5,
            length: null,
            description: 'a',
            buildingID: 'B2',
          };


        // Act
        const result = Floor.create(validFloorProps);

        // Assert
        expect(result.isFailure).to.be.true;
        expect(result.error).to.equal('length is null or undefined');
    });

    it('Test Create Floor with buildingID null argument FAIL', async function () {
        // Arrange
        const validFloorProps = {
            floorCode: 'F1',
            floorNumber: 1,
            width: 5,
            length: 6,
            description: "description",
            buildingID: null,
          };


        // Act
        const result = Floor.create(validFloorProps);

        // Assert
        expect(result.isFailure).to.be.true;
        expect(result.error).to.equal('buildingID is null or undefined');
    });



    it('Test edit floor properties description successfully', () => {
        // Arrange
        const initialProps = {
          floorCode: 'F1',
          floorNumber: 1,
          width: 2,
          length: 10,
          description: 'Initial description',
          buildingID: 'B2',
        };
        const floorOrError = Floor.create(initialProps).getValue();

        const editedProps = {
          floorCode: 'F1',
          floorNumber: 1,
          width: 2,
          length: 9,
          description: 'edited description',
          buildingID: 'B2',
        };

        // Act
        const result = Floor.edit(editedProps, floorOrError);

        // Assert
        expect(result.isSuccess).to.be.true;
        const editedFloor = result.getValue();
        expect(editedFloor.description).to.equal(editedProps.description);
      });

      it('Test edit floor properties floorNumber successfully', () => {
        // Arrange
        const initialProps = {
          floorCode: 'F1',
          floorNumber: 1,
          width: 2,
          length: 10,
          description: 'Initial description',
          buildingID: 'B2',
        };
        const floorOrError = Floor.create(initialProps).getValue();

        const editedProps = {
          floorCode: 'F1',
          floorNumber: 2,
          width: 2,
          length: 9,
          description: 'Initial description',
          buildingID: 'B2',
        };

        // Act
        const result = Floor.edit(editedProps, floorOrError);

        // Assert
        expect(result.isSuccess).to.be.true;
        const editedFloor = result.getValue();
        expect(editedFloor.floorNumber).to.equal(editedProps.floorNumber);
      });


      it('Test edit floor properties width successfully', () => {
        // Arrange
        const initialProps = {
          floorCode: 'F1',
          floorNumber: 1,
          width: 2,
          length: 10,
          description: 'Initial description',
          buildingID: 'B2',
        };
        const floorOrError = Floor.create(initialProps).getValue();

        const editedProps = {
          floorCode: 'F1',
          floorNumber: 2,
          width: 5,
          length: 9,
          description: 'Initial description',
          buildingID: 'B2',
        };

        // Act
        const result = Floor.edit(editedProps, floorOrError);

        // Assert
        expect(result.isSuccess).to.be.true;
        const editedFloor = result.getValue();
        expect(editedFloor.width).to.equal(editedProps.width);
      });

      it('Test edit floor properties length successfully', () => {
        // Arrange
        const initialProps = {
          floorCode: 'F1',
          floorNumber: 1,
          width: 2,
          length: 10,
          description: 'Initial description',
          buildingID: 'B2',
        };
        const floorOrError = Floor.create(initialProps).getValue();

        const editedProps = {
          floorCode: 'F1',
          floorNumber: 2,
          width: 2,
          length: 9,
          description: 'Initial description',
          buildingID: 'B2',
        };

        // Act
        const result = Floor.edit(editedProps, floorOrError);

        // Assert
        expect(result.isSuccess).to.be.true;
        const editedFloor = result.getValue();
        expect(editedFloor.length).to.equal(editedProps.length);
      });

      it('Test edit floor properties floorCode successfully', () => {
        // Arrange
        const initialProps = {
          floorCode: 'B1',
          floorNumber: 1,
          width: 2,
          length: 10,
          description: 'Initial description',
          buildingID: 'B',
        };
        const floorOrError = Floor.create(initialProps).getValue();

        const editedProps = {
          floorCode: 'B2',
          floorNumber: 2,
          width: 2,
          length: 9,
          description: 'Initial description',
          buildingID: 'B',
        };

        // Act
        const result = Floor.edit(editedProps, floorOrError);

        // Assert
        expect(result.isSuccess).to.be.true;
        const editedFloor = result.getValue();
        expect(editedFloor.floorCode).to.equal(editedProps.floorCode);
      });
});
