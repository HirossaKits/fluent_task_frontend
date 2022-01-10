interface IObject { [key: string]: number }
interface Object extends IObject { [key: PropertyKey]: any }

export const sumByGroupToObject = (objectArray: Object[], groupKey: Extract<keyof Object, string>, sumTarget: Extract<keyof IObject, string>): { [key: string]: number } => {
  let groupSum: { [key: string]: number } = {}
  objectArray.forEach(obj => {
    if (obj[groupKey] in groupSum) {
      groupSum[obj[groupKey]] += obj[sumTarget]
    } else {
      groupSum[obj[groupKey]] = obj[sumTarget]
    }
  }
  )
  return groupSum
}