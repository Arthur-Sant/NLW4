import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {

  async execute(request: Request, response: Response){
    const {value} = request.params;
    const { u } = request.query;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUsers = await surveysUsersRepository.findOne({
      id: String(u)
    })

    if(!surveyUsers){
      throw new AppError("Survey User does not exist");
    }

    surveyUsers.value = Number(value);

    await surveysUsersRepository.save(surveyUsers);

    return response.json(surveyUsers);
  }


}

export { AnswerController };