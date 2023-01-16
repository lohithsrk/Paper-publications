import axios from 'axios'

import { base_URL } from '../utils/constants.util'

export const requestSuggestion = async (id_paper, id_user, token) =>
    await axios.post(`${base_URL}/suggestion/request`, {
        id_paper, id_user
    }, { headers: { 'Authorization': `Bearer ${token}` } })

export const getSuggestion = async (id_paper, token) =>
    await axios.get(`${base_URL}/suggestion/${id_paper}`, { headers: { 'Authorization': `Bearer ${token}` } })