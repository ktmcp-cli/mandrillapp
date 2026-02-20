import axios from 'axios';
import { getConfig } from './config.js';

function getBaseURL() {
  return getConfig('baseUrl') || 'https://api.example.com';
}

function getHeaders() {
  const apiKey = getConfig('apiKey');
  if (!apiKey) {
    throw new Error('API key not configured. Run: mandrillapp config set --api-key YOUR_KEY');
  }
  return {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  };
}

async function request(endpoint, method = 'GET', data = null) {
  const baseURL = getBaseURL();
  const headers = getHeaders();
  
  try {
    const response = await axios({
      method,
      url: `${baseURL}${endpoint}`,
      headers,
      data
    });
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(`API Error: ${error.response.data.message}`);
    }
    throw new Error(`Request failed: ${error.message}`);
  }
}

export async function getInfo() {
  return await request('/info');
}

export async function listResources() {
  return await request('/resources');
}

export async function getResource(id) {
  return await request(`/resources/${id}`);
}

export async function createResource(data) {
  return await request('/resources', 'POST', data);
}

export async function updateResource(id, data) {
  return await request(`/resources/${id}`, 'PUT', data);
}

export async function deleteResource(id) {
  return await request(`/resources/${id}`, 'DELETE');
}
