import wwyt from "./demo/index";
import ehs from "./system/index";
import develop from "./develop/index";
import auth from "./auth/index";
import enterprise from "./enterprise/index";
import hazard from "./hazard/index";
import location from "./location/index";
import duty from "./duty/index";
import education from "./education/index";
import flow from "./flow/index";
import doubleprevention from "./doubleprevention/index";
import institutionalized from "./institutionalized/index";
import emergency from "./emergency/index";
import incidentmanagement from "./incidentmanagement/index";
import specialwork from "./specialwork/index";
import checklistlibrary from "./doubleprevention/checklistlibrary";
import hichecklistlibrary from "./doubleprevention/hichecklistlibrary";
import stakeholdermanagement from './stakeholdermanagement/index'
import emergencyDrill from "./emergency/emergencyDrill" //应急演练
import checkhiddendangers from './doubleprevention/dangers'
import safetyscience from './safetyscience/index'
import securityChanges from "./securityChanges/index"


export default {
  ...wwyt,
  ...ehs,
  ...develop,
  ...auth,
  ...enterprise,
  ...hazard,
  ...location,
  ...duty,
  ...education,
  ...doubleprevention,
  ...flow,
  ...institutionalized,
  ...emergency,
  ...incidentmanagement,
  ...stakeholdermanagement,
  ...specialwork,
  ...stakeholdermanagement,
  ...safetyscience,
  ...checkhiddendangers,
  ...checklistlibrary,
  ...hichecklistlibrary,
  ...emergencyDrill,
  ...securityChanges
}

