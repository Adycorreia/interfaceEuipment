
import {DetailsEquipment} from "./detailsEquipament"
import {Employee} from "./detailEmployee" 
import {EquipmentType} from "./detailEquipmentType"
import {LivingRoom} from "./detailRoom"
import {Department} from "./detailDepartament"


export interface AllEquipmentDetails {

    equipment: DetailsEquipment
    employee: Employee
    equipmentType: EquipmentType
    livingRoom: LivingRoom
    department: Department

    

}