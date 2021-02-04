import { Logger, singleLineString, boxen, coloredStrings } from 'flex-dev-utils';
import { DeployResult } from 'flex-plugin-scripts/dist/scripts/deploy';

import { createConfiguration as createConfigurationDocs } from '../commandDocs.json';

/**
 * Prints the successful message of a plugin deployment
 */
const deploySuccessful = (logger: Logger) => (name: string, availability: string, deployedData: DeployResult) => {
  const defaultName = `Autogenerated Release ${Date.now()}`;
  logger.newline();
  logger.success(
    `🚀 Plugin (${availability}) **${name}**@**${deployedData.nextVersion}** was successfully deployed using Plugins API`,
  );
  logger.newline();

  // update this description
  logger.info('**Next Steps:**');
  logger.info(
    singleLineString(
      'Run {{$ twilio flex:plugins:release',
      `\\-\\-plugin ${name}@${deployedData.nextVersion}`,
      `\\-\\-name "${defaultName}"`,
      `\\-\\-description "${createConfigurationDocs.defaults.description}"}}`,
      'to enable this plugin on your Flex application',
    ),
  );
  logger.newline();
};

/**
 * Warns about having legacy plugins
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const warnHasLegacy = (logger: Logger) => () => {
  const cmd = coloredStrings.code('$ twilio flex:plugins:upgrade-plugin --remove-legacy-plugin');
  boxen.warning(`You have a legacy bundle of this plugin. Remove it by running ${cmd}`);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (logger: Logger) => ({
  deploySuccessful: deploySuccessful(logger),
  warnHasLegacy: warnHasLegacy(logger),
});
