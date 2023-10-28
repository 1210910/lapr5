import { assert } from 'console';
import { Building } from '../../../src/domain/Building';


describe("Building Test", () => {

    it("should create a valid buidling when all the parameters are valid", () => {

        const buildingDTO = {
            code: "B",
            name: "Building",
            description: "Building",
            maxLength: 100,
            maxWidth: 100
        }


        const buildingOrError = Building.create(buildingDTO);
        assert(buildingOrError.isSuccess);
    });

    it("shouldn't create a valid buidling when description is longer than 255 char", () => {

        const buildingDTO = {
            code: "",
            name: "Building",
            description: "Lorem ipsum dolor sit amet, " +
                "consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste " +
                "natus error sit voluptatem accusantium doloremque laudantium, " +
                "totam rem aperiam, eaque ipsa quae ab illo inventore veritatis " +
                "et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim " +
                "ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, " +
                "sed quia consequuntur magni dolores eos qui ratione voluptatem sequi " +
                "nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit " +
                "amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora" +
                " incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
            maxLength: 100,
            maxWidth: 100
        }

        const buildingOrError = Building.create(buildingDTO);
        assert(buildingOrError.isFailure);
    }
    );

    it("shouldn't create a valid buidling when name is longer than 50 characters", () => {

        const buildingDTO = {
            code: "B",
            name: "BuildingBuildingBuildingBuildi" +
                "ngBuildingBuildingBuildingBuildingBuildingBuildingBuildingBuildingBuilding" +
                "Bui",
            description: "Building",
            maxLength: 100,
            maxWidth: 100
        }

        const buildingOrError = Building.create(buildingDTO);

        assert(buildingOrError.isFailure);

    }
    );


    it("shouldn't create a valid buidling when code is undefined", () => {

        const buildingDTO = {
            code: undefined,
            name: "Building",
            description: "Building",
            maxLength: 100,
            maxWidth: 100
        }


        const buildingOrError = Building.create(buildingDTO);
        assert(buildingOrError.isFailure);
    });

    it("shouldn't create a valid buidling when name is undefined", () => {

        const buildingDTO = {
            code: "B",
            name: undefined,
            description: "Building",
            maxLength: 100,
            maxWidth: 100
        }


        const buildingOrError = Building.create(buildingDTO);
        assert(buildingOrError.isFailure);
    });

    it("shouldn't create a valid buidling when description is undefined", () => {

        const buildingDTO = {
            code: "B",
            name: "Building",
            description: undefined,
            maxLength: 100,
            maxWidth: 100
        }

        const buildingOrError = Building.create(buildingDTO);

        assert(buildingOrError.isFailure);
    });

    it("shouldn't create a valid buidling when maxLength is 0", () => {

        const buildingDTO = {
            code: "B",
            name: "Building",
            description: "Building",
            maxLength: 0,
            maxWidth: 100
        }

        const buildingOrError = Building.create(buildingDTO);
        assert(buildingOrError.isFailure);
    });

    it("shouldn't create a valid buidling when maxWidth is 0", () => {

        const buildingDTO = {
            code: "B",
            name: "Building",
            description: "Building",
            maxLength: 100,
            maxWidth: 0
        }

        const buildingOrError = Building.create(buildingDTO);
        assert(buildingOrError.isFailure);
    });


    it("shouldn't create a valid buidling when code is longer than 10 characters", () => {

        const buildingDTO = {
            code: "BuildingBuildin",
            name: "Building",
            description: "Building",
            maxLength: 100,
            maxWidth: 100
        }

        const buildingOrError = Building.create(buildingDTO);
        assert(buildingOrError.isFailure);

    });

    it("shouldn't create a valid buidling when name is null", () => {

        const buildingDTO = {
            code: "B",
            name: null,
            description: "Building",
            maxLength: 100,
            maxWidth: 100
        }


        const buildingOrError = Building.create(buildingDTO);
        assert(buildingOrError.isFailure);


    });

    it("shouldn't create a valid buidling when description is null", () => {

        const buildingDTO = {
            code: "B",
            name: "Building",
            description: null,
            maxLength: 100,
            maxWidth: 100
        }

        const buildingOrError = Building.create(buildingDTO);
        assert(buildingOrError.isFailure);

    });

    it("shouldn't create a valid buidling when maxLength is null", () => {

        const buildingDTO = {
            code: "B",
            name: "Building",
            description: "Building",
            maxLength: null,
            maxWidth: 100
        }

        const buildingOrError = Building.create(buildingDTO);
        assert(buildingOrError.isFailure);

    });

    it("shouldn't create a valid buidling when maxWidth is null", () => {

        const buildingDTO = {
            code: "B",
            name: "Building",
            description: "Building",
            maxLength: 100,
            maxWidth: null
        }

        const buildingOrError = Building.create(buildingDTO);
        assert(buildingOrError.isFailure);

    });

    it("shouldn't create a valid buidling when code is null", () => {

        const buildingDTO = {
            code: null,
            name: "Building",
            description: "Building",
            maxLength: 100,
            maxWidth: 100
        }

        const buildingOrError = Building.create(buildingDTO);
        assert(buildingOrError.isFailure);

    });


    it(" created buildingCode should equal introduced code when building is valid", () => {

        const buildingDTO = {
            code: "B",
            name: "Building",
            description: "Building",
            maxLength: 100,
            maxWidth: 100
        }

        const buildingOrError = Building.create(buildingDTO);

        assert(buildingOrError.getValue().code === buildingDTO.code);

    });





    it(" created buildingName should equal introduced name  when building is valid", () => {

        const buildingDTO = {
            code: "B",
            name: "Building",
            description: "Building",
            maxLength: 100,
            maxWidth: 100
        }

        const buildingOrError = Building.create(buildingDTO);

        assert(buildingOrError.getValue().name === buildingDTO.name);

    });

    it(" created buildingDescription should equal introduced description  when building is valid", () => {

        const buildingDTO = {
            code: "B",
            name: "Building",
            description: "Building",
            maxLength: 100,
            maxWidth: 100
        }

        const buildingOrError = Building.create(buildingDTO);

        assert(buildingOrError.getValue().description === buildingDTO.description);

    });

    it(" created buildingMaxLength should equal introduced maxLength  when building is valid", () => {

        const buildingDTO = {
            code: "B",
            name: "Building",
            description: "Building",
            maxLength: 100,
            maxWidth: 100
        }

        const buildingOrError = Building.create(buildingDTO);

        assert(buildingOrError.getValue().maxLength === buildingDTO.maxLength);

    });


    it(" created buildingMaxWidth should equal introduced maxWidth  when building is valid", () => {

        const buildingDTO = {
            code: "B",
            name: "Building",
            description: "Building",
            maxLength: 100,
            maxWidth: 100
        }

        const buildingOrError = Building.create(buildingDTO);

        assert(buildingOrError.getValue().maxWidth === buildingDTO.maxWidth);

    });

    /*it("should have a valid buildingCode when building is valid", () => {

        const buildingDTO = {
            code: "B",
            name: "Building",
            description: "Building",
            maxLength: 100,
            maxWidth: 100
        }

        const buildingOrError = Building.create(buildingDTO);

        assert(buildingOrError.getValue().buildingId.id !== null);

        });*/

    it("should have a valid domainId when building is valid", () => {

        const buildingDTO = {
            code: "B",
            name: "Building",
            description: "Building",
            maxLength: 100,
            maxWidth: 100
        }

        const buildingOrError = Building.create(buildingDTO);

        assert(buildingOrError.getValue().id !== null);

    });


    it("should edit a valid building when all the parameters are valid", () => {

        const buildingDTO = {
            code: "B",
            name: "Building",
            description: "Building",
            maxLength: 100,
            maxWidth: 100,
        }

        const buildingOrError = Building.create(buildingDTO);

        const building = buildingOrError.getValue();

        const buildingDTO2 = {
            code: "B",
            name: "Building2",
            description: "Building2",
            maxLength: 100,
            maxWidth: 100,
        }

        const buildingOrError2 = Building.edit(buildingDTO2, building);

        assert(buildingOrError2.isSuccess);

    });

    it("shouldn't edit a valid building when name is undefined", () => {

        const buildingDTO = {
            code: "B",
            name: "Building",
            description: "Building",
            maxLength: 100,
            maxWidth: 100,
        }

        const buildingOrError = Building.create(buildingDTO);

        const building = buildingOrError.getValue();

        const buildingDTO2 = {
            code: "B",
            name: undefined,
            description: "Building2",
            maxLength: 100,
            maxWidth: 100,
        }

        const buildingOrError2 = Building.edit(buildingDTO2, building);

        

        assert(buildingOrError2.isFailure);

    });

    it("shouldn't edit a valid building when description is undefined", () => {

        const buildingDTO = {
            code: "B",
            name: "Building",
            description: "Building",
            maxLength: 100,
            maxWidth: 100,
        }

        const buildingOrError = Building.create(buildingDTO);

        const building = buildingOrError.getValue();

        const buildingDTO2 = {
            code: "B",
            name: "Building",
            description: undefined,
            maxLength: 100,
            maxWidth: 100,
        }

        const buildingOrError2 = Building.edit(buildingDTO2, building);

        assert(buildingOrError2.isFailure);

    }
    );


    it("shouldn't edit a valid building when maxLength is null", () => {

        const buildingDTO = {
            code: "B",
            name: "Building",
            description: "Building",
            maxLength: 100,
            maxWidth: 100,
        }

        const buildingOrError = Building.create(buildingDTO);

        const building = buildingOrError.getValue();

        const buildingDTO2 = {
            code: "B",
            name: "Building",
            description: "Building",
            maxLength: null,
            maxWidth: 100,
        }

        const buildingOrError2 = Building.edit(buildingDTO2, building);

        assert(buildingOrError2.isFailure);

    }
    );


    it("shouldn't edit a valid building when maxWidth is null", () => {


        const buildingDTO = {
            code: "B",
            name: "Building",
            description: "Building",
            maxLength: 100,
            maxWidth: 100,
        }

        const buildingOrError = Building.create(buildingDTO);

        const building = buildingOrError.getValue();

        const buildingDTO2 = {
            code: "B",
            name: "Building",
            description: "Building",
            maxLength: 100,
            maxWidth: null,
        }

        const buildingOrError2 = Building.edit(buildingDTO2, building);

        assert(buildingOrError2.isFailure);

    }
    );

    it("shouldn't edit a valid building when description length  is bigger than 255 char", () => {

        const buildingDTO = {
            code: "B",
            name: "Building",
            description: "Building",
            maxLength: 100,
            maxWidth: 100,
        }

        const buildingOrError = Building.create(buildingDTO);

        const building = buildingOrError.getValue();

        const buildingDTO2 = {
            code: "B",
            name: "Building",
            description: "Lorem ipsum dolor sit amet, " +
                "consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste " +
                "natus error sit voluptatem accusantium doloremque laudantium, " +
                "totam rem aperiam, eaque ipsa quae ab illo inventore veritatis " +
                "et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim " +
                "ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, " +
                "sed quia consequuntur magni dolores eos qui ratione voluptatem sequi " +
                "nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit " +
                "amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora" +
                " incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
            maxLength: 100,
            maxWidth: 100,
        }

        const buildingOrError2 = Building.edit(buildingDTO2, building);


        assert(buildingOrError2.isFailure);

    }
    );


    it("shouldn't edit a valid buidling when name is longer than 50 characters", () => {



        const buildingDTO = {
            code: "B",
            name: "Building",
            description: "Building",
            maxLength: 100,
            maxWidth: 100,
        }

        const buildingOrError = Building.create(buildingDTO);

        const building = buildingOrError.getValue();

        const buildingDTO2 = {
            code: "B",
            name: "BuildingBuildingBuildingBuildi" +
                "ngBuildingBuildingBuildingBuildingBuildingBuildingBuildingBuildingBuilding" +
                "Bui",
            description: "Building",
            maxLength: 100,
            maxWidth: 100,
        }

        const buildingOrError2 = Building.edit(buildingDTO2, building);

        assert(buildingOrError2.isFailure);

    }
    );

    it("shouldn't edit a valid buidling when number  is bigger than max integer value", () => {

        const buildingDTO = {
            code: "B",
            name: "Building",
            description: "Building",
            maxLength: 100,
            maxWidth: 100,
        }

        const buildingOrError = Building.create(buildingDTO);


        const building = buildingOrError.getValue();


        const buildingDTO2 = {
            code: "B",
            name: "Building",
            description: "Building",
            maxLength: Number.MAX_SAFE_INTEGER + 1,
            maxWidth: 100,
        }

        const buildingOrError2 = Building.edit(buildingDTO2, building);

        assert(buildingOrError2.isFailure);

    });


    it("shouldn't edit a valid buidling when number  is smaller than 0", () => {

        const buildingDTO = {
            code: "B",
            name: "Building",
            description: "Building",
            maxLength: 100,
            maxWidth: 100,
        }

        const buildingOrError = Building.create(buildingDTO);

        const building = buildingOrError.getValue();

        const buildingDTO2 = {
            code: "B",
            name: "Building",
            description: "Building",
            maxLength: -1,
            maxWidth: 100,
        }

        const buildingOrError2 = Building.edit(buildingDTO2, building);

        assert(buildingOrError2.isFailure);

    }
    );


    it("shouldn't edit a valid buidling when number  is 0", () => {

        const buildingDTO = {
            code: "B",
            name: "Building",
            description: "Building",
            maxLength: 100,
            maxWidth: 100,
        }

        const buildingOrError = Building.create(buildingDTO);

        const building = buildingOrError.getValue();

        const buildingDTO2 = {
            code: "B",
            name: "Building",
            description: "Building",
            maxLength: 100,
            maxWidth: 0,
        }

        const buildingOrError2 = Building.edit(buildingDTO2, building);

        assert(buildingOrError2.isFailure);

    }
    );



});
