import { Service, Inject } from 'typedi';

import IPassagewayRepo from "../services/IRepos/IPassagewayRepo";
import { Passageway } from "../domain/Passageway";
import { PassagewayMap } from "../mappers/PassagewayMap";
import { PassagewayId } from '../domain/PassagewayId';

import { Document, FilterQuery, Model } from 'mongoose';
import { IPassagewayPersistence } from '../dataschema/IPassagewayPersistence';
import { Result } from '../core/logic/Result';

@Service()
export default class PassagewayRepo implements IPassagewayRepo {

    private models: any;

    constructor(
        @Inject('passagewaySchema') private passagewaySchema: Model<IPassagewayPersistence & Document>,
    ) { }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    public async exists(passagewayId: PassagewayId | string): Promise<boolean> {
        const idX = passagewayId instanceof PassagewayId ? (<PassagewayId>passagewayId).id.toValue() : passagewayId;

        const query = { domainId: idX };
        const passagewayDocument = await this.passagewaySchema.findOne(query);

        return !!passagewayDocument === true;
    }

    public async existsByCode(passageCode: Passageway | string): Promise<boolean> {
        const idX = passageCode instanceof Passageway ? (<Passageway>passageCode).passageCode : passageCode;

        const query = { passageCode: idX };

        const passagewayDocument = await this.passagewaySchema.findOne(query);

        return !!passagewayDocument === true;
    }

    public async save(passageway: Passageway): Promise<Passageway> {
        const query = { domainId: passageway.id.toString() };

        const passagewayDocument = await this.passagewaySchema.findOne(query);

        try {
            if (passagewayDocument === null) {
                const rawPassageway: any = PassagewayMap.toPersistence(passageway);

                const passagewayCreated = await this.passagewaySchema.create(rawPassageway);

                return PassagewayMap.toDomain(passagewayCreated);
            } else {
                passagewayDocument.floor1 = passageway.floor1;
                passagewayDocument.floor2 = passageway.floor2;
                await passagewayDocument.save();

                return passageway;
            }
        } catch (err) {
            throw err;
        }
    }

    public async findAll(): Promise<Result<Array<Passageway>>> {
        const passagewayRecord = await this.passagewaySchema.find();

        const passageways = passagewayRecord.map((item) => {
            return PassagewayMap.toDomain(item);
        });

        return Result.ok<Array<Passageway>>(passageways);
    }

    public async findByCode(passageCode: Passageway | string): Promise<Passageway> {
        const idX = passageCode instanceof Passageway ? (<Passageway>passageCode).passageCode : passageCode;

        const query = { passageCode: idX };
        const passagewayRecord = await this.passagewaySchema.findOne(query);

        return PassagewayMap.toDomain(passagewayRecord);
    }

}