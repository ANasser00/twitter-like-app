#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { BackendStack } from '../cdk/backend-stack';

const app = new cdk.App();
new BackendStack(app, 'BackendStack');
