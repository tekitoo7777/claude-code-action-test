import { google } from 'googleapis';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = path.join(__dirname, '..', 'token.json');
const CREDENTIALS_PATH = path.join(__dirname, '..', 'credentials.json');

export async function authorize() {
  try {
    const credentials = await loadCredentials();
    const client = new google.auth.OAuth2(
      credentials.installed.client_id,
      credentials.installed.client_secret,
      credentials.installed.redirect_uris[0]
    );

    try {
      const token = await fs.readFile(TOKEN_PATH, 'utf-8');
      client.setCredentials(JSON.parse(token));
      return client;
    } catch (err) {
      console.log('No token found. Please run the authentication process first.');
      throw new Error('Authentication required. Please see setup instructions.');
    }
  } catch (err) {
    console.error('Error loading credentials:', err);
    throw new Error('Failed to load credentials. Please ensure credentials.json exists.');
  }
}

async function loadCredentials() {
  try {
    const content = await fs.readFile(CREDENTIALS_PATH, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    throw new Error('Unable to read credentials file. Please download credentials.json from Google Cloud Console.');
  }
}

export async function getAuthUrl() {
  const credentials = await loadCredentials();
  const client = new google.auth.OAuth2(
    credentials.installed.client_id,
    credentials.installed.client_secret,
    credentials.installed.redirect_uris[0]
  );

  return client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
}

export async function getNewToken(code) {
  const credentials = await loadCredentials();
  const client = new google.auth.OAuth2(
    credentials.installed.client_id,
    credentials.installed.client_secret,
    credentials.installed.redirect_uris[0]
  );

  const { tokens } = await client.getToken(code);
  client.setCredentials(tokens);
  
  await fs.writeFile(TOKEN_PATH, JSON.stringify(tokens));
  console.log('Token stored to', TOKEN_PATH);
  
  return client;
}