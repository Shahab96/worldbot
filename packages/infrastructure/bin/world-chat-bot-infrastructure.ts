#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { WorldChatBotInfrastructureStack } from '../lib/world-chat-bot-infrastructure-stack';

const app = new cdk.App();
new WorldChatBotInfrastructureStack(app, 'WorldChatBot');
