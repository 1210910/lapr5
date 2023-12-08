import assert  from "assert";
import { Lift } from "../../../src/domain/lift/Lift";
import { ILiftDTO } from "../../../src/dto/ILiftDTO";

describe("Lift Type Test", () => {
  it("should create a valid lift when all parameters are valid", () => {
    const liftDto = {
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    } as ILiftDTO;

    const liftOrError = Lift.create(liftDto);

    assert(liftOrError.isSuccess);
  });

  it("shouldn't create a lift when building code is null", () => {
    const liftDto = {
      buildingCode: null,
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    } as ILiftDTO;

    const liftOrError = Lift.create(liftDto);

    assert(liftOrError.isFailure);
  });

  it("shouldn't create a lift when brand is null", () => {
    const liftDto = {
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: null,
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    } as ILiftDTO;

    const liftOrError = Lift.create(liftDto);

    assert(liftOrError.isFailure);
  });

  it("shouldn't create a lift when brand has more than 50 letters", () => {
    const liftDto = {
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    } as ILiftDTO;

    const liftOrError = Lift.create(liftDto);

    assert(liftOrError.isFailure);
  });

  it("shouldn't create a lift when model is null", () => {
    const liftDto = {
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: null,
      serialNumber: "123456789",
      description: "Description"
    } as ILiftDTO;

    const liftOrError = Lift.create(liftDto);

    assert(liftOrError.isFailure);
  });

  it("shouldn't create a lift when model has more than 100 letters", () => {
    const liftDto = {
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "A".repeat(101),
      serialNumber: "123456789",
      description: "Description"
    } as ILiftDTO;

    const liftOrError = Lift.create(liftDto);

    assert(liftOrError.isFailure);
  });

  it("shouldn't create a lift when serial number is null", () => {
    const liftDto = {
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: null,
      description: "Description"
    } as ILiftDTO;

    const liftOrError = Lift.create(liftDto);

    assert(liftOrError.isFailure);
  });

  it("shouldn't create a lift when serial number has more than 50 letters", () => {
    const liftDto = {
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      description: "Description"
    } as ILiftDTO;

    const liftOrError = Lift.create(liftDto);

    assert(liftOrError.isFailure);
  });

  it("should create a lift when description is null", () => {
    const liftDto = {
      buildingCode: "A",
      floors: ["A1", "A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: null
    } as ILiftDTO;

    const liftOrError = Lift.create(liftDto);

    assert(liftOrError.isSuccess);
  });

  it("shouldn't create a lift when description has more than 250 letters", () => {
    const liftDto = {
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
    } as ILiftDTO;

    const liftOrError = Lift.create(liftDto);

    assert(liftOrError.isFailure);
  });

  it("shouldn't create a lift when floors is null", () => {
    const liftDto = {
      buildingCode: "A",
      floors: null,
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    } as ILiftDTO;

    const liftOrError = Lift.create(liftDto);

    assert(liftOrError.isFailure);
  });

  it("shouldn't create a lift when floors has less than 2 floors", () => {
    const liftDto = {
      buildingCode: "A",
      floors: ["A1"],
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    } as ILiftDTO;

    const liftOrError = Lift.create(liftDto);

    assert(liftOrError.isFailure);
  });

  it("should edit a valid building when all the parameters are valid", () => {

    const liftDto = {
      buildingCode: "A",
      floors: ["A1","A2"],
      brand: "Brand",
      model: "Model",
      serialNumber: "123456789",
      description: "Description"
    } as ILiftDTO;

    const liftOrError = Lift.create(liftDto);
    const lift = liftOrError.getValue();

    const liftDTO2 = {
      buildingCode: "A",
      floors: ["A3","A4"],
      brand: "Brand1",
      model: "Model1",
      serialNumber: "987654321",
      description: "Description1"
    } as ILiftDTO;

    const liftOrError2 = Lift.update(lift, liftDTO2);

    assert(liftOrError2.isSuccess);
  });

});
