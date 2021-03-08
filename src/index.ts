import consola from 'consola';
import {
  launchBrowser,
  openNewPage,
  reloadPage,
  loginUser,
  navigateToActivityLog,
  selectActivityLogFilter,
  deleteLatestPost,
} from './automation';
import { Credentials, DeletionOptions } from './types';

const deleteFacebookActivities = (deletionOptions?: DeletionOptions) => async (
  credentials: Credentials,
): Promise<void> => {
  const { filters = ['posts'] } = { ...deletionOptions };
  const { email, password } = credentials;

  const browser = await launchBrowser();
  const page = await openNewPage('https://facebook.com')(browser);

  consola.info('LOGGING IN...');
  await loginUser({ email, password })(page);

  consola.info('NAVIGATING TO ACTIVITY LOG...');
  await navigateToActivityLog(page);

  consola.info('SELECTING ACTIVITY LOG FILTER...');
  await selectActivityLogFilter('posts')(page);

  while (true) {
    consola.info('DELETING POST...');
    await deleteLatestPost(page);
    await reloadPage(page);
  }
};

export default deleteFacebookActivities;
