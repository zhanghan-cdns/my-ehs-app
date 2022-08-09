export function personToObject(person) {
  let obj = {};
  let arr = person.split(",");
  obj.entPersonId = arr[0];
  obj.entPersonName = arr[1];
  return obj;
}