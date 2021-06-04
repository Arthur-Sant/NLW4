import { EntityRepository, Repository } from "typeorm";
import { SurveyController } from "../controllers/SurveyController";
import { Survey } from "../models/Survey";

@EntityRepository(Survey)
class SurveysRepository extends Repository<Survey>{

}

export { SurveysRepository }