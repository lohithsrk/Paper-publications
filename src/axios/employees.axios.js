import axios from 'axios'

import { base_URL } from '../utils/constants.util'

export const getAllUsers = async (token) =>
    await axios.get(`${base_URL}/users`, { headers: { 'Authorization': `Bearer ${token}` } })
