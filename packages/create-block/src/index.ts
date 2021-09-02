#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import prompts from 'prompts';
import { red } from 'kolorist';
import { genConfigFiles } from '@block-dev/create-config';
import {
  Choice, FRAMEWORKS, TEMPLATES,
} from './frameworks';
import { ESLINT_CONFIGS, LINTERS, STYLELINT_CONFIGS } from './linters';
import { resolveConfig, UserChoice } from './resolve';
import { emptyDir, isValidPackageName, toValidPackageName } from './utils';

const argv = require('minimist')(process.argv.slice(2));

const cwd = process.cwd();

async function init() {
  let targetDir = argv._[0];
  const template = argv.template || argv.t;

  let result = {} as UserChoice;

  const defaultProjectName = targetDir || 'block';

  try {
    result = await prompts(
      [
        {
          type: targetDir ? null : 'text',
          name: 'name',
          message: 'Project name:',
          initial: defaultProjectName,
          // eslint-disable-next-line no-return-assign
          onState: (state) => (targetDir = state.value.trim() || defaultProjectName),
        },
        {
          type: () => (!fs.existsSync(targetDir) || fs.readdirSync(targetDir).length === 0 ? null : 'confirm'),
          name: 'overwrite',
          message: () => `${
            targetDir === '.' ? 'Current directory' : `Target directory "${targetDir}"`
          } is not empty. Remove existing files and continue?`,
        },
        {
          type: () => (isValidPackageName(targetDir) ? null : 'text'),
          name: 'name',
          message: 'Package name:',
          initial: () => toValidPackageName(targetDir),
          validate: (dir) => isValidPackageName(dir) || 'Invalid package.json name',
        },
        {
          type: template && TEMPLATES.includes(template) ? null : 'select',
          name: 'framework',
          message:
            typeof template === 'string' && !TEMPLATES.includes(template)
              ? `"${template}" isn't a valid template. Please choose from below: `
              : 'Select a framework:',
          initial: 0,
          choices: FRAMEWORKS.map((framework) => {
            const frameworkColor = framework.color;
            return {
              title: frameworkColor(framework.name),
              value: framework,
            };
          }),
        },
        {
          type: (framework) => (framework && framework.variants ? 'select' : null),
          name: 'variant',
          message: 'Select a variant:',
          choices: (framework) => framework.variants.map((variant: Choice) => {
            const variantColor = variant.color;
            return {
              title: variantColor(variant.name),
              value: variant.name,
            };
          }),
        },
        {
          type: 'multiselect',
          name: 'linters',
          message: 'Pick linters:',
          choices: LINTERS.map((e) => ({
            title: e.name,
            value: e.name,
            selected: e.selected,
          })),
        },
        {
          type: (linters) => (linters.includes('eslint') ? 'select' : null),
          name: 'eslintConfig',
          message: 'Pick a eslint config:',
          choices: ESLINT_CONFIGS.map((e: Choice) => ({
            title: e.color(e.name),
            value: e.name,
          })),
        },
        {
          type: (prev, values) => ((values.linters || []).includes('stylelint') ? 'select' : null),
          name: 'stylelintConfig',
          message: 'Pick a stylelint config:',
          choices: STYLELINT_CONFIGS.map((e: Choice) => ({
            title: e.color(e.name),
            value: e.name,
          })),
        },
      ],
      {
        onCancel: () => {
          throw new Error(`${red('✖')} Operation cancelled`);
        },
      },
    );
  } catch (cancelled: any) {
    console.error(cancelled.message);
  }

  // user choice associated with prompts
  const { overwrite } = result;

  const root = path.join(cwd, targetDir);

  if (overwrite) {
    emptyDir(root);
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root);
  }

  process.chdir(root);
  genConfigFiles(resolveConfig(result));
}

init().catch((e) => {
  console.error(e);
});
