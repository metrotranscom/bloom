import {
  Body,
  Controller,
  Put,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ScriptRunnerService } from '../services/script-runner.service';
import { defaultValidationPipeOptions } from '../utilities/default-validation-pipe-options';
import { SuccessDTO } from '../dtos/shared/success.dto';
import { OptionalAuthGuard } from '../guards/optional.guard';
import { AdminOrJurisdictionalAdminGuard } from '../guards/admin-or-jurisdiction-admin.guard';
import { DataTransferDTO } from '../dtos/script-runner/data-transfer.dto';
import { AmiChartImportDTO } from '../dtos/script-runner/ami-chart-import.dto';
import { AmiChartUpdateImportDTO } from '../dtos/script-runner/ami-chart-update-import.dto';
import { CommunityTypeDTO } from '../dtos/script-runner/community-type.dto';
import { ApiKeyGuard } from '../guards/api-key.guard';

@Controller('scriptRunner')
@ApiTags('scriptRunner')
@UsePipes(new ValidationPipe(defaultValidationPipeOptions))
@UseGuards(ApiKeyGuard, OptionalAuthGuard, AdminOrJurisdictionalAdminGuard)
export class ScirptRunnerController {
  constructor(private readonly scriptRunnerService: ScriptRunnerService) {}

  @Put('exampleScript')
  @ApiOperation({
    summary: 'An example of how the script runner can work',
    operationId: 'exampleScript',
  })
  @ApiOkResponse({ type: SuccessDTO })
  async update(@Request() req: ExpressRequest): Promise<SuccessDTO> {
    return await this.scriptRunnerService.example(req);
  }

  @Put('transferJurisdictionData')
  @ApiOperation({
    summary:
      'A script that pulls jurisdiction data from one source into the current db',
    operationId: 'transferJurisdictionData',
  })
  @ApiOkResponse({ type: SuccessDTO })
  async transferJurisdictionData(
    @Body() dataTransferDTO: DataTransferDTO,
    @Request() req: ExpressRequest,
  ): Promise<SuccessDTO> {
    return await this.scriptRunnerService.transferJurisdictionData(
      req,
      dataTransferDTO,
    );
  }

  @Put('transferJurisdictionListingsData')
  @ApiOperation({
    summary:
      'A script that pulls listing data from one source into the current db',
    operationId: 'transferJurisdictionListingsData',
  })
  @ApiOkResponse({ type: SuccessDTO })
  async transferJurisdictionListingsData(
    @Body() dataTransferDTO: DataTransferDTO,
    @Request() req: ExpressRequest,
  ): Promise<SuccessDTO> {
    return await this.scriptRunnerService.transferJurisdictionListingData(
      req,
      dataTransferDTO,
    );
  }

  @Put('transferJurisdictionPartnerUserData')
  @ApiOperation({
    summary:
      'A script that pulls partner user data from one source into the current db',
    operationId: 'transferJurisdictionPartnerUserData',
  })
  @ApiOkResponse({ type: SuccessDTO })
  async transferJurisdictionPartnerUserData(
    @Body() dataTransferDTO: DataTransferDTO,
    @Request() req: ExpressRequest,
  ): Promise<SuccessDTO> {
    return await this.scriptRunnerService.transferJurisdictionPartnerUserData(
      req,
      dataTransferDTO,
    );
  }

  @Put('transferJurisdictionPublicUserApplicationData')
  @ApiOperation({
    summary:
      'A script that pulls public user and application data from one source into the current db',
    operationId: 'transferJurisdictionPublicUserApplicationData',
  })
  @ApiOkResponse({ type: SuccessDTO })
  async transferJurisdictionPublicUserApplicationData(
    @Body() dataTransferDTO: DataTransferDTO,
    @Request() req: ExpressRequest,
  ): Promise<SuccessDTO> {
    return await this.scriptRunnerService.transferJurisdictionPublicUserAndApplicationData(
      req,
      dataTransferDTO,
    );
  }

  @Put('amiChartImport')
  @ApiOperation({
    summary:
      'A script that takes in a standardized string and outputs the input for the ami chart create endpoint',
    operationId: 'amiChartImport',
  })
  @ApiOkResponse({ type: SuccessDTO })
  async amiChartImport(
    @Body() amiChartImportDTO: AmiChartImportDTO,
    @Request() req: ExpressRequest,
  ): Promise<SuccessDTO> {
    return await this.scriptRunnerService.amiChartImport(
      req,
      amiChartImportDTO,
    );
  }

  @Put('amiChartUpdateImport')
  @ApiOperation({
    summary:
      'A script that takes in a standardized string and outputs the input for the ami chart update endpoint',
    operationId: 'amiChartUpdateImport',
  })
  @ApiOkResponse({ type: SuccessDTO })
  async amiChartUpdateImport(
    @Body() amiChartUpdateImportDTO: AmiChartUpdateImportDTO,
    @Request() req: ExpressRequest,
  ): Promise<SuccessDTO> {
    return await this.scriptRunnerService.amiChartUpdateImport(
      req,
      amiChartUpdateImportDTO,
    );
  }

  @Put('lotteryTranslations')
  @ApiOperation({
    summary: 'A script that adds lottery translations to the db',
    operationId: 'lotteryTranslations',
  })
  @ApiOkResponse({ type: SuccessDTO })
  async lotteryTranslations(
    @Request() req: ExpressRequest,
  ): Promise<SuccessDTO> {
    return await this.scriptRunnerService.addLotteryTranslations(req);
  }

  @Put('lotteryTranslationsCreateIfEmpty')
  @ApiOperation({
    summary:
      'A script that adds lottery translations to the db and creates them if it does not exist',
    operationId: 'lotteryTranslations',
  })
  @ApiOkResponse({ type: SuccessDTO })
  async lotteryTranslationsCreateIfEmpty(
    @Request() req: ExpressRequest,
  ): Promise<SuccessDTO> {
    return await this.scriptRunnerService.addLotteryTranslationsCreateIfEmpty(
      req,
    );
  }

  @Put('optOutExistingLotteries')
  @ApiOperation({
    summary: 'A script that opts out existing lottery listings',
    operationId: 'optOutExistingLotteries',
  })
  @ApiOkResponse({ type: SuccessDTO })
  async optOutExistingLotteries(
    @Request() req: ExpressRequest,
  ): Promise<SuccessDTO> {
    return await this.scriptRunnerService.optOutExistingLotteries(req);
  }

  @Put('addDuplicatesInformationToLotteryEmail')
  @ApiOperation({
    summary: 'A script that adds duplicates information to lottery email',
    operationId: 'addDuplicatesInformationToLotteryEmail',
  })
  @ApiOkResponse({ type: SuccessDTO })
  async addDuplicatesInformationToLotteryEmail(
    @Request() req: ExpressRequest,
  ): Promise<SuccessDTO> {
    return await this.scriptRunnerService.addDuplicatesInformationToLotteryEmail(
      req,
    );
  }

  @Put('createNewReservedCommunityType')
  @ApiOperation({
    summary: 'A script that creates a new reserved community type',
    operationId: 'createNewReservedCommunityType',
  })
  @ApiOkResponse({ type: SuccessDTO })
  async createNewReservedCommunityType(
    @Body() body: CommunityTypeDTO,
    @Request() req: ExpressRequest,
  ): Promise<SuccessDTO> {
    return await this.scriptRunnerService.createNewReservedCommunityType(
      req,
      body.id,
      body.name,
      body.description,
    );
  }

  @Put('updateCodeExpirationTranslations')
  @ApiOperation({
    summary:
      'A script that updates single use code translations to show extended expiration time',
    operationId: 'updateCodeExpirationTranslations',
  })
  @ApiOkResponse({ type: SuccessDTO })
  async updateCodeExpirationTranslations(
    @Request() req: ExpressRequest,
  ): Promise<SuccessDTO> {
    return await this.scriptRunnerService.updateCodeExpirationTranslations(req);
  }

  @Put('hideProgramsFromListings')
  @ApiOperation({
    summary:
      'A script that hides program multiselect questions from the public detail page',
    operationId: 'hideProgramsFromListings',
  })
  @ApiOkResponse({ type: SuccessDTO })
  async hideProgramsFromListings(
    @Request() req: ExpressRequest,
  ): Promise<SuccessDTO> {
    return await this.scriptRunnerService.hideProgramsFromListings(req);
  }

  @Put('removeWorkAddresses')
  @ApiOperation({
    summary:
      'A script that deletes work addresses from applicants and household members',
    operationId: 'removeWorkAddresses',
  })
  @ApiOkResponse({ type: SuccessDTO })
  async removeWorkAddresses(
    @Request() req: ExpressRequest,
  ): Promise<SuccessDTO> {
    return await this.scriptRunnerService.removeWorkAddresses(req);
  }

  @Put('addNoticeToListingOpportunityEmail')
  @ApiOperation({
    summary:
      'A script that adds notice translations for the listing opportunity email',
    operationId: 'addNoticeToListingOpportunityEmail',
  })
  @ApiOkResponse({ type: SuccessDTO })
  async addNoticeToListingOpportunityEmail(
    @Request() req: ExpressRequest,
  ): Promise<SuccessDTO> {
    return await this.scriptRunnerService.addNoticeToListingOpportunityEmail(
      req,
    );
  }
}
