import * as lodash from "lodash";

import { UpdateEmployee, Value } from "../types/axios";
import { Employee, EmployeeWithId, EmployeeRestriction } from "../types";

function organizeData(
  updatedEmployee: EmployeeWithId,
  targetEmployee: Employee
): UpdateEmployee {
  const update = {
    dependencies: { post: [], delete: [] },
    name: { put: [] },
    qualifications: { post: [], delete: [] },
    restrictions: { post: [], delete: [], put: [] },
  } as UpdateEmployee;
  var nameUpdate: number = 0;
  Object.keys(updatedEmployee).forEach((key) => {
    if (!lodash.isEqual(targetEmployee[key], updatedEmployee[key])) {
      if (key == "first_name" || key == "last_name") {
        if (nameUpdate == 0) {
          const newName = [
            {
              id: updatedEmployee["id"],
              first_name: updatedEmployee["first_name"],
              last_name: updatedEmployee["last_name"],
            },
          ];
          update["name"].put = newName;
          nameUpdate = 1;
        }
      } else {
        // idが含まれるものだけを抽出
        const hasID = updatedEmployee[key].filter((obj: Value) =>
          lodash.has(obj, "id")
        );

        // idが含まれるものの数が減っていれば削除処理
        const deletedItemId = targetEmployee[key]
          .filter(
            (origin: Value) =>
              !hasID.find((item: Value) => item.id === origin.id)
          )
          .map((item: Value) => item.id);

        update[key].delete = deletedItemId;

        // Restrictionsのvalueだけの更新処理
        if (key == "restrictions") {
          const updatedRestriction = targetEmployee[key]
            .filter((origin: EmployeeRestriction) => {
              const Item = hasID.find((item: Value) => item.id === origin.id);
              return Item && origin.value !== Item.value;
            })
            .map((origin) => {
              const item = hasID.find(
                (item: EmployeeRestriction) => item.id === origin.id
              );
              return { id: origin.id, value: item.value };
            });

          update[key].put = updatedRestriction;
        }
        // id持ってないやつpost
        const noHasID = updatedEmployee[key].filter(
          (obj: Value) => !lodash.has(obj, "id")
        );
        console.log(noHasID[0]);
        const postList = noHasID.map((item: Value) => {
          let key = item.hasOwnProperty("required_employee_id")
            ? "dependent_employee_id"
            : "employee_id";
          return {
            ...item,
            [key]: targetEmployee.id,
          };
        });
        console.log(postList);
        update[key].post = postList;
      }
    }
  });

  return update;
}

export default organizeData;
