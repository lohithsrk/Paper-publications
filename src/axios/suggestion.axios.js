import axios from 'axios'

import { base_URL } from '../utils/constants.util'

export const requestSuggestion = async (id_paper, id_user, token) =>
    await axios.post(`${base_URL}/suggestion/request`, {
        id_paper, id_user
    }, { headers: { 'Authorization': `Bearer ${token}` } })

export const getSuggestion = async (id_paper, token) =>
    await axios.get(`${base_URL}/suggestion/${id_paper}`, { headers: { 'Authorization': `Bearer ${token}` } })

export const getAllSuggestion = async (token) =>
    await axios.get(`${base_URL}/suggestion/request`, { headers: { 'Authorization': `Bearer ${token}` } })

export const updateSuggestion = async (comment, id_user, id_paper, token) =>
    await axios.put(`${base_URL}/suggestion/request`, { comment, id_user, id_paper }, { headers: { 'Authorization': `Bearer ${token}` } })