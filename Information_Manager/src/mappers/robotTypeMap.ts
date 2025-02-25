import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';
import { IRobotTypePersistence } from '../dataschema/IRobotTypePersistence';
import IRobotTypeDTO from "../dto/IRobotTypeDTO";
import { RobotType } from "../domain/robotType/robotType";

export class RobotTypeMap extends Mapper<RobotType> {

    public static toDTO( robotType: RobotType): IRobotTypeDTO {
        return {
            //_id: robotType.id.toString(),
            code: robotType.code.value,
            brand: robotType.brand.value,
            model: robotType.model.value,
            description: robotType.description.value,
            taskTypeCode: robotType.taskTypeCode
        } as IRobotTypeDTO;

    }

    public static toDomain (robotType: any | Model<IRobotTypePersistence & Document> ): RobotType {

        const robotTypeOrError =  RobotType.create(
            robotType as IRobotTypeDTO,
            robotType.domainId
        );

        robotTypeOrError.isFailure ? console.log(robotTypeOrError.error) : '';

        return robotTypeOrError.isSuccess ? robotTypeOrError.getValue() : null;
    }

    public static toPersistence (robotType: RobotType): any {
        return {
            domainId: robotType.id.toString(),
            code: robotType.code.value,
            brand: robotType.brand.value,
            model: robotType.model.value,
            description: robotType.description.value,
            taskTypeCode: robotType.taskTypeCode.valueOf()
        }
    }

    public static toDTOList (robotType: Array<RobotType>): Array<IRobotTypeDTO> {
        let robotTypeDTOList: Array<IRobotTypeDTO> = [];
        robotType.forEach((robotType: RobotType) => {
            robotTypeDTOList.push(this.toDTO(robotType));
        });

        return robotTypeDTOList;
    }
    
}