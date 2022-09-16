import { TwilioCliError } from '@twilio/flex-dev-utils';

import FlexPluginsDescribePlugin from '../../../../../commands/flex/plugins/describe/plugin';
import FlexPlugin from '../../../../../sub-commands/flex-plugin';
import InformationFlexPlugin from '../../../../../sub-commands/information-flex-plugin';
import createTest from '../../../../framework';

describe('Commands/Describe/FlexPluginsDescribePlugin', () => {
  it('should have own flags', () => {
    expect(FlexPluginsDescribePlugin.flags).not.toBeSameObject(InformationFlexPlugin.flags);
    expect(FlexPluginsDescribePlugin.flags).not.toBeSameObject(FlexPlugin.flags);
  });

  it('should set parsed flags', async () => {
    const cmd = await createTest(FlexPluginsDescribePlugin)('--name', 'plugin-one');
    await cmd.init();
    expect(cmd._flags).toBeDefined();
  });

  it('should throw error if command init not called', async (done) => {
    const cmd = await createTest(FlexPluginsDescribePlugin)('--name', 'plugin-one');
    try {
      await cmd.run();
    } catch (e) {
      expect(e instanceof TwilioCliError).toEqual(true);
      expect(e.message).toContain('Flags are not parsed yet');
      done();
    }
  });
});
