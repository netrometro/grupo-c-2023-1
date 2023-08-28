import { Animal, Threat_cause } from "@prisma/client"

export type InMemoryData = {
    animals: Animal[]
    threat_causes: Threat_cause[]
}
