import axios from 'axios'

import { base_URL } from '../utils/constants.util'

export const addPaper = async (formData, token) =>
    await axios.post(`${base_URL}/addpaper`, formData, { headers: { 'Authorization': `Bearer ${token}` } })

export const updatePaper = async (formData, token) =>
    await axios.post(`${base_URL}/updatepaper`, formData, { headers: { 'Authorization': `Bearer ${token}` } })

export const getPaper = async (id_user, token, year) =>
    await axios.post(`${base_URL}/getpaper/${id_user}`, { year }, { headers: { 'Authorization': `Bearer ${token}` } })

export const getParticularPaper = async (id_paper, id_user) =>
    await axios.post(`${base_URL}/getpaper/particular`, { id_paper, id_user })

export const setPaper = async (id_paper, token, status) =>
    await axios.post(`${base_URL}/setpaper/status`, { id_paper, status }, { headers: { 'Authorization': `Bearer ${token}` } })

export const servePaper = async (link) =>
    await axios.get(`${base_URL}/${link}`)

export const getRecentPapers = async (token) =>
    await axios.get(`${base_URL}/papers/recent`, { headers: { 'Authorization': `Bearer ${token}` } })