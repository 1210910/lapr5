import { Service, Inject } from 'typedi';

import IPassagemRepo from "../services/IRepos/IPassagemRepo";
import { Passagem } from "../domain/Passagem";
import { PassagemMap } from "../mappers/PassagemMap";
import { PassagemId } from '../domain/PassagemId';

import { Document, FilterQuery, Model } from 'mongoose';
import { IPassagemPersistence } from '../dataschema/IPassagemPersistence';

@Service()
export default class PassagemRepo implements IPassagemRepo {

    private models: any;

    constructor(
        @Inject('passagemSchema') private passagemSchema: Model<IPassagemPersistence & Document>,
    ) { }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    public async exists(passagemId: PassagemId | string): Promise<boolean> {
        const idX = passagemId instanceof PassagemId ? (<PassagemId>passagemId).id.toValue() : passagemId;

        const query = { domainId: idX };
        const passagemDocument = await this.passagemSchema.findOne(query);

        return !!passagemDocument === true;
    }

    public async save(passagem: Passagem): Promise<Passagem> {
        const query = { domainId: passagem.id.toString() };

        const passagemDocument = await this.passagemSchema.findOne(query);

        try {
            if (passagemDocument === null) {
                const rawPassagem: any = PassagemMap.toPersistence(passagem);

                const passagemCreated = await this.passagemSchema.create(rawPassagem);

                return PassagemMap.toDomain(passagemCreated);
            } else {
                passagemDocument.piso1 = passagem.piso1;
                passagemDocument.piso2 = passagem.piso2;
                await passagemDocument.save();

                return passagem;
            }
        } catch (err) {
            throw err;
        }
    }

    public async findAll(): Promise<Passagem[]> {
        const passagemRecord = await this.passagemSchema.find();

        return passagemRecord.map((item) => {
            return PassagemMap.toDomain(item);
        });
    }

    public async findByCode(passageCode: Passagem | string): Promise<Passagem> {
        const idX = passageCode instanceof Passagem ? (<Passagem>passageCode).id.toValue() : passageCode;

        const query = { domainId: idX };
        const passagemRecord = await this.passagemSchema.findOne(query);

        return PassagemMap.toDomain(passagemRecord);
    }

}