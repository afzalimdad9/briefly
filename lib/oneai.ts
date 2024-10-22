import { ONEAI_API_KEY } from '@/config';
import OneAI from 'oneai';

const oneai = new OneAI(ONEAI_API_KEY);

export default oneai;
