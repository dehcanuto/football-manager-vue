import type { ResponseApiProps } from '@/models/api'
import api from './api'

export const crudService = {
  async list<T>(
    module: string,
    params?: Record<string, any>
  ): Promise<ResponseApiProps<T>> {
    const response = await api.get(`/${module}`, { params })
    return response.data
  },
  async view<T>(
    module: string,
    id: string | number
  ): Promise<ResponseApiProps<T>> {
    const response = await api.get(`/${module}/${id}`)
    return response.data
  },
  async add<T>(module: string, payload: T): Promise<ResponseApiProps<T>> {
    const isFormData = payload instanceof FormData
    const response = await api.post(`/${module}`, payload, {
      headers: isFormData
        ? { 'Content-Type': 'multipart/form-data' }
        : undefined,
    })
    return response.data
  },
  async update<T>(
    module: string,
    id: string | number,
    payload: T
  ): Promise<ResponseApiProps<T>> {
    const response = await api.patch(`/${module}/${id}`, payload)
    return response.data
  },
  async updateSelf<T>(
    module: string,
    payload: T
  ): Promise<ResponseApiProps<T>> {
    const response = await api.patch(`/${module}`, payload)
    return response.data
  },
  async remove<T>(
    module: string,
    id: string | number,
    payload?: T
  ): Promise<ResponseApiProps<T>> {
    const config = payload ? { data: payload } : undefined
    const response = await api.delete(`/${module}/${id}`, config)
    return response.data
  },
  async removeSelf<T>(
    module: string,
    payload: T
  ): Promise<ResponseApiProps<T>> {
    const config = payload ? { data: payload } : undefined
    const response = await api.delete(`/${module}`, config)
    return response.data
  },
}
