
import {GEMINIAI_KEY} from './constants';
import {GoogleGenAI} from '@google/genai';

const GEMINI_API_KEY = GEMINIAI_KEY;
export const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

