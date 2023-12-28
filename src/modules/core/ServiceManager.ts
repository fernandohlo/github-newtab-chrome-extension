import { Container } from 'inversify';

import PRsManager from '../../modules/pr/managers/PRsManager';
import PRsRepository from '../../modules/pr/repositories/PRsRepository';
import PRsProvider from '../..//modules/pr/providers/PRsProvider';
import GithubProvider from '../../modules/github/providers/GithubProvider';
import Rest from './Rest';

const $serviceManager = new Container();
$serviceManager.bind<PRsManager>(PRsManager).to(PRsManager);
$serviceManager.bind<PRsRepository>(PRsRepository).to(PRsRepository);
$serviceManager.bind<PRsProvider>(PRsProvider).to(PRsProvider);
$serviceManager.bind<GithubProvider>(GithubProvider).to(GithubProvider);
$serviceManager.bind<Rest>(Rest).to(Rest);

export default $serviceManager;
