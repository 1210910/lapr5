import { expect } from 'chai';
import { Floor } from '../../../src/domain/floor/floor';

describe('Floor Test', () => {
    it('Test Create Valid Floor', async function () {
        // Arrange
        const floorProps = {
            floorNumber: 1,
            width: 5,
            length: 5,
            description: 'First floor',
            buildingID: 'B',
        };
        // Act
        const result = Floor.create(floorProps);
        // Assert
        expect(result.isSuccess).to.be.true;
        const floor = result.getValue();
        expect(floor.floorCode.value).to.equal('B1');
        expect(floor.floorNumber.value).to.equal(1);
        expect(floor.width.value).to.equal(5);
        expect(floor.length.value).to.equal(5);
        expect(floor.description.value).to.equal('First floor');
        expect(floor.buildingID.value).to.equal('B');
    });

    it('Test Create Floor with code more than 10 characteres FAIL', () => {
        // Arrange
        const floorProps = {
            floorNumber: 2,
            width: 10,
            length: 10,
            description: 'Descrição',
            buildingID: 'B'.repeat(11),
        };

        // Act
        const result = Floor.create(floorProps);

        // Assert
        expect(result.isFailure).to.be.true;
        expect(result.error).to.equal('Floor code cannot be longer than 10 characters');
    });

    it('Test Create Floor with description more than 250 characteres FAIL',async function () {
        // Arrange
        const floorProps = {
            floorNumber: 2,
            width: 10,
            length: 10,
            description: 'a'.repeat(251),
            buildingID: 'B',
        };

        // Act
        const result = Floor.create(floorProps);

        // Assert
        expect(result.isFailure).to.be.true;
        expect(result.error).to.equal("Description must be 250 characters or less");
    });

   /*it('Test Create Floor with floor code null argument FAIL', async function()  {
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
    });*/

    it('Test Create Floor with floorNumber null argument FAIL', async function () {
        // Arrange
        const validFloorProps = {
            floorNumber: null,
            width: 1,
            length: 10,
            description: 'a',
            buildingID: 'B',
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
            floorNumber: 1,
            width: null,
            length: 10,
            description: 'a',
            buildingID: 'B',
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
            floorNumber: 1,
            width: 5,
            length: null,
            description: 'a',
            buildingID: 'B',
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
          floorNumber: 1,
          width: 2,
          length: 10,
          description: 'Initial description',
          buildingID: 'B',
        };
        const floorOrError = Floor.create(initialProps).getValue();

        const editedProps = {
          floorNumber: 1,
          width: 2,
          length: 9,
          description: 'edited description',
          buildingID: 'B',
        };

        // Act
        const result = Floor.edit(editedProps, floorOrError);

        // Assert
        expect(result.isSuccess).to.be.true;
        const editedFloor = result.getValue();
        expect(editedFloor.description.value).to.equal(editedProps.description);
      });

      it('Test edit floor properties floorNumber successfully', () => {
        // Arrange
        const initialProps = {
          floorNumber: 1,
          width: 2,
          length: 10,
          description: 'Initial description',
          buildingID: 'B',
        };
        const floorOrError = Floor.create(initialProps).getValue();

        const editedProps = {
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
        expect(editedFloor.floorNumber.value).to.equal(editedProps.floorNumber);
      });


      it('Test edit floor properties width successfully', () => {
        // Arrange
        const initialProps = {
          floorNumber: 1,
          width: 2,
          length: 10,
          description: 'Initial description',
          buildingID: 'B',
        };
        const floorOrError = Floor.create(initialProps).getValue();

        const editedProps = {
          floorNumber: 2,
          width: 5,
          length: 9,
          description: 'Initial description',
          buildingID: 'B',
        };

        // Act
        const result = Floor.edit(editedProps, floorOrError);

        // Assert
        expect(result.isSuccess).to.be.true;
        const editedFloor = result.getValue();
        expect(editedFloor.width.value).to.equal(editedProps.width);
      });

      it('Test edit floor properties length successfully', () => {
        // Arrange
        const initialProps = {
          floorNumber: 1,
          width: 2,
          length: 10,
          description: 'Initial description',
          buildingID: 'B',
        };
        const floorOrError = Floor.create(initialProps).getValue();

        const editedProps = {
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
        expect(editedFloor.length.value).to.equal(editedProps.length);
      });

      it('Test edit floor properties floorCode successfully', () => {
        // Arrange
        const initialProps = {
          floorNumber: 1,
          width: 2,
          length: 10,
          description: 'Initial description',
          buildingID: 'B',
        };
        const floorOrError = Floor.create(initialProps).getValue();

        const editedProps = {
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
        expect(editedFloor.floorCode.value).to.equal("B2");
      });
});
