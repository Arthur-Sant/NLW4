import { Request, Response } from "express";
import { getCustomRepository, IsNull, Not } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class NpsController {
  async excute(request: Request, response: Response){
    const { survey_id } = request.params;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository); 

    const surveyUsers = await surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull())
    })

    const detractor = surveyUsers.filter(
      survey => survey.value >= 0 && survey.value <= 6
    ).length;

    const passive = surveyUsers.filter(
      survey => survey.value >= 7 && survey.value <= 8
    ).length;

    const promoter = surveyUsers.filter( 
     survey => survey.value >= 9 && survey.value <= 10
    ).length;

    const totalAnswers = surveyUsers.length;

    const calculate = Number(
      (((promoter - detractor) / totalAnswers) * 100).toFixed(2)
    );

    return response.json({
      promoter,
      detractor,
      passive,
      totalAnswers,
      nps: calculate
    });
  }
}

export { NpsController }