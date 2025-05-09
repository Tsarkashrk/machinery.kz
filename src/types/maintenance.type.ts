import { IEquipment } from './equipment.type'

interface IMaintenanceBase {
  service_date: string
  description: string
  cost: string
  performed_by: string
  next_service_date: string
}

export interface IMaintenance extends IMaintenanceBase {
  id: number
  equipment_details: IEquipment
}

export interface IMaintenanceRequest extends IMaintenance {
  equipment: number
}
