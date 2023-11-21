import  assert  from 'assert';
import { RobotType } from "../../../src/domain/robotType";

describe("Robot type test", () => {

    it("should create a valid robot when all parameters are valid", () => {

            const robotTypeDto = {
                code: "RT-001",
                brand: "brand",
                model: "model",
                description: "This is a test robot",
                taskTypeCode: "classroom"
            };

            const robotTypeOrError = RobotType.create(robotTypeDto);

            assert(robotTypeOrError.isSuccess);
    });

    it("shouldn't create a valid robot when code is null", () => {

        const robotTypeDto = {
            code: null,
            brand: "brand",
            model: "model",
            description: "This is a test robot",
            taskTypeCode: "TT-001"
        };

        const robotTypeOrError = RobotType.create(robotTypeDto);

        assert(robotTypeOrError.isFailure);
    });

    it("shouldn't create a valid robot when code is longer than 25 characters", () => {

        const robotTypeDto = {
            code: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            brand: "brand",
            model: "model",
            description: "This is a test robot",
            taskTypeCode: "TT-001"
        };

        const robotTypeOrError = RobotType.create(robotTypeDto);

        assert(robotTypeOrError.isFailure);
    });

    it("shouldn't create a valid robot when brand is null", () => {

        const robotTypeDto = {
            code: "RT-001",
            brand: null,
            model: "model",
            description: "This is a test robot",
            taskTypeCode: "TT-001"
        };

        const robotTypeOrError = RobotType.create(robotTypeDto);

        assert(robotTypeOrError.isFailure);
    });

    it("shouldn't create a valid robot when brand is longer than 50 characters", () => {

        const robotTypeDto = {
            code: "RT-001",
            brand: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            model: "model",
            description: "This is a test robot",
            taskTypeCode: "TT-001"
        };

        const robotTypeOrError = RobotType.create(robotTypeDto);

        assert(robotTypeOrError.isFailure);
    });

    it("shouldn't create a valid robot when model is null", () => {

        const robotTypeDto = {
            code: "RT-001",
            brand: "brand",
            model: null,
            description: "This is a test robot",
            taskTypeCode: "TT-001"
        };

        const robotTypeOrError = RobotType.create(robotTypeDto);

        assert(robotTypeOrError.isFailure);
    });

    it("shouldn't create a valid robot when model is longer than 100 characters", () => {

        const robotTypeDto = {
            code: "RT-001",
            brand: "brand",
            model: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            description: "This is a test robot",
            taskTypeCode: "TT-001"
        };

        const robotTypeOrError = RobotType.create(robotTypeDto);

        assert(robotTypeOrError.isFailure);
    });

    it("should create a valid robot when description is null", () => {

        const robotTypeDto = {
            code: "RT-001",
            brand: "brand",
            model: "model",
            description: null,
            taskTypeCode: "TT-001"
        };

        const robotTypeOrError = RobotType.create(robotTypeDto);

        assert(robotTypeOrError.isSuccess);
    });

    it("shouldn't create a valid robot when description is longer than 250 characters", () => {

        const robotTypeDto = {
            code: "RT-001",
            brand: "brand",
            model: "model",
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
            taskTypeCode: "TT-001"
        };

        const robotTypeOrError = RobotType.create(robotTypeDto);

        assert(robotTypeOrError.isFailure);
    });

    it("shouldn't create a valid robot when task type code is null", () => {

        const robotTypeDto = {
            code: "RT-001",
            brand: "brand",
            model: "model",
            description: "This is a test robot",
            taskTypeCode: null
        };

        const robotTypeOrError = RobotType.create(robotTypeDto);

        assert(robotTypeOrError.isFailure);
    });

    it("shouldn't create a valid robot when task type code is longer than 25 characters", () => {

        const robotTypeDto = {
            code: "RT-001",
            brand: "brand",
            model: "model",
            description: "This is a test robot",
            taskTypeCode: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        };

        const robotTypeOrError = RobotType.create(robotTypeDto);

        assert(robotTypeOrError.isFailure);
    });

    it("valid robot should return the same code", () => {

            const robotTypeDto = {
                code: "RT-001",
                brand: "brand",
                model: "model",
                description: "This is a test robot",
                taskTypeCode: "TT-001"
            };

            const robotTypeOrError = RobotType.create(robotTypeDto);

            assert(robotTypeOrError.isSuccess);
            assert(robotTypeOrError.getValue().code === robotTypeDto.code);
        });

    it("valid robot should return the same brand", () => {

            const robotTypeDto = {
                code: "RT-001",
                brand: "brand",
                model: "model",
                description: "This is a test robot",
                taskTypeCode: "TT-001"
            };

            const robotTypeOrError = RobotType.create(robotTypeDto);

            assert(robotTypeOrError.isSuccess);
            assert(robotTypeOrError.getValue().brand === robotTypeDto.brand);
        });

    it("valid robot should return the same model", () => {

            const robotTypeDto = {
                code: "RT-001",
                brand: "brand",
                model: "model",
                description: "This is a test robot",
                taskTypeCode: "TT-001"
            };

            const robotTypeOrError = RobotType.create(robotTypeDto);

            assert(robotTypeOrError.isSuccess);
            assert(robotTypeOrError.getValue().model === robotTypeDto.model);
        });

    it("valid robot should return the same description", () => {

            const robotTypeDto = {
                code: "RT-001",
                brand: "brand",
                model: "model",
                description: "This is a test robot",
                taskTypeCode: "TT-001"
            };

            const robotTypeOrError = RobotType.create(robotTypeDto);

            assert(robotTypeOrError.isSuccess);
            assert(robotTypeOrError.getValue().description === robotTypeDto.description);
        });

    it("valid robot should return the same task type code", () => {

            const robotTypeDto = {
                code: "RT-001",
                brand: "brand",
                model: "model",
                description: "This is a test robot",
                taskTypeCode: "TT-001"
            };

            const robotTypeOrError = RobotType.create(robotTypeDto);

            assert(robotTypeOrError.isSuccess);
            assert(robotTypeOrError.getValue().taskTypeCode === robotTypeDto.taskTypeCode);
        });

})
