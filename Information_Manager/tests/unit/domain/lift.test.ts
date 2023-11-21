import assert  from "assert";
import { Lift } from "../../../src/domain/Lift";

describe("Lift Type Test", () => {
  it("should create a valid lift when all parameters are valid", () => {
    const liftDto = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    };

    const liftOrError = Lift.create(liftDto);

    assert(liftOrError.isSuccess);
    assert(liftOrError.getValue().code === liftDto.code);
    assert(liftOrError.getValue().buildingCode === liftDto.buildingCode);
    assert(liftOrError.getValue().floors === liftDto.floors);
    assert(liftOrError.getValue().brand === liftDto.brand);
    assert(liftOrError.getValue().model === liftDto.model);
    assert(liftOrError.getValue().serialNumber === liftDto.serialNumber);
    assert(liftOrError.getValue().description === liftDto.description);
  });

  it("shouldn't create a lift when code is null", () => {
    const liftDto = {
      code: null,
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    };

    const liftOrError = Lift.create(liftDto);

    assert(liftOrError.isFailure);
  });

  it("shouldn't create a lift when code has more than 25 letters", () => {
    const liftDto = {
      code: "AAAAAAAAAAAAAAAAAAAAAAAAAA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    };

    const liftOrError = Lift.create(liftDto);

    assert(liftOrError.isFailure);
  });

  it("shouldn't create a lift when building code is null", () => {
    const liftDto = {
      code: "LA",
      buildingCode: null,
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    };

    const liftOrError = Lift.create(liftDto);

    assert(liftOrError.isFailure);
  });

  it("shouldn't create a lift when brand is null", () => {
    const liftDto = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: null,
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    };

    const liftOrError = Lift.create(liftDto);

    assert(liftOrError.isFailure);
  });

  it("shouldn't create a lift when brand has more than 50 letters", () => {
    const liftDto = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    };

    const liftOrError = Lift.create(liftDto);

    assert(liftOrError.isFailure);
  });

  it("shouldn't create a lift when model is null", () => {
    const liftDto = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: null,
      serialNumber: "123456789",
      description: "Description"
    };

    const liftOrError = Lift.create(liftDto);

    assert(liftOrError.isFailure);
  });

  it("shouldn't create a lift when model has more than 50 letters", () => {
    const liftDto = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      serialNumber: "123456789",
      description: "Description"
    };

    const liftOrError = Lift.create(liftDto);

    assert(liftOrError.isFailure);
  });

  it("shouldn't create a lift when serial number is null", () => {
    const liftDto = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: null,
      description: "Description"
    };

    const liftOrError = Lift.create(liftDto);

    assert(liftOrError.isFailure);
  });

  it("shouldn't create a lift when serial number has more than 50 letters", () => {
    const liftDto = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      description: "Description"
    };

    const liftOrError = Lift.create(liftDto);

    assert(liftOrError.isFailure);
  });

  it("should create a lift when description is null", () => {
    const liftDto = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: null
    };

    const liftOrError = Lift.create(liftDto);

    assert(liftOrError.isSuccess);
  });

  it("shouldn't create a lift when description has more than 255 letters", () => {
    const liftDto = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: "Lorem ipsum dolor sit amet, " +
        "consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste " +
        "natus error sit voluptatem accusantium doloremque laudantium, " +
        "totam rem aperiam, eaque ipsa quae ab illo inventore veritatis " +
        "et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim " +
        "ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, " +
        "sed quia consequuntur magni dolores eos qui ratione voluptatem sequi " +
        "nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit " +
        "amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora" +
        " incidunt ut labore et dolore magnam aliquam quaerat voluptatem."
    };

    const liftOrError = Lift.create(liftDto);

    assert(liftOrError.isFailure);
  });

  it("shouldn't create a lift when floors is null", () => {
    const liftDto = {
      code: "LA",
      buildingCode: "A",
      floors: null,
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    };

    const liftOrError = Lift.create(liftDto);

    assert(liftOrError.isFailure);
  });

  it("shouldn't create a lift when floors has less than 2 floors", () => {
    const liftDto = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1"],
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    };

    const liftOrError = Lift.create(liftDto);

    assert(liftOrError.isFailure);
  });

  it("should edit a valid building when all the parameters are valid", () => {

    const liftDto = {
      code: "LA",
      buildingCode: "A",
      floors: ["A1","A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    };

    const liftOrError = Lift.create(liftDto);
    const lift = liftOrError.getValue();

    const liftDTO2 = {
      code: "LA",
      buildingCode: "A",
      floors: ["A3","A4"],
      brand: "Brand1",
      model: "Model1",
      serialNumber: "987654321",
      description: "Description1"
    };

    const liftOrError2 = Lift.update(lift, liftDTO2);

    assert(liftOrError2.isSuccess);
  });

});
